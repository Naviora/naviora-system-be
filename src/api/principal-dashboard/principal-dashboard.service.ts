import { Injectable, Logger, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Between } from 'typeorm'
import { User } from '@api/user/entities/user.entity'
import { Class } from '@api/class/entities/class.entity'
import { ModuleEntity } from '@api/module/entities/module.entity'
import { EntryTestEntity } from '@api/entry-test/entities/entry-test.entity'
import { FinalExamEntity } from '@api/final-exam/entities/final-exam.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'
import { TeachingAssignment } from '@api/class/entities/teaching-assignment.entity'
import { RoleInAccount } from '@common/enums/account-role.enum'
import {
  PrincipalDashboardStatisticsResponseDto,
  PrincipalStatisticsDto
} from './dto/principal-dashboard-statistics.dto'
import { PerformanceMetricsResponseDto, PerformanceMetricsDto } from './dto/performance-metrics.dto'
import { ExamsTodayResponseDto, ExamTodayDto } from './dto/exams-today.dto'
import {
  PrincipalDashboardStatisticsQueryDto,
  PerformanceMetricsQueryDto,
  PrincipalClassesQueryDto,
  PrincipalModulesQueryDto
} from './dto/query-params.dto'
import { PrincipalClassesResponseDto, PrincipalClassDto } from './dto/principal-classes.dto'
import { PrincipalModulesResponseDto, PrincipalModuleDto } from './dto/principal-modules.dto'
import { paginate } from '@utils/offset-pagination'
import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { OffsetPaginationDto } from '@common/dto/offset-pagination/offset-pagination.dto'
import { plainToInstance } from 'class-transformer'
import { extractUserRole } from '@utils/common.util'

