import { Inject, Injectable } from '@nestjs/common'
import { Class } from './entities/class.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository, In } from 'typeorm'
import { CloudinaryService } from '@cloudinary/cloudinary.service'
import { CreateClassDto } from './dto/create-class.dto'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { GetClassesQueryDto } from './dto/get-classes-query.dto'
import { paginate } from '@utils/offset-pagination'
import { AssignLecturersDto } from './dto/assign-lecturers.dto'
import { TeachingAssignment } from './entities/teaching-assignment.entity'
import { User } from '@api/user/entities/user.entity'
import { RoleInAccount } from '@common/enums/account-role.enum'

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(TeachingAssignment)
    private readonly teachingAssignmentRepository: Repository<TeachingAssignment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(createClassDto: CreateClassDto) {
    try {
      const { class_code } = createClassDto

      const existingClass = await this.classRepository.findOne({ where: { classCode: class_code } })

      if (existingClass) {
        throw new ValidationException(ErrorCode.CLASS001, 'Class code already exists', [
          {
            property: 'class_code',
            code: ErrorCode.CLASS001
          }
        ])
      }

      const classEntity = this.classRepository.create({
        classCode: createClassDto.class_code,
        className: createClassDto.class_name,
        classType: createClassDto.class_type,
        startDate: createClassDto.start_date,
        endDate: createClassDto.end_date
      })

      const newClass = await this.classRepository.save(classEntity)
      if (!newClass) {
        throw new ValidationException(ErrorCode.CLASS002)
      }
      return newClass
    } catch (error) {
      throw error
    }
  }

  async getClasses(queryDto: GetClassesQueryDto) {
    const query = this.classRepository.createQueryBuilder('class')

    // Search filter
    if (queryDto.q) {
      query.andWhere('(class.className ILIKE :search OR class.classCode ILIKE :search)', { search: `%${queryDto.q}%` })
    }

    // Class type filter
    if (queryDto.class_type) {
      query.andWhere('class.classType = :classType', { classType: queryDto.class_type })
    }

    // Sorting
    const validSortFields = ['className', 'classCode', 'createdAt', 'updatedAt', 'startDate', 'endDate']
    const sortMapping: Record<string, string> = {
      class_name: 'className',
      class_code: 'classCode',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      start_date: 'startDate',
      end_date: 'endDate'
    }
    const rawSort = queryDto.sort_by || 'created_at'
    const mappedSort = sortMapping[rawSort]
    const sortField = validSortFields.includes(mappedSort) ? mappedSort : 'createdAt'
    query.orderBy(`class.${sortField}`, queryDto.order)

    // Pagination
    const [classes, metaDto] = await paginate<Class>(query, queryDto, {
      skipCount: false,
      takeAll: false
    })

    return {
      classes,
      meta: metaDto
    }
  }

  async getClassById(classId: string) {
    const classEntity = await this.classRepository.findOne({
      where: { classId },
      relations: ['teachingAssignments', 'teachingAssignments.lecturer']
    })

    if (!classEntity) {
      throw new ValidationException(ErrorCode.CLASS003, 'Class not found', [
        { property: 'classId', code: ErrorCode.CLASS003 }
      ])
    }

    // Map lecturers from active teaching assignments
    const lecturers =
      classEntity.teachingAssignments
        ?.filter((assignment) => assignment.isActive)
        .map((assignment) => ({
          id: assignment.lecturer.id,
          name: assignment.lecturer.name,
          email: assignment.lecturer.email,
          avatar: assignment.lecturer.avatar,
          phone: assignment.lecturer.phone
        })) || []

    return {
      class_id: classEntity.classId,
      class_code: classEntity.classCode,
      class_name: classEntity.className,
      class_type: classEntity.classType,
      start_date: classEntity.startDate,
      end_date: classEntity.endDate,
      is_active: classEntity.isActive,
      lecturers,
      created_at: classEntity.createdAt,
      updated_at: classEntity.updatedAt
    }
  }

  async assignLecturers(classId: string, assignLecturersDto: AssignLecturersDto) {
    try {
      const { lecturer_ids } = assignLecturersDto

      // Check if class exists
      const classEntity = await this.classRepository.findOne({
        where: { classId },
        relations: ['teachingAssignments', 'teachingAssignments.lecturer']
      })

      if (!classEntity) {
        throw new ValidationException(ErrorCode.CLASS003, 'Class not found', [
          {
            property: 'classId',
            code: ErrorCode.CLASS003
          }
        ])
      }

      // Check if all users exist and are lecturers
      const lecturers = await this.userRepository.find({
        where: { id: In(lecturer_ids) },
        relations: ['role']
      })

      if (lecturers.length !== lecturer_ids.length) {
        const foundIds = lecturers.map((l) => l.id)
        const notFoundIds = lecturer_ids.filter((id) => !foundIds.includes(id))
        throw new ValidationException(ErrorCode.CLASS004, 'Some lecturers not found', [
          {
            property: 'lecturer_ids',
            code: ErrorCode.CLASS004,
            message: `Lecturers not found: ${notFoundIds.join(', ')}`
          }
        ])
      }

      // Verify all users are lecturers
      const nonLecturers = lecturers.filter((user) => user.role?.name !== RoleInAccount.Lecturer)

      if (nonLecturers.length > 0) {
        throw new ValidationException(ErrorCode.CLASS005, 'Some users are not lecturers', [
          {
            property: 'lecturer_ids',
            code: ErrorCode.CLASS005,
            message: `Users are not lecturers: ${nonLecturers.map((u) => u.id).join(', ')}`
          }
        ])
      }

      // Check for existing active assignments
      const existingAssignments = await this.teachingAssignmentRepository.find({
        where: {
          class: { classId },
          lecturer: { id: In(lecturer_ids) },
          isActive: true
        },
        relations: ['lecturer']
      })

      if (existingAssignments.length > 0) {
        const alreadyAssignedIds = existingAssignments.map((a) => a.lecturer.id)
        throw new ValidationException(ErrorCode.CLASS007, 'Some lecturers are already assigned to this class', [
          {
            property: 'lecturer_ids',
            code: ErrorCode.CLASS007,
            message: `Lecturers already assigned: ${alreadyAssignedIds.join(', ')}`
          }
        ])
      }

      // Create teaching assignments
      const teachingAssignments = lecturers.map((lecturer) => {
        return this.teachingAssignmentRepository.create({
          lecturer,
          class: classEntity,
          isActive: true
        })
      })

      const savedAssignments = await this.teachingAssignmentRepository.save(teachingAssignments)

      if (!savedAssignments || savedAssignments.length === 0) {
        throw new ValidationException(ErrorCode.CLASS006, 'Failed to assign lecturers to class')
      }

      return {
        classId: classEntity.classId,
        classCode: classEntity.classCode,
        className: classEntity.className,
        assignedLecturers: lecturers.map((lecturer) => ({
          id: lecturer.id,
          name: lecturer.name,
          email: lecturer.email
        }))
      }
    } catch (error) {
      throw error
    }
  }
}
