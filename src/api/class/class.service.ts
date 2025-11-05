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
import { GetClassesQueryDto } from './dto/get-classes-query.dto'
import { paginate } from '@utils/offset-pagination'
import { AssignLecturersDto } from './dto/assign-lecturers-to-class.dto'
import { TeachingAssignment } from './entities/teaching-assignment.entity'
import { User } from '@api/user/entities/user.entity'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { plainToInstance } from 'class-transformer'
import { ClassDTO } from './dto/class.dto'
import { ArrangeStudentsDto, ClassArrangementResultDto } from './dto/arrange-students.dto'
import { EntryTestSubmissionEntity } from '@api/entry-test/entities/entry-test-submission.entity'
import { EntryTestEntity } from '@api/entry-test/entities/entry-test.entity'
import { AttemptStatus } from '@common/enums/attempt-status.enum'
import { ClassEnrolment } from './entities/class-enrolment.entity'

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(TeachingAssignment)
    private readonly teachingAssignmentRepository: Repository<TeachingAssignment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(EntryTestSubmissionEntity)
    private readonly entryTestSubmissionRepository: Repository<EntryTestSubmissionEntity>,
    @InjectRepository(EntryTestEntity)
    private readonly entryTestRepository: Repository<EntryTestEntity>,
    @InjectRepository(ClassEnrolment)
    private readonly classEnrolmentRepository: Repository<ClassEnrolment>,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(createClassDto: CreateClassDto) {
    try {
      const { class_code, start_date, end_date } = createClassDto

      const existingClass = await this.classRepository.findOne({ where: { classCode: class_code } })

      if (existingClass) {
        throw new ValidationException(ErrorCode.CLASS001, 'Class code already exists')
      }

      // Validate date range: startDate must be <= endDate
      const start = new Date(start_date)
      const end = new Date(end_date)

      if (start > end) {
        throw new ValidationException(ErrorCode.CLASS002, 'Start date must be before or equal to end date')
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
    const mappedClasses = classes.map((c) =>
      plainToInstance(ClassDTO, {
        class_id: c.classId,
        class_code: c.classCode,
        class_name: c.className,
        class_type: c.classType,
        start_date: c.startDate,
        end_date: c.endDate,
        is_active: c.isActive,
        created_at: c.createdAt,
        updated_at: c.updatedAt
      })
    )

    return {
      classes: mappedClasses,
      pagination: metaDto
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

    // Fetch enrolled students
    const enrollments = await this.classEnrolmentRepository.find({
      where: { classId },
      relations: ['student'],
      select: ['student', 'enrolmentDate']
    })

    // Map students from enrollments
    const students = enrollments.map((enrollment) => ({
      id: enrollment.student.id,
      name: enrollment.student.name,
      email: enrollment.student.email,
      avatar: enrollment.student.avatar,
      phone: enrollment.student.phone,
      enrolment_date: enrollment.enrolmentDate
    }))

    return {
      class_id: classEntity.classId,
      class_code: classEntity.classCode,
      class_name: classEntity.className,
      class_type: classEntity.classType,
      start_date: classEntity.startDate,
      end_date: classEntity.endDate,
      is_active: classEntity.isActive,
      lecturers,
      students,
      created_at: classEntity.createdAt,
      updated_at: classEntity.updatedAt
    }
  }

  async getClassesForStudent(studentId: string, queryDto: GetClassesQueryDto) {
    // Get enrolled class IDs for student
    const enrolments = await this.classEnrolmentRepository.find({
      where: { studentId },
      select: ['classId']
    })

    const classIds = enrolments.map((e) => e.classId)

    if (classIds.length === 0) {
      return {
        classes: [],
        pagination: {
          page: queryDto.page,
          limit: queryDto.limit,
          total_count: 0,
          total_pages: 0
        }
      }
    }

    const query = this.classRepository
      .createQueryBuilder('class')
      .where('class.classId IN (:...classIds)', { classIds })

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

    const mappedClasses = classes.map((c) =>
      plainToInstance(ClassDTO, {
        class_id: c.classId,
        class_code: c.classCode,
        class_name: c.className,
        class_type: c.classType,
        start_date: c.startDate,
        end_date: c.endDate,
        is_active: c.isActive,
        created_at: c.createdAt,
        updated_at: c.updatedAt
      })
    )

    return {
      classes: mappedClasses,
      pagination: metaDto
    }
  }

  async update(classId: string, updateClassDto: UpdateClassDto) {
    try {
      // Check if class exists
      const classEntity = await this.classRepository.findOne({ where: { classId } })

      if (!classEntity) {
        throw new ValidationException(ErrorCode.CLASS003, 'Class not found')
      }

      // Validate date range: start_date must be <= end_date
      const newStartDate = updateClassDto.start_date ? new Date(updateClassDto.start_date) : classEntity.startDate
      const newEndDate = updateClassDto.end_date ? new Date(updateClassDto.end_date) : classEntity.endDate

      if (newStartDate && newEndDate && newStartDate > newEndDate) {
        throw new ValidationException(ErrorCode.CLASS002, 'Start date must be before or equal to end date')
      }

      // Update the class with provided fields (map snake_case to entity fields)
      if (updateClassDto.class_name !== undefined) classEntity.className = updateClassDto.class_name
      if (updateClassDto.class_type !== undefined) classEntity.classType = updateClassDto.class_type
      if (updateClassDto.start_date !== undefined) classEntity.startDate = updateClassDto.start_date as unknown as Date
      if (updateClassDto.end_date !== undefined) classEntity.endDate = updateClassDto.end_date as unknown as Date
      if (updateClassDto.is_active !== undefined) classEntity.isActive = updateClassDto.is_active

      const updatedClass = await this.classRepository.save(classEntity)

      if (!updatedClass) {
        throw new ValidationException(ErrorCode.CLASS002, 'Failed to update class')
      }

      return {
        class_id: updatedClass.classId,
        class_code: updatedClass.classCode,
        class_name: updatedClass.className,
        class_type: updatedClass.classType,
        start_date: updatedClass.startDate,
        end_date: updatedClass.endDate,
        is_active: updatedClass.isActive,
        created_at: updatedClass.createdAt,
        updated_at: updatedClass.updatedAt
      }
    } catch (error) {
      throw error
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
        throw new ValidationException(ErrorCode.CLASS003, 'Class not found')
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

  async arrangeStudents(arrangeStudentsDto: ArrangeStudentsDto): Promise<ClassArrangementResultDto> {
    try {
      const { entryTestId, classDistribution } = arrangeStudentsDto

      // 1. Validate entry test exists
      const entryTest = await this.entryTestRepository.findOne({
        where: { entryTestId },
        select: ['entryTestId', 'title']
      })

      if (!entryTest) {
        throw new ValidationException(ErrorCode.ENTRY_TEST001, 'Entry test not found', [
          { property: 'entryTestId', code: ErrorCode.ENTRY_TEST001 }
        ])
      }

      // 2. Validate all classes exist and are active
      const classIds = classDistribution.map((dist) => dist.classId)
      const classes = await this.classRepository.find({
        where: { classId: In(classIds) },
        select: ['classId', 'className', 'isActive']
      })

      if (classes.length !== classIds.length) {
        const foundIds = classes.map((c) => c.classId)
        const missingIds = classIds.filter((id) => !foundIds.includes(id))
        throw new ValidationException(ErrorCode.CLASS001, 'Some classes not found', [
          {
            property: 'classDistribution',
            code: ErrorCode.CLASS001,
            message: `Missing classes: ${missingIds.join(', ')}`
          }
        ])
      }

      // Check if all classes are active
      const inactiveClasses = classes.filter((c) => !c.isActive)
      if (inactiveClasses.length > 0) {
        const inactiveIds = inactiveClasses.map((c) => c.classId)
        throw new ValidationException(ErrorCode.CLASS001, 'Some classes are not active', [
          {
            property: 'classDistribution',
            code: ErrorCode.CLASS001,
            message: `Inactive classes: ${inactiveIds.join(', ')}`
          }
        ])
      }

      // 3. Validate score ranges don't overlap
      this.validateScoreRanges(classDistribution)

      // 4. Get all submitted entry test submissions with scores
      const submissions = await this.entryTestSubmissionRepository.find({
        where: {
          entryTestId,
          attemptStatus: AttemptStatus.SUBMITTED
        },
        relations: ['student'],
        select: ['studentId', 'score', 'student']
      })

      if (submissions.length === 0) {
        throw new ValidationException(ErrorCode.ENTRY_TEST001, 'No submitted entries found for this entry test', [
          { property: 'entryTestId', code: ErrorCode.ENTRY_TEST001 }
        ])
      }

      // 5. Check for existing enrollments to avoid duplicates
      const studentIds = submissions.map((s) => s.studentId)
      const existingEnrollments = await this.classEnrolmentRepository.find({
        where: {
          studentId: In(studentIds),
          classId: In(classIds)
        },
        select: ['studentId', 'classId']
      })

      // Create a set of existing enrollments for quick lookup
      const existingEnrollmentSet = new Set(existingEnrollments.map((e) => `${e.studentId}-${e.classId}`))

      // 6. Process student assignments and create enrollments
      const enrollmentsToCreate: Partial<ClassEnrolment>[] = []
      const classDistributionSummary: Record<string, { count: number; classId: string; className: string }> = {}
      const enrolmentDate = new Date()

      // Initialize summary counters
      classDistribution.forEach((dist) => {
        const classInfo = classes.find((c) => c.classId === dist.classId)
        classDistributionSummary[dist.range] = {
          count: 0,
          classId: dist.classId,
          className: classInfo?.className || ''
        }
      })

      let enrolledCount = 0
      let unenrolledCount = 0

      for (const submission of submissions) {
        const student = submission.student
        const score = submission.score

        if (score === null) {
          unenrolledCount++
          continue
        }

        const assignment = this.findClassForScore(score, classDistribution, classes)

        if (assignment) {
          // Check if enrollment already exists
          const enrollmentKey = `${student.id}-${assignment.classId}`
          if (!existingEnrollmentSet.has(enrollmentKey)) {
            enrollmentsToCreate.push({
              studentId: student.id,
              classId: assignment.classId,
              enrolmentDate: enrolmentDate
            })
            classDistributionSummary[assignment.range].count++
            enrolledCount++
          } else {
            // Student already enrolled in this class
            enrolledCount++
          }
        } else {
          unenrolledCount++
        }
      }

      // 7. Save enrollments to database in batch
      if (enrollmentsToCreate.length > 0) {
        await this.classEnrolmentRepository.save(enrollmentsToCreate)
      }

      // 8. Return result
      return {
        entryTestId: entryTest.entryTestId,
        entryTestTitle: entryTest.title,
        totalStudents: submissions.length,
        enrolledStudents: enrolledCount,
        unenrolledCount: unenrolledCount,
        classDistributionSummary,
        summary: {
          success: true,
          message: `Successfully enrolled ${enrolledCount} students into classes`,
          enrolmentDate: enrolmentDate.toISOString()
        }
      }
    } catch (error) {
      throw error
    }
  }

  private validateScoreRanges(classDistribution: { range: string; classId: string }[]): void {
    const ranges = classDistribution.map((dist) => dist.range)

    // Check for duplicate ranges
    const uniqueRanges = new Set(ranges)
    if (uniqueRanges.size !== ranges.length) {
      throw new ValidationException(ErrorCode.V004, 'Duplicate score ranges found', [
        { property: 'classDistribution', code: ErrorCode.V004 }
      ])
    }

    // Parse and validate ranges
    const parsedRanges: { min: number; max: number; range: string }[] = []

    for (const range of ranges) {
      const parsed = this.parseScoreRange(range)
      if (!parsed) {
        throw new ValidationException(ErrorCode.V004, `Invalid score range format: ${range}`, [
          { property: 'classDistribution', code: ErrorCode.V004 }
        ])
      }
      parsedRanges.push({ ...parsed, range })
    }

    // Check for overlapping ranges
    for (let i = 0; i < parsedRanges.length; i++) {
      for (let j = i + 1; j < parsedRanges.length; j++) {
        const range1 = parsedRanges[i]
        const range2 = parsedRanges[j]

        if (this.rangesOverlap(range1, range2)) {
          throw new ValidationException(
            ErrorCode.V004,
            `Overlapping score ranges: ${range1.range} and ${range2.range}`,
            [{ property: 'classDistribution', code: ErrorCode.V004 }]
          )
        }
      }
    }
  }

  private parseScoreRange(range: string): { min: number; max: number } | null {
    // Handle different range formats: "0-5", ">8", "<5", "5-10"
    if (range.includes('-')) {
      const [minStr, maxStr] = range.split('-')
      const min = parseFloat(minStr.trim())
      const max = parseFloat(maxStr.trim())

      if (isNaN(min) || isNaN(max) || min >= max) {
        return null
      }

      return { min, max }
    } else if (range.startsWith('>')) {
      const min = parseFloat(range.substring(1).trim())
      if (isNaN(min)) return null
      return { min, max: 10 } // Assuming 10 is max score
    } else if (range.startsWith('<')) {
      const max = parseFloat(range.substring(1).trim())
      if (isNaN(max)) return null
      return { min: 0, max } // Assuming 0 is min score
    }

    return null
  }

  private rangesOverlap(range1: { min: number; max: number }, range2: { min: number; max: number }): boolean {
    return range1.min < range2.max && range2.min < range1.max
  }

  private findClassForScore(
    score: number,
    classDistribution: { range: string; classId: string }[],
    classes: { classId: string; className: string }[]
  ): { classId: string; className: string; range: string } | null {
    for (const dist of classDistribution) {
      const parsed = this.parseScoreRange(dist.range)
      if (!parsed) continue

      if (score >= parsed.min && score <= parsed.max) {
        const classInfo = classes.find((c) => c.classId === dist.classId)
        if (classInfo) {
          return {
            classId: classInfo.classId,
            className: classInfo.className,
            range: dist.range
          }
        }
      }
    }

    return null
  }
}