@Injectable()
export class PrincipalDashboardService {
  private readonly logger = new Logger(PrincipalDashboardService.name)

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(EntryTestEntity)
    private readonly entryTestRepository: Repository<EntryTestEntity>,
    @InjectRepository(FinalExamEntity)
    private readonly finalExamRepository: Repository<FinalExamEntity>,
    @InjectRepository(ClassEnrolment)
    private readonly classEnrolmentRepository: Repository<ClassEnrolment>,
    @InjectRepository(TeachingAssignment)
    private readonly teachingAssignmentRepository: Repository<TeachingAssignment>
  ) {}

  private verifyPrincipalAccess(currentUserRole: string): void {
    if (currentUserRole !== RoleInAccount.Principal && currentUserRole !== RoleInAccount.Admin) {
      throw new ForbiddenException('Only principals can access this resource')
    }
  }

  async getDashboardStatistics(
    currentUser: User,
    query: PrincipalDashboardStatisticsQueryDto
  ): Promise<PrincipalDashboardStatisticsResponseDto> {
    this.verifyPrincipalAccess(extractUserRole(currentUser))

    const now = new Date()
    const today = new Date(now)
    today.setHours(0, 0, 0, 0)
    const endOfToday = new Date(now)
    endOfToday.setHours(23, 59, 59, 999)

    const [totalClasses, totalModules, totalExamsToday, systemPerformance] = await Promise.all([
      this.classRepository.count({ where: { deletedAt: null as any } }),
      this.moduleRepository.count({ where: { deletedAt: null as any } }),
      this.getExamsTodayCount(today, endOfToday),
      this.calculateSystemPerformance()
    ])

    const statistics: PrincipalStatisticsDto = {
      total_classes: totalClasses,
      total_modules: totalModules,
      total_exams_today: totalExamsToday,
      system_performance: systemPerformance
    }

    return { statistics }
  }

  async getExamsToday(currentUser: User): Promise<ExamsTodayResponseDto> {
    this.verifyPrincipalAccess(extractUserRole(currentUser))

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const endOfToday = new Date(today)
    endOfToday.setHours(23, 59, 59, 999)

    const [finalExams, entryTests] = await Promise.all([
      this.finalExamRepository.find({
        where: {
          startTime: Between(today, endOfToday)
        },
        relations: ['createdBy']
      }),
      this.entryTestRepository.find({
        where: {
          startTime: Between(today, endOfToday)
        },
        relations: ['createdBy']
      })
    ])

    const exams: ExamTodayDto[] = []

    // Process final exams
    for (const exam of finalExams) {
      exams.push({
        id: exam.finalExamId,
        exam_code: `FINAL-${exam.finalExamId.slice(0, 8)}`,
        exam_name: exam.title,
        module_id: '', // Can be enhanced
        module_name: exam.description || 'N/A',
        class_id: '', // Can be enhanced
        class_name: 'N/A',
        start_time: exam.startTime.toTimeString().slice(0, 5),
        end_time: exam.endTime.toTimeString().slice(0, 5),
        total_students: 0, // Can be enhanced
        participated_students: 0, // Can be enhanced
        status: exam.startTime > new Date() ? 'pending' : exam.endTime < new Date() ? 'completed' : 'in-progress'
      })
    }

    // Process entry tests
    for (const test of entryTests) {
      exams.push({
        id: test.entryTestId,
        exam_code: `ENTRY-${test.entryTestId.slice(0, 8)}`,
        exam_name: test.title,
        module_id: '',
        module_name: test.description || 'N/A',
        class_id: '',
        class_name: 'N/A',
        start_time: test.startTime.toTimeString().slice(0, 5),
        end_time: test.endTime.toTimeString().slice(0, 5),
        total_students: 0,
        participated_students: 0,
        status: test.startTime > new Date() ? 'pending' : test.endTime < new Date() ? 'completed' : 'in-progress'
      })
    }

    return {
      date: today.toISOString().split('T')[0],
      exams
    }
  }

  async getPerformanceMetrics(
    currentUser: User,
    query: PerformanceMetricsQueryDto
  ): Promise<PerformanceMetricsResponseDto> {
    this.verifyPrincipalAccess(extractUserRole(currentUser))

    // Calculate performance metrics
    const [averageStudentScore, courseCompletionRate, studentEngagementRate, lecturerActivityRate] = await Promise.all([
      this.calculateAverageStudentScore(),
      this.calculateCourseCompletionRate(),
      this.calculateStudentEngagementRate(),
      this.calculateLecturerActivityRate()
    ])

    const overallScore = (averageStudentScore + courseCompletionRate + studentEngagementRate + lecturerActivityRate) / 4

    const performance: PerformanceMetricsDto = {
      overall_score: Math.round(overallScore * 10) / 10,
      average_student_score: Math.round(averageStudentScore * 10) / 10,
      course_completion_rate: Math.round(courseCompletionRate * 10) / 10,
      student_engagement_rate: Math.round(studentEngagementRate * 10) / 10,
      lecturer_activity_rate: Math.round(lecturerActivityRate * 10) / 10,
      system_uptime: 99.9, // Default - can be enhanced with actual monitoring
      average_response_time: 150, // Default - can be enhanced with actual metrics
      active_sessions: await this.getActiveSessionsCount()
    }

    return {
      performance,
      trend: 'stable', // Can be enhanced with comparison logic
      timestamp: new Date().toISOString()
    }
  }

  // Helper methods
  private async getExamsTodayCount(startDate: Date, endDate: Date): Promise<number> {
    const [finalExams, entryTests] = await Promise.all([
      this.finalExamRepository.count({
        where: {
          startTime: Between(startDate, endDate)
        }
      }),
      this.entryTestRepository.count({
        where: {
          startTime: Between(startDate, endDate)
        }
      })
    ])

    return finalExams + entryTests
  }

  private async calculateSystemPerformance(): Promise<number> {
    // Simplified calculation - can be enhanced
    const totalClasses = await this.classRepository.count({ where: { deletedAt: null as any } })
    const totalModules = await this.moduleRepository.count({ where: { deletedAt: null as any } })
    const totalStudents = await this.userRepository.count({
      where: { role: { name: RoleInAccount.Student }, deletedAt: null as any },
      relations: ['role']
    })

    // Simple scoring algorithm
    const score = Math.min(10, totalClasses * 0.1 + totalModules * 0.1 + totalStudents * 0.01)
    return Math.round(score * 10) / 10
  }

  private async calculateAverageStudentScore(): Promise<number> {
    // Simplified - can be enhanced with actual score calculation
    return 7.5
  }

  private async calculateCourseCompletionRate(): Promise<number> {
    // Simplified - can be enhanced with actual completion calculation
    const totalEnrolments = await this.classEnrolmentRepository.count({ where: { deletedAt: null as any } })
    const completedEnrolments = await this.classEnrolmentRepository
      .createQueryBuilder('enrolment')
      .leftJoin('enrolment.class', 'class')
      .where('enrolment.deletedAt IS NULL')
      .andWhere('class.endDate < :now', { now: new Date() })
      .getCount()

    if (totalEnrolments === 0) return 0
    return (completedEnrolments / totalEnrolments) * 100
  }

  private async calculateStudentEngagementRate(): Promise<number> {
    // Simplified - can be enhanced with actual engagement metrics
    return 80.0
  }

  private async calculateLecturerActivityRate(): Promise<number> {
    const totalLecturers = await this.userRepository.count({
      where: { role: { name: RoleInAccount.Lecturer }, deletedAt: null as any },
      relations: ['role']
    })

    const activeLecturers = await this.teachingAssignmentRepository
      .createQueryBuilder('assignment')
      .leftJoin('assignment.lecturer', 'lecturer')
      .where('assignment.isActive = :isActive', { isActive: true })
      .andWhere('assignment.deletedAt IS NULL')
      .select('COUNT(DISTINCT lecturer.id)', 'count')
      .getRawOne()

    if (totalLecturers === 0) return 0
    const activeCount = parseInt(activeLecturers?.count || '0')
    return (activeCount / totalLecturers) * 100
  }

  private async getActiveSessionsCount(): Promise<number> {
    // Simplified - can be enhanced with actual session tracking
    return 250
  }

  async getPrincipalClasses(currentUser: User, query: PrincipalClassesQueryDto): Promise<PrincipalClassesResponseDto> {
    this.verifyPrincipalAccess(extractUserRole(currentUser))

    const pageOptions = plainToInstance(PageOptionsDto, {
      page: query.page ?? 1,
      limit: query.limit ?? 50
    })

    const builder = this.classRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.enrolments', 'enrolment')
      .leftJoinAndSelect('class.teachingAssignments', 'assignment')
      .leftJoinAndSelect('class.modules', 'module')
      .where('class.deletedAt IS NULL')

    if (query.search) {
      builder.andWhere('(class.className ILIKE :search OR class.classCode ILIKE :search)', {
        search: `%${query.search}%`
      })
    }

    if (query.status === 'active') {
      builder.andWhere('class.isActive = :isActive', { isActive: true })
    } else if (query.status === 'inactive') {
      builder.andWhere('class.isActive = :isActive', { isActive: false })
    }

    if (query.class_type) {
      builder.andWhere('class.classType = :classType', { classType: query.class_type })
    }

    const classSortMapping: Record<string, string> = {
      updated_at: 'class.updatedAt',
      created_at: 'class.createdAt',
      class_name: 'class.className',
      student_count: 'class.updatedAt'
    }
    const sortField = classSortMapping[query.sort_by ?? 'updated_at'] ?? 'class.updatedAt'
    builder.orderBy(sortField, query.order || 'DESC')

    const [classes, pagination]: [Class[], OffsetPaginationDto] = await paginate(builder, pageOptions)

    const result: PrincipalClassDto[] = classes.map((classEntity) => {
      const studentCount = classEntity.enrolments?.filter((e) => !e.deletedAt).length || 0
      const lecturerCount = classEntity.teachingAssignments?.filter((a) => a.isActive && !a.deletedAt).length || 0
      const moduleCount = classEntity.modules?.length || 0

      const startDateIso =
        classEntity.startDate instanceof Date
          ? classEntity.startDate.toISOString()
          : new Date(classEntity.startDate).toISOString()
      const endDateIso =
        classEntity.endDate instanceof Date
          ? classEntity.endDate.toISOString()
          : new Date(classEntity.endDate).toISOString()
      const updatedAtIso =
        classEntity.updatedAt instanceof Date
          ? classEntity.updatedAt.toISOString()
          : new Date(classEntity.updatedAt).toISOString()

      return {
        id: classEntity.classId,
        class_code: classEntity.classCode,
        class_name: classEntity.className,
        class_type: classEntity.classType,
        student_count: studentCount,
        lecturer_count: lecturerCount,
        start_date: startDateIso,
        end_date: endDateIso,
        is_active: classEntity.isActive,
        module_count: moduleCount,
        updated_at: updatedAtIso
      }
    })

    return { classes: result, pagination }
  }

  async getPrincipalModules(currentUser: User, query: PrincipalModulesQueryDto): Promise<PrincipalModulesResponseDto> {
    this.verifyPrincipalAccess(extractUserRole(currentUser))

    const pageOptions = plainToInstance(PageOptionsDto, {
      page: query.page ?? 1,
      limit: query.limit ?? 50
    })

    const builder = this.moduleRepository
      .createQueryBuilder('module')
      .leftJoinAndSelect('module.class', 'class')
      .leftJoinAndSelect('class.enrolments', 'enrolment')
      .leftJoinAndSelect('module.teachingModules', 'teachingModule')
      .leftJoinAndSelect('teachingModule.lecturer', 'lecturer')
      .leftJoinAndSelect('module.lessons', 'lessons')
      .where('module.deletedAt IS NULL')

    if (query.search) {
      builder.andWhere('(module.moduleName ILIKE :search OR module.moduleCode ILIKE :search)', {
        search: `%${query.search}%`
      })
    }

    // Status filter can be enhanced when status field is added to module
    // if (query.status !== 'all') {
    //   builder.andWhere('module.status = :status', { status: query.status })
    // }

    const sortField = query.sort_by === 'class_count' ? 'class' : `module.${query.sort_by || 'updatedAt'}`
    builder.orderBy(sortField, query.order || 'DESC')

    const [modules, pagination]: [ModuleEntity[], OffsetPaginationDto] = await paginate(builder, pageOptions)

    const result: PrincipalModuleDto[] = modules.map((module) => {
      const classCount = module.class ? 1 : 0 // Simplified - can be enhanced
      const lecturerCount = new Set(module.teachingModules?.map((tm) => tm.lecturer?.id).filter(Boolean) || []).size
      const studentCount = module.class?.enrolments?.filter((e) => !e.deletedAt).length || 0
      const lessonCount = module.lessons?.length || 0

      return {
        id: module.moduleId,
        module_code: module.moduleCode,
        module_name: module.moduleName,
        module_description: module.moduleDescription,
        status: 'published', // Default - can be enhanced when status field is added
        class_count: classCount,
        lecturer_count: lecturerCount,
        student_count: studentCount,
        lesson_count: lessonCount,
        created_at: module.createdAt.toISOString(),
        updated_at: module.updatedAt.toISOString()
      }
    })

    return { modules: result, pagination }
  }
}
