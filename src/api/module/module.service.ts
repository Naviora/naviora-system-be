import { Inject, Injectable } from '@nestjs/common'
import { ModuleEntity } from './entities/module.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository, In } from 'typeorm'
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
import { AssignLecturersToModuleDto } from './dto/assign-lecturers-to-module.dto'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'
import { EntryTestSubmissionEntity } from '@api/entry-test/entities/entry-test-submission.entity'
import { AttemptStatus } from '@common/enums/attempt-status.enum'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { LessonProgress } from '@api/lesson/entities/lesson-progress.entity'
import { extractUserRole } from '@utils/common.util'
import { Order } from '@constants/app.constant'

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(TeachingModule)
    private readonly teachingModuleRepository: Repository<TeachingModule>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ClassEnrolment)
    private readonly classEnrolmentRepository: Repository<ClassEnrolment>,
    @InjectRepository(EntryTestSubmissionEntity)
    private readonly entryTestSubmissionRepository: Repository<EntryTestSubmissionEntity>,
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepository: Repository<LessonProgress>,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(createModuleDto: CreateModuleDto, banner?: Express.Multer.File) {
    try {
      const { module_code, class_id } = createModuleDto
      const existingModule = await this.moduleRepository.findOne({ where: { moduleCode: module_code } })
      if (existingModule) {
        throw new ValidationException(ErrorCode.MODULE001, 'Mã học phần đã tồn tại', [
          {
            property: 'module_code',
            code: ErrorCode.MODULE001
          }
        ])
      }
      let existingClass = null
      if (class_id !== null && class_id !== '') {
        existingClass = await this.classRepository.findOne({ where: { classId: class_id } })
        if (!existingClass) {
          throw new ValidationException(ErrorCode.CLASS003, 'Không tìm thấy lớp học', [
            {
              property: 'class_id',
              code: ErrorCode.CLASS003
            }
          ])
        }
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
        class: existingClass
      })
      const newModule = await this.moduleRepository.save(moduleEntity)
      if (!newModule) {
        throw new ValidationException(ErrorCode.MODULE002)
      }
      newModule.class = existingClass || null
      return newModule
    } catch (error) {
      throw error
    }
  }

  async update(moduleId: string, updateModuleDto: UpdateModuleDto, banner?: Express.Multer.File) {
    try {
      // Check if module exists
      const moduleEntity = await this.moduleRepository.findOne({ where: { moduleId } })

      if (!moduleEntity) {
        throw new ValidationException(ErrorCode.MODULE003, 'Không tìm thấy học phần', [
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
          throw new ValidationException(ErrorCode.MODULE001, 'Mã học phần đã tồn tại', [
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

      // Handle optional banner update (file upload preferred)
      if (banner) {
        const uploadResult = await this.cloudinaryService.uploadFile(banner)
        moduleEntity.banner = uploadResult.secure_url
      } else if (updateModuleDto.banner !== undefined) {
        moduleEntity.banner = updateModuleDto.banner
      }

      const updatedModule = await this.moduleRepository.save(moduleEntity)

      if (!updatedModule) {
        throw new ValidationException(ErrorCode.MODULE002, 'Cập nhật học phần thất bại')
      }

      return updatedModule
    } catch (error) {
      throw error
    }
  }

  async getModules(queryDto: GetModulesQueryDto, currentUser?: User) {
    const query = this.moduleRepository.createQueryBuilder('module')
    query.leftJoinAndSelect('module.class', 'class')
    query.distinct(true)

    const userRole = currentUser ? extractUserRole(currentUser) : undefined

    if (userRole === RoleInAccount.Lecturer && currentUser) {
      query
        .innerJoin('module.teachingModules', 'teachingModule', 'teachingModule.isActive = true')
        .innerJoin('teachingModule.lecturer', 'lecturer', 'lecturer.id = :lecturerId', {
          lecturerId: currentUser.id
        })
    }

    if (queryDto.class_id) {
      query.andWhere('class.classId = :classId', { classId: queryDto.class_id })
    }

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
    const sortOrder = Order.DESC
    query.orderBy(`module.${sortField}`, sortOrder)

    // Pagination
    const [modules, metaDto] = await paginate<ModuleEntity>(query, queryDto, {
      skipCount: false,
      takeAll: false
    })

    return {
      modules,
      pagination: metaDto
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
        throw new ValidationException(ErrorCode.MODULE003, 'Không tìm thấy học phần', [
          {
            property: 'module_id',
            code: ErrorCode.MODULE003
          }
        ])
      }

      // Students can only access modules that belong to their enrolled classes
      if (currentUser.role?.name === RoleInAccount.Student && module.class?.classId) {
        const isEnrolled = await this.classEnrolmentRepository.exists({
          where: { classId: module.class.classId, studentId: currentUser.id }
        })
        if (!isEnrolled) {
          throw new ValidationException(ErrorCode.V000, 'Sinh viên không thuộc lớp này', [
            { property: 'class_id', code: ErrorCode.V000 }
          ])
        }
      }

      // Build response based on user role
      const response: {
        moduleId: string
        moduleCode: string
        moduleName: string
        moduleDescription: string
        banner: string | null
        class: {
          classId: string
          classCode: string
          className: string
          classType: string
        } | null
        createdAt: Date
        updatedAt: Date
        lessons?: Array<{
          lessonId: string
          lessonName: string
          lessonDescription: string
        }>
        isAssigned?: boolean
        assignment?: {
          isActive: boolean
          endDate: Date | null
        }
        assignedLecturers?: Array<{
          lecturerId: string
          lecturerName: string
          lecturerEmail: string
          isActive: boolean
          endDate: Date | null
        }>
      } = {
        moduleId: module.moduleId,
        moduleCode: module.moduleCode,
        moduleName: module.moduleName,
        moduleDescription: module.moduleDescription,
        banner: module.banner,
        class: module.class
          ? {
              classId: module.class.classId,
              classCode: module.class.classCode,
              className: module.class.className,
              classType: module.class.classType
            }
          : null,
        createdAt: module.createdAt,
        updatedAt: module.updatedAt
      }

      // Role-specific data
      if (currentUser.role?.name === RoleInAccount.Student) {
        // Students see lessons
        response.lessons =
          module.lessons?.map((lesson) => ({
            lessonId: lesson.lessonId,
            lessonName: lesson.lessonName,
            lessonDescription: lesson.lessonDescription
          })) || []
      } else if (currentUser.role?.name === RoleInAccount.Lecturer) {
        // Lecturers see if they are assigned and their assignment details
        const userAssignment = module.teachingModules?.find((tm) => tm.lecturer.id === currentUser.id)
        response.isAssigned = !!userAssignment
        if (userAssignment) {
          response.assignment = {
            isActive: userAssignment.isActive,
            endDate: userAssignment.endDate
          }
        }
      } else if (currentUser.role?.name === RoleInAccount.Admin || currentUser.role?.name === RoleInAccount.Principal) {
        // Admin/Principal see all assigned lecturers
        response.assignedLecturers =
          module.teachingModules?.map((tm) => ({
            lecturerId: tm.lecturer.id,
            lecturerName: tm.lecturer.name,
            lecturerEmail: tm.lecturer.email,
            isActive: tm.isActive,
            endDate: tm.endDate
          })) || []
      }

      return response
    } catch (error) {
      throw error
    }
  }

  async getModuleWithLessons(moduleId: string, currentUser?: User) {
    try {
      // Find module with lessons
      const module = await this.moduleRepository
        .createQueryBuilder('module')
        .leftJoinAndSelect('module.lessons', 'lessons')
        .leftJoinAndSelect('module.class', 'class')
        .where('module.moduleId = :moduleId', { moduleId })
        .getOne()

      if (!module) {
        throw new ValidationException(ErrorCode.MODULE003, 'Không tìm thấy học phần', [
          {
            property: 'module_id',
            code: ErrorCode.MODULE003
          }
        ])
      }

      // Get completed lesson IDs for the current user if provided
      let completedLessonIds: string[] = []
      if (
        currentUser &&
        extractUserRole(currentUser) === RoleInAccount.Student &&
        module.lessons &&
        module.lessons.length > 0
      ) {
        const lessonIds = module.lessons.map((l) => l.lessonId)
        const completedLessons = await this.lessonProgressRepository.find({
          where: {
            studentId: currentUser.id,
            lessonId: In(lessonIds)
          },
          select: ['lessonId']
        })
        completedLessonIds = completedLessons.map((lp) => lp.lessonId)
      }
      const progressData = await this.getModuleProgress(moduleId, currentUser)

      return {
        moduleId: module.moduleId,
        moduleCode: module.moduleCode,
        moduleName: module.moduleName,
        moduleDescription: module.moduleDescription,
        banner: module.banner,
        progressPercent: extractUserRole(currentUser) === RoleInAccount.Student ? progressData.progress_percent : null,
        createdAt: module.createdAt,
        updatedAt: module.updatedAt,
        lessons:
          module.lessons?.map((lesson) => ({
            lessonId: lesson.lessonId,
            lessonName: lesson.lessonName,
            lessonDescription: lesson.lessonDescription,
            isCompleted:
              extractUserRole(currentUser) === RoleInAccount.Student
                ? completedLessonIds.includes(lesson.lessonId)
                : null,
            createdAt: lesson.createdAt,
            updatedAt: lesson.updatedAt
          })) || []
      }
    } catch (error) {
      throw error
    }
  }

  async getModuleProgress(moduleId: string, currentUser: User) {
    // Ensure module exists and student is enrolled in its class
    const module = await this.moduleRepository
      .createQueryBuilder('module')
      .leftJoinAndSelect('module.class', 'class')
      .where('module.moduleId = :moduleId', { moduleId })
      .getOne()
    if (!module) {
      throw new ValidationException(ErrorCode.MODULE003, 'Không tìm thấy học phần', [
        { property: 'module_id', code: ErrorCode.MODULE003 }
      ])
    }
    if (extractUserRole(currentUser) === RoleInAccount.Student && module.class?.classId) {
      const isEnrolled = await this.classEnrolmentRepository.exists({
        where: { classId: module.class.classId, studentId: currentUser.id }
      })
      if (!isEnrolled) {
        throw new ValidationException(ErrorCode.V000, 'Sinh viên không thuộc lớp này', [
          { property: 'class_id', code: ErrorCode.V000 }
        ])
      }
    }

    // Total lessons in this module
    const totalLessons = await this.lessonRepository.count({ where: { moduleId: moduleId } })

    if (totalLessons === 0) {
      return { module_id: moduleId, total_lessons: 0, completed_lessons: 0, progress_percent: 0 }
    }

    // Completed lessons by this student for this module
    const completedLessons = await this.lessonProgressRepository
      .createQueryBuilder('lp')
      .innerJoin('lp.lesson', 'lesson')
      .where('lp.studentId = :studentId', { studentId: currentUser.id })
      .andWhere('lesson.moduleId = :moduleId', { moduleId })
      .getCount()

    const percent = Math.round((completedLessons / totalLessons) * 100)
    return {
      module_id: moduleId,
      total_lessons: totalLessons,
      completed_lessons: completedLessons,
      progress_percent: percent
    }
  }

  async getModulesForStudentByClass(classId: string, currentUser: User, queryDto: GetModulesQueryDto) {
    try {
      // Validate class exists
      const classEntity = await this.classRepository.findOne({ where: { classId } })
      if (!classEntity) {
        throw new ValidationException(ErrorCode.CLASS003, 'Không tìm thấy lớp học', [
          { property: 'class_id', code: ErrorCode.CLASS003 }
        ])
      }

      if (extractUserRole(currentUser) !== RoleInAccount.Student) {
        throw new ValidationException(ErrorCode.V000, 'Chỉ sinh viên mới được truy cập học phần của lớp', [
          { property: 'role', code: ErrorCode.V000 }
        ])
      }

      // Check enrollment
      const enrolment = await this.classEnrolmentRepository.findOne({
        where: { classId: classId, studentId: currentUser.id }
      })
      if (!enrolment) {
        throw new ValidationException(ErrorCode.V000, 'Sinh viên không thuộc lớp này', [
          { property: 'class_id', code: ErrorCode.V000 }
        ])
      }

      // Check entry test completion (submitted or graded, or has non-null score)
      const hasCompletedEntryTest = await this.entryTestSubmissionRepository.exists({
        where: [{ studentId: currentUser.id, attemptStatus: AttemptStatus.SUBMITTED }]
      })

      if (!hasCompletedEntryTest) {
        throw new ValidationException(ErrorCode.V000, 'Sinh viên chưa hoàn thành bài kiểm tra đầu vào', [
          { property: 'entry_test', code: ErrorCode.V000 }
        ])
      }

      // Build query with filters, sorting, and pagination
      const query = this.moduleRepository
        .createQueryBuilder('module')
        .leftJoinAndSelect('module.class', 'class')
        .where('module.class.classId = :classId', { classId })

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

      // Calculate progress for each module
      let modulesResponse: (ModuleEntity & { progress_percent?: number })[] = modules
      const progressData = await Promise.all(
        modules.map((module) => this.getModuleProgress(module.moduleId, currentUser))
      )
      modulesResponse = modules.map((module, index) => ({
        ...module,
        progress_percent: progressData[index].progress_percent
      })) as (ModuleEntity & { progress_percent?: number })[]

      return {
        modules: modulesResponse.map((m) => ({
          moduleId: m.moduleId,
          moduleCode: m.moduleCode,
          moduleName: m.moduleName,
          moduleDescription: m.moduleDescription,
          progressPercent: m.progress_percent,
          banner: m.banner,
          class: m.class
            ? {
                classId: m.class.classId,
                classCode: m.class.classCode,
                className: m.class.className,
                classType: m.class.classType
              }
            : null,
          createdAt: m.createdAt,
          updatedAt: m.updatedAt
        })),
        pagination: metaDto
      }
    } catch (error) {
      throw error
    }
  }

  async assignLecturersToModule(moduleId: string, assignLecturersDto: AssignLecturersToModuleDto) {
    try {
      // Check if module exists
      const moduleEntity = await this.moduleRepository.findOne({ where: { moduleId } })
      if (!moduleEntity) {
        throw new ValidationException(ErrorCode.MODULE003, 'Không tìm thấy học phần', [
          {
            property: 'module_id',
            code: ErrorCode.MODULE003
          }
        ])
      }

      // Validate that all lecturer IDs exist and are lecturers
      const lecturers = await this.userRepository.find({
        where: { id: In(assignLecturersDto.lecturer_ids) },
        relations: ['role']
      })

      if (lecturers.length !== assignLecturersDto.lecturer_ids.length) {
        const foundIds = lecturers.map((l) => l.id)
        const missingIds = assignLecturersDto.lecturer_ids.filter((id) => !foundIds.includes(id))
        throw new ValidationException(ErrorCode.USER001, 'Không tìm thấy một số giảng viên', [
          {
            property: 'lecturer_ids',
            code: ErrorCode.USER001,
            message: `Lecturers not found: ${missingIds.join(', ')}`
          }
        ])
      }

      // Validate that all users are lecturers
      const nonLecturers = lecturers.filter((lecturer) => lecturer.role?.name !== RoleInAccount.Lecturer)
      if (nonLecturers.length > 0) {
        throw new ValidationException(ErrorCode.USER002, 'Một số người dùng không phải giảng viên', [
          {
            property: 'lecturer_ids',
            code: ErrorCode.USER002,
            message: `Non-lecturers found: ${nonLecturers.map((l) => l.name).join(', ')}`
          }
        ])
      }

      // Check for existing assignments
      const existingAssignments = await this.teachingModuleRepository.find({
        where: {
          module: { moduleId },
          lecturer: { id: In(assignLecturersDto.lecturer_ids) }
        },
        relations: ['lecturer']
      })

      if (existingAssignments.length > 0) {
        const alreadyAssignedIds = existingAssignments.map((a) => a.lecturer.id)
        throw new ValidationException(ErrorCode.MODULE004, 'Một số giảng viên đã được phân công cho học phần này', [
          {
            property: 'lecturer_ids',
            code: ErrorCode.MODULE004,
            message: `Lecturers already assigned: ${alreadyAssignedIds.join(', ')}`
          }
        ])
      }

      // Create teaching module assignments
      const teachingModules = lecturers.map((lecturer) => {
        const teachingModule = this.teachingModuleRepository.create({
          module: moduleEntity,
          lecturer,
          isActive: true
        })

        // Set end date if provided
        if (assignLecturersDto.end_date) {
          teachingModule.endDate = new Date(assignLecturersDto.end_date)
        }

        return teachingModule
      })

      const savedAssignments = await this.teachingModuleRepository.save(teachingModules)

      if (!savedAssignments || savedAssignments.length === 0) {
        throw new ValidationException(ErrorCode.MODULE005, 'Phân công giảng viên cho học phần thất bại')
      }

      return {
        moduleId: moduleEntity.moduleId,
        moduleCode: moduleEntity.moduleCode,
        moduleName: moduleEntity.moduleName,
        assignedLecturers: lecturers.map((lecturer) => ({
          lecturerId: lecturer.id,
          lecturerName: lecturer.name,
          lecturerEmail: lecturer.email,
          isActive: true,
          endDate: assignLecturersDto.end_date || null
        }))
      }
    } catch (error) {
      throw error
    }
  }

  async softDelete(moduleId: string) {
    try {
      const moduleEntity = await this.moduleRepository.findOne({ where: { moduleId } })
      if (!moduleEntity) {
        throw new ValidationException(ErrorCode.MODULE003, 'Không tìm thấy học phần', [
          {
            property: 'module_id',
            code: ErrorCode.MODULE003
          }
        ])
      }

      await this.moduleRepository.softDelete({ moduleId })

      const deleted = await this.moduleRepository.findOne({ where: { moduleId }, withDeleted: true })

      return {
        module_id: moduleId,
        deleted_at: deleted?.deletedAt as Date
      }
    } catch (error) {
      throw error
    }
  }
}
