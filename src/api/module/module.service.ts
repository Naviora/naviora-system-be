import { Inject, Injectable } from '@nestjs/common'
import { ModuleEntity } from './entities/module.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { CloudinaryService } from '@cloudinary/cloudinary.service'
import { CreateModuleDto } from './dto/create-module.dto'
import { UpdateModuleDto } from './dto/update-module.dto'
import { GetModulesQueryDto } from './dto/get-modules-query.dto'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { Cache } from 'cache-manager'
import { paginate } from '@utils/offset-pagination'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { User } from '@api/user/entities/user.entity'
import { TeachingModule } from './entities/teaching-module.entity'
import { Class } from '@api/class/entities/class.entity'

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(TeachingModule)
    private readonly teachingModuleRepository: Repository<TeachingModule>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(createModuleDto: CreateModuleDto, banner?: Express.Multer.File) {
    try {
      const { module_code, class_id } = createModuleDto
      const existingModule = await this.moduleRepository.findOne({ where: { moduleCode: module_code } })
      if (existingModule) {
        throw new ValidationException(ErrorCode.MODULE001, 'Module code already exists', [
          {
            property: 'module_code',
            code: ErrorCode.MODULE001
          }
        ])
      }
      const existingClass = await this.classRepository.findOne({ where: { classId: class_id } })
      if (!existingClass) {
        throw new ValidationException(ErrorCode.CLASS003, 'Class not found', [
          {
            property: 'class_id',
            code: ErrorCode.CLASS003
          }
        ])
      }
      // Handle banner image upload if provided
      let bannerUrl = createModuleDto.banner
      if (banner) {
        const uploadResult = await this.cloudinaryService.uploadFile(banner)
        bannerUrl = uploadResult.secure_url
      }

      const moduleEntity = this.moduleRepository.create({
        moduleCode: createModuleDto.module_code,
        moduleName: createModuleDto.module_name,
        moduleDescription: createModuleDto.module_description,
        banner: bannerUrl,
        classId: createModuleDto.class_id
      })
      const newModule = await this.moduleRepository.save(moduleEntity)
      if (!newModule) {
        throw new ValidationException(ErrorCode.MODULE002)
      }
      return {
        module_id: newModule.moduleId,
        module_code: newModule.moduleCode,
        module_name: newModule.moduleName,
        module_description: newModule.moduleDescription,
        banner: newModule.banner,
        class: {
          class_id: existingClass.classId,
          class_code: existingClass.classCode,
          class_name: existingClass.className,
          class_type: existingClass.classType
        },
        created_at: newModule.createdAt,
        updated_at: newModule.updatedAt
      }
    } catch (error) {
      throw error
    }
  }

  async update(moduleId: string, updateModuleDto: UpdateModuleDto) {
    try {
      // Check if module exists
      const moduleEntity = await this.moduleRepository.findOne({ where: { moduleId } })

      if (!moduleEntity) {
        throw new ValidationException(ErrorCode.MODULE003, 'Module not found', [
          {
            property: 'module_id',
            code: ErrorCode.MODULE003
          }
        ])
      }

      // Check if module code is being updated and if it conflicts
      if (updateModuleDto.module_code && updateModuleDto.module_code !== moduleEntity.moduleCode) {
        const existingModule = await this.moduleRepository.findOne({
          where: { moduleCode: updateModuleDto.module_code }
        })
        if (existingModule) {
          throw new ValidationException(ErrorCode.MODULE001, 'Module code already exists', [
            {
              property: 'module_code',
              code: ErrorCode.MODULE001
            }
          ])
        }
      }

      // Update the module with provided fields (map snake_case to entity fields)
      if (updateModuleDto.module_code !== undefined) moduleEntity.moduleCode = updateModuleDto.module_code
      if (updateModuleDto.module_name !== undefined) moduleEntity.moduleName = updateModuleDto.module_name
      if (updateModuleDto.module_description !== undefined)
        moduleEntity.moduleDescription = updateModuleDto.module_description
      if (updateModuleDto.banner !== undefined) moduleEntity.banner = updateModuleDto.banner

      const updatedModule = await this.moduleRepository.save(moduleEntity)

      if (!updatedModule) {
        throw new ValidationException(ErrorCode.MODULE002, 'Failed to update module')
      }

      return {
        module_id: updatedModule.moduleId,
        module_code: updatedModule.moduleCode,
        module_name: updatedModule.moduleName,
        module_description: updatedModule.moduleDescription,
        banner: updatedModule.banner,
        created_at: updatedModule.createdAt,
        updated_at: updatedModule.updatedAt
      }
    } catch (error) {
      throw error
    }
  }

  async getModules(queryDto: GetModulesQueryDto) {
    const query = this.moduleRepository.createQueryBuilder('module')

    // Search filter
    if (queryDto.q) {
      query.andWhere('(module.moduleName ILIKE :search OR module.moduleCode ILIKE :search)', {
        search: `%${queryDto.q}%`
      })
    }

    // Sorting
    const validSortFields = ['moduleName', 'moduleCode', 'createdAt', 'updatedAt']
    const sortMapping: Record<string, string> = {
      module_name: 'moduleName',
      module_code: 'moduleCode',
      created_at: 'createdAt',
      updated_at: 'updatedAt'
    }
    const rawSort = queryDto.sort_by || 'created_at'
    const mappedSort = sortMapping[rawSort]
    const sortField = validSortFields.includes(mappedSort) ? mappedSort : 'createdAt'
    query.orderBy(`module.${sortField}`, queryDto.order)

    // Pagination
    const [modules, metaDto] = await paginate<ModuleEntity>(query, queryDto, {
      skipCount: false,
      takeAll: false
    })

    return {
      modules,
      meta: metaDto
    }
  }

  async getModuleById(moduleId: string, currentUser: User) {
    try {
      // Find module with relationships based on user role
      const moduleQuery = this.moduleRepository
        .createQueryBuilder('module')
        .leftJoinAndSelect('module.class', 'class')
        .where('module.moduleId = :moduleId', { moduleId })

      // Add role-specific relationships
      if (currentUser.role?.name === RoleInAccount.Student) {
        // Students can see lessons within the module
        moduleQuery.leftJoinAndSelect('module.lessons', 'lessons')
      } else if (currentUser.role?.name === RoleInAccount.Lecturer) {
        // Lecturers can see if they are assigned to this module
        moduleQuery
          .leftJoinAndSelect('module.teachingModules', 'teachingModules')
          .leftJoinAndSelect('teachingModules.lecturer', 'lecturer')
          .where('teachingModules.lecturer.id = :userId OR module.moduleId = :moduleId', {
            userId: currentUser.id,
            moduleId
          })
      } else if (currentUser.role?.name === RoleInAccount.Admin || currentUser.role?.name === RoleInAccount.Principal) {
        // Admin/Principal can see all assigned lecturers
        moduleQuery
          .leftJoinAndSelect('module.teachingModules', 'teachingModules')
          .leftJoinAndSelect('teachingModules.lecturer', 'lecturer')
      }

      const module = await moduleQuery.getOne()

      if (!module) {
        throw new ValidationException(ErrorCode.MODULE003, 'Module not found', [
          {
            property: 'module_id',
            code: ErrorCode.MODULE003
          }
        ])
      }

      // Build response based on user role
      const response: Record<string, any> = {
        module_id: module.moduleId,
        module_code: module.moduleCode,
        module_name: module.moduleName,
        module_description: module.moduleDescription,
        banner: module.banner,
        class: module.class
          ? {
              class_id: module.class.classId,
              class_code: module.class.classCode,
              class_name: module.class.className,
              class_type: module.class.classType
            }
          : null,
        created_at: module.createdAt,
        updated_at: module.updatedAt
      }

      // Role-specific data
      if (currentUser.role?.name === RoleInAccount.Student) {
        // Students see lessons
        response.lessons =
          module.lessons?.map((lesson) => ({
            lesson_id: lesson.lessonId,
            lesson_name: lesson.lessonName,
            lesson_description: lesson.lessonDescription
          })) || []
      } else if (currentUser.role?.name === RoleInAccount.Lecturer) {
        // Lecturers see if they are assigned and their assignment details
        const userAssignment = module.teachingModules?.find((tm) => tm.lecturer.id === currentUser.id)
        response.is_assigned = !!userAssignment
        if (userAssignment) {
          response.assignment = {
            is_active: userAssignment.isActive,
            end_date: userAssignment.endDate
          }
        }
      } else if (currentUser.role?.name === RoleInAccount.Admin || currentUser.role?.name === RoleInAccount.Principal) {
        // Admin/Principal see all assigned lecturers
        response.assigned_lecturers =
          module.teachingModules?.map((tm) => ({
            lecturer_id: tm.lecturer.id,
            lecturer_name: tm.lecturer.name,
            lecturer_email: tm.lecturer.email,
            is_active: tm.isActive,
            end_date: tm.endDate
          })) || []
      }

      return response
    } catch (error) {
      throw error
    }
  }
}
