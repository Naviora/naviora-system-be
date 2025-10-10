import { Inject, Injectable } from '@nestjs/common'
import { Class } from './entities/class.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository, In } from 'typeorm'
import { CloudinaryService } from '@cloudinary/cloudinary.service'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
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
      const { classCode, startDate, endDate } = createClassDto

      const existingClass = await this.classRepository.findOne({ where: { classCode } })

      if (existingClass) {
        throw new ValidationException(ErrorCode.CLASS001, 'Class code already exists')
      }

      // Validate date range: startDate must be <= endDate
      const start = new Date(startDate)
      const end = new Date(endDate)

      if (start > end) {
        throw new ValidationException(ErrorCode.CLASS002, 'Start date must be before or equal to end date')
      }

      const classEntity = this.classRepository.create(createClassDto)

      const newClass = await this.classRepository.save(classEntity)
      if (!newClass) {
        throw new ValidationException(ErrorCode.CLASS002)
      }
      return newClass
    } catch (error) {
      throw error
    }
  }

  async update(classId: string, updateClassDto: UpdateClassDto) {
    try {
      // Check if class exists
      const classEntity = await this.classRepository.findOne({ where: { classId } })

      if (!classEntity) {
        throw new ValidationException(ErrorCode.CLASS003, 'Class not found')
      }

      // Validate date range: startDate must be <= endDate
      const newStartDate = updateClassDto.startDate ? new Date(updateClassDto.startDate) : classEntity.startDate
      const newEndDate = updateClassDto.endDate ? new Date(updateClassDto.endDate) : classEntity.endDate

      if (newStartDate && newEndDate && newStartDate > newEndDate) {
        throw new ValidationException(ErrorCode.CLASS002, 'Start date must be before or equal to end date')
      }

      // Update the class with provided fields
      Object.assign(classEntity, updateClassDto)

      const updatedClass = await this.classRepository.save(classEntity)

      if (!updatedClass) {
        throw new ValidationException(ErrorCode.CLASS002, 'Failed to update class')
      }

      return updatedClass
    } catch (error) {
      throw error
    }
  }

  async assignLecturers(classId: string, assignLecturersDto: AssignLecturersDto) {
    try {
      const { lecturerIds } = assignLecturersDto

      // Check if class exists
      const classEntity = await this.classRepository.findOne({
        where: { classId },
        relations: ['teachingAssignments', 'teachingAssignments.lecturer']
      })

      if (!classEntity) {
        throw new ValidationException(ErrorCode.CLASS003, 'Class not found')
      }

      // Check if all users exist and are lecturers
      const lecturers = await this.userRepository.find({
        where: { id: In(lecturerIds) },
        relations: ['role']
      })

      if (lecturers.length !== lecturerIds.length) {
        const foundIds = lecturers.map((l) => l.id)
        const notFoundIds = lecturerIds.filter((id) => !foundIds.includes(id))
        throw new ValidationException(ErrorCode.CLASS004, 'Some lecturers not found', [
          {
            property: 'lecturerIds',
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
            property: 'lecturerIds',
            code: ErrorCode.CLASS005,
            message: `Users are not lecturers: ${nonLecturers.map((u) => u.id).join(', ')}`
          }
        ])
      }

      // Check for existing active assignments
      const existingAssignments = await this.teachingAssignmentRepository.find({
        where: {
          class: { classId },
          lecturer: { id: In(lecturerIds) },
          isActive: true
        },
        relations: ['lecturer']
      })

      if (existingAssignments.length > 0) {
        const alreadyAssignedIds = existingAssignments.map((a) => a.lecturer.id)
        throw new ValidationException(ErrorCode.CLASS007, 'Some lecturers are already assigned to this class', [
          {
            property: 'lecturerIds',
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
