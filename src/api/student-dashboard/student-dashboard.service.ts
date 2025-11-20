import { Injectable, Logger, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Between, MoreThanOrEqual } from 'typeorm'
import { User } from '@api/user/entities/user.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'
import { Class } from '@api/class/entities/class.entity'
import { ModuleEntity } from '@api/module/entities/module.entity'
import { LessonProgress } from '@api/lesson/entities/lesson-progress.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { Streak } from '@api/streak/entities/streak.entity'
import { RoleInAccount } from '@common/enums/account-role.enum'
import {
  StudentDashboardStatisticsResponseDto,
  StatisticsDto,
  DeltasDto,
  DeltaDto
} from './dto/student-dashboard-statistics.dto'
import { LearningHoursResponseDto, LearningHourDto } from './dto/learning-hours.dto'
import { DayStreakResponseDto, WeeklyActivityDto } from './dto/day-streak.dto'
import { StudentModulesResponseDto, StudentModuleDto } from './dto/student-modules.dto'
import { StudentModulesQueryDto } from './dto/query-params.dto'
import { paginate } from '@utils/offset-pagination'
import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { OffsetPaginationDto } from '@common/dto/offset-pagination/offset-pagination.dto'
import { plainToInstance } from 'class-transformer'
import { extractUserRole } from '@utils/common.util'

@Injectable()
export class StudentDashboardService {
  private readonly logger = new Logger(StudentDashboardService.name)

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ClassEnrolment)
    private readonly classEnrolmentRepository: Repository<ClassEnrolment>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepository: Repository<LessonProgress>,
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(Streak)
    private readonly streakRepository: Repository<Streak>
  ) {}

  /**
   * Verify student access - ensure user is accessing their own data
   */
  private async verifyStudentAccess(studentId: string, currentUserId: string, currentUserRole: string): Promise<void> {
    if (currentUserRole !== RoleInAccount.Student && currentUserRole !== RoleInAccount.Admin) {
      throw new ForbiddenException('Only students can access this resource')
    }

    if (currentUserRole === RoleInAccount.Student && studentId !== currentUserId) {
      throw new ForbiddenException('You can only access your own dashboard')
    }
  }

  /**
   * Get dashboard statistics for a student
   */
  async getDashboardStatistics(
    studentId: string,
    currentUser: User,
    period: 'month' | 'semester' | 'all' = 'month'
  ): Promise<StudentDashboardStatisticsResponseDto> {
    await this.verifyStudentAccess(studentId, currentUser.id, extractUserRole(currentUser))

    const now = new Date()
    let startDate: Date
    let previousStartDate: Date
    let previousEndDate: Date

    if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      previousEndDate = new Date(now.getFullYear(), now.getMonth(), 0)
    } else if (period === 'semester') {
      // Assuming semester is 6 months
      startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1)
      previousStartDate = new Date(now.getFullYear(), now.getMonth() - 11, 1)
      previousEndDate = new Date(now.getFullYear(), now.getMonth() - 6, 0)
    } else {
      // All time
      startDate = new Date(0)
      previousStartDate = new Date(0)
      previousEndDate = new Date(0)
    }

    // Get current period statistics
    const [ongoingCourses, completedCourses, certificatesEarned, averageRating] = await Promise.all([
      this.getOngoingCoursesCount(studentId, startDate),
      this.getCompletedCoursesCount(studentId, startDate),
      this.getCertificatesEarnedCount(studentId, startDate),
      this.getAverageRating(studentId, startDate)
    ])

    // Get previous period statistics for deltas
    const [prevOngoing, prevCompleted, prevCertificates, prevRating] = await Promise.all([
      this.getOngoingCoursesCount(studentId, previousStartDate, previousEndDate),
      this.getCompletedCoursesCount(studentId, previousStartDate, previousEndDate),
      this.getCertificatesEarnedCount(studentId, previousStartDate, previousEndDate),
      this.getAverageRating(studentId, previousStartDate, previousEndDate)
    ])

    const statistics: StatisticsDto = {
      ongoing_courses: ongoingCourses,
      completed_courses: completedCourses,
      certificates_earned: certificatesEarned,
      average_rating: averageRating
    }

    const deltas: DeltasDto = {
      ongoing_delta: this.calculateDelta(ongoingCourses, prevOngoing, period),
      completed_delta: this.calculateDelta(completedCourses, prevCompleted, period),
      certificates_delta: this.calculateDelta(certificatesEarned, prevCertificates, period),
      rating_delta: this.calculateDelta(averageRating, prevRating, period)
    }

    return { statistics, deltas }
  }

  /**
   * Get learning hours data for the last N days
   */
  async getLearningHours(studentId: string, currentUser: User, days: number = 16): Promise<LearningHoursResponseDto> {
    await this.verifyStudentAccess(studentId, currentUser.id, extractUserRole(currentUser))

    const endDate = new Date()
    endDate.setHours(23, 59, 59, 999)
    const startDate = new Date(endDate)
    startDate.setDate(startDate.getDate() - days + 1)
    startDate.setHours(0, 0, 0, 0)

    // Get lesson progress data grouped by date
    const progressData = await this.lessonProgressRepository
      .createQueryBuilder('lp')
      .select('DATE(lp.createdAt)', 'date')
      .addSelect('COUNT(DISTINCT lp.lessonId)', 'lessons')
      .where('lp.studentId = :studentId', { studentId })
      .andWhere('lp.createdAt >= :startDate', { startDate })
      .andWhere('lp.createdAt <= :endDate', { endDate })
      .groupBy('DATE(lp.createdAt)')
      .getRawMany()

    // Create a map of dates to hours (assuming 1 lesson = 1 hour for simplicity)
    const hoursMap = new Map<string, number>()
    progressData.forEach((item) => {
      const dateStr = new Date(item.date).toISOString().split('T')[0]
      hoursMap.set(dateStr, parseFloat(item.lessons) || 0)
    })

    // Generate array for all days
    const learningHours: LearningHourDto[] = []
    let totalHours = 0

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]
      const hours = hoursMap.get(dateStr) || 0
      totalHours += hours

      learningHours.push({
        day: i + 1,
        hours: Math.round(hours * 10) / 10, // Round to 1 decimal
        date: dateStr
      })
    }

    const averageDailyHours = totalHours / days
    const trend = this.calculateTrend(learningHours)

    return {
      learning_hours: learningHours,
      total_hours: Math.round(totalHours * 10) / 10,
      average_daily_hours: Math.round(averageDailyHours * 10) / 10,
      trend
    }
  }

  /**
   * Get day streak data
   */
  async getDayStreak(studentId: string, currentUser: User): Promise<DayStreakResponseDto> {
    await this.verifyStudentAccess(studentId, currentUser.id, extractUserRole(currentUser))

    const streak = await this.streakRepository.findOne({
      where: { studentId }
    })

    const currentStreak = streak?.currentStreak || 0
    const longestStreak = streak?.longestStreak || 0
    const lastActive = streak?.lastActivityDate || new Date()

    // Calculate streak start date
    const streakStartDate = new Date(lastActive)
    streakStartDate.setDate(streakStartDate.getDate() - (currentStreak - 1))

    // Get weekly activity (last 7 days)
    const weeklyActivity = await this.getWeeklyActivity(studentId)

    return {
      current_streak: currentStreak,
      longest_streak: longestStreak,
      weekly_activity: weeklyActivity,
      last_active: lastActive.toISOString(),
      streak_start_date: streakStartDate.toISOString()
    }
  }

  /**
   * Get student modules/courses
   */
  async getStudentModules(
    studentId: string,
    currentUser: User,
    query: StudentModulesQueryDto
  ): Promise<StudentModulesResponseDto> {
    await this.verifyStudentAccess(studentId, currentUser.id, extractUserRole(currentUser))

    const pageOptions = plainToInstance(PageOptionsDto, {
      page: query.page ?? 1,
      limit: query.limit ?? 10
    })

    const builder = this.classEnrolmentRepository
      .createQueryBuilder('enrolment')
      .leftJoinAndSelect('enrolment.class', 'class')
      .leftJoinAndSelect('class.modules', 'module')
      .leftJoinAndSelect('module.teachingModules', 'teachingModule')
      .leftJoinAndSelect('teachingModule.lecturer', 'lecturer')
      .leftJoinAndSelect('class.teachingAssignments', 'assignment')
      .leftJoinAndSelect('assignment.lecturer', 'classLecturer')
      .where('enrolment.studentId = :studentId', { studentId })
      .andWhere('enrolment.deletedAt IS NULL')

    // Filter by status
    if (query.status === 'ongoing') {
      builder.andWhere('class.endDate >= :now', { now: new Date() })
    } else if (query.status === 'completed') {
      builder.andWhere('class.endDate < :now', { now: new Date() })
    }

    // Sort
    let sortField: string
    if (query.sort_by === 'progress') {
      sortField = 'module.moduleId'
    } else {
      const sortMapping: Record<string, string> = {
        updated_at: 'class.updatedAt',
        created_at: 'class.createdAt'
      }
      sortField = sortMapping[query.sort_by ?? 'updated_at'] ?? 'class.updatedAt'
    }
    builder.orderBy(sortField, query.order || 'DESC')

    const [enrolments, pagination]: [ClassEnrolment[], OffsetPaginationDto] = await paginate(builder, pageOptions)

    const courses: StudentModuleDto[] = []

    for (const enrolment of enrolments) {
      const classEntity = enrolment.class
      if (!classEntity || !classEntity.modules || classEntity.modules.length === 0) continue

      for (const module of classEntity.modules) {
        // Get all lecturers for this module
        const lecturerNames = new Set<string>()
        if (module.teachingModules) {
          module.teachingModules.forEach((tm) => {
            if (tm.lecturer && tm.isActive) {
              lecturerNames.add(tm.lecturer.name)
            }
          })
        }
        if (classEntity.teachingAssignments) {
          classEntity.teachingAssignments.forEach((ta) => {
            if (ta.lecturer && ta.isActive) {
              lecturerNames.add(ta.lecturer.name)
            }
          })
        }

        // Calculate progress
        const progress = await this.calculateModuleProgress(studentId, module.moduleId)

        // Determine status
        const isCompleted = classEntity.endDate < new Date() || progress >= 100
        const status: 'ongoing' | 'completed' = isCompleted ? 'completed' : 'ongoing'

        courses.push({
          id: module.moduleId,
          module_id: module.moduleId,
          module_name: module.moduleName,
          module_code: module.moduleCode,
          class_type: classEntity.classType,
          class_name: classEntity.className,
          lecturer_names: Array.from(lecturerNames),
          progress: Math.round(progress),
          thumbnail: module.banner || null,
          status,
          completion_date: isCompleted ? classEntity.endDate.toISOString() : undefined,
          enrolled_at: enrolment.enrolmentDate.toISOString()
        })
      }
    }

    return {
      courses,
      pagination
    }
  }

  // Helper methods

  private async getOngoingCoursesCount(studentId: string, startDate: Date, endDate?: Date): Promise<number> {
    const builder = this.classEnrolmentRepository
      .createQueryBuilder('enrolment')
      .leftJoin('enrolment.class', 'class')
      .where('enrolment.studentId = :studentId', { studentId })
      .andWhere('enrolment.deletedAt IS NULL')
      .andWhere('class.endDate >= :now', { now: new Date() })

    if (endDate) {
      builder
        .andWhere('enrolment.enrolmentDate >= :startDate', { startDate })
        .andWhere('enrolment.enrolmentDate <= :endDate', { endDate })
    } else {
      builder.andWhere('enrolment.enrolmentDate >= :startDate', { startDate })
    }

    return builder.getCount()
  }

  private async getCompletedCoursesCount(studentId: string, startDate: Date, endDate?: Date): Promise<number> {
    const builder = this.classEnrolmentRepository
      .createQueryBuilder('enrolment')
      .leftJoin('enrolment.class', 'class')
      .where('enrolment.studentId = :studentId', { studentId })
      .andWhere('enrolment.deletedAt IS NULL')
      .andWhere('class.endDate < :now', { now: new Date() })

    if (endDate) {
      builder
        .andWhere('enrolment.enrolmentDate >= :startDate', { startDate })
        .andWhere('enrolment.enrolmentDate <= :endDate', { endDate })
    } else {
      builder.andWhere('enrolment.enrolmentDate >= :startDate', { startDate })
    }

    return builder.getCount()
  }

  private async getCertificatesEarnedCount(studentId: string, startDate: Date, endDate?: Date): Promise<number> {
    // For now, assume certificate = completed course with 100% progress
    // This can be enhanced later with actual certificate logic
    const builder = this.classEnrolmentRepository
      .createQueryBuilder('enrolment')
      .leftJoin('enrolment.class', 'class')
      .leftJoin('class.modules', 'module')
      .where('enrolment.studentId = :studentId', { studentId })
      .andWhere('enrolment.deletedAt IS NULL')
      .andWhere('class.endDate < :now', { now: new Date() })

    if (endDate) {
      builder
        .andWhere('enrolment.enrolmentDate >= :startDate', { startDate })
        .andWhere('enrolment.enrolmentDate <= :endDate', { endDate })
    } else {
      builder.andWhere('enrolment.enrolmentDate >= :startDate', { startDate })
    }

    // Check if student has 100% progress in all modules
    const enrolments = await builder.getMany()
    let certificates = 0

    for (const enrolment of enrolments) {
      const classEntity = await this.classRepository.findOne({
        where: { classId: enrolment.classId },
        relations: ['modules']
      })

      if (classEntity && classEntity.modules) {
        let allCompleted = true
        for (const module of classEntity.modules) {
          const progress = await this.calculateModuleProgress(studentId, module.moduleId)
          if (progress < 100) {
            allCompleted = false
            break
          }
        }
        if (allCompleted) {
          certificates++
        }
      }
    }

    return certificates
  }

  private async getAverageRating(studentId: string, startDate: Date, endDate?: Date): Promise<number> {
    void studentId
    void startDate
    void endDate
    // For now, return a default value as rating system may not be implemented
    // This can be enhanced when rating system is available
    return 0
  }

  private async calculateModuleProgress(studentId: string, moduleId: string): Promise<number> {
    const totalLessons = await this.lessonRepository.count({
      where: { moduleId }
    })

    if (totalLessons === 0) return 0

    const completedLessons = await this.lessonProgressRepository.count({
      where: {
        studentId,
        lesson: { moduleId },
        completedAt: MoreThanOrEqual(new Date(0))
      },
      relations: ['lesson']
    })

    return (completedLessons / totalLessons) * 100
  }

  private calculateDelta(current: number, previous: number, period: string): DeltaDto {
    if (previous === 0) {
      return {
        direction: current > 0 ? 'up' : 'down',
        value: current > 0 ? `+${current}` : '0',
        comparison_period: period === 'month' ? 'so với tháng trước' : period === 'semester' ? 'so với kỳ trước' : ''
      }
    }

    const change = ((current - previous) / previous) * 100
    const direction: 'up' | 'down' = change >= 0 ? 'up' : 'down'
    const value = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`
    const comparisonPeriod = period === 'month' ? 'so với tháng trước' : period === 'semester' ? 'so với kỳ trước' : ''

    return { direction, value, comparison_period: comparisonPeriod }
  }

  private calculateTrend(learningHours: LearningHourDto[]): 'up' | 'down' | 'stable' {
    if (learningHours.length < 2) return 'stable'

    const firstHalf = learningHours.slice(0, Math.floor(learningHours.length / 2))
    const secondHalf = learningHours.slice(Math.floor(learningHours.length / 2))

    const firstAvg = firstHalf.reduce((sum, item) => sum + item.hours, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((sum, item) => sum + item.hours, 0) / secondHalf.length

    const diff = ((secondAvg - firstAvg) / firstAvg) * 100

    if (Math.abs(diff) < 5) return 'stable'
    return diff > 0 ? 'up' : 'down'
  }

  private async getWeeklyActivity(studentId: string): Promise<WeeklyActivityDto[]> {
    const now = new Date()
    const dayOfWeek = now.getDay() // 0 = Sunday, 6 = Saturday
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - dayOfWeek)
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    const dayNames: ('S' | 'M' | 'T' | 'W' | 'T' | 'F' | 'S')[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    const weeklyActivity: WeeklyActivityDto[] = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)

      const dayStart = new Date(date)
      dayStart.setHours(0, 0, 0, 0)
      const dayEnd = new Date(date)
      dayEnd.setHours(23, 59, 59, 999)

      const progressCount = await this.lessonProgressRepository.count({
        where: {
          studentId,
          createdAt: Between(dayStart, dayEnd)
        }
      })

      const checked = progressCount > 0
      const hours = checked ? 1.0 : 0 // Simplified - can be enhanced with actual hours

      weeklyActivity.push({
        day: dayNames[i],
        checked,
        hours
      })
    }

    return weeklyActivity
  }
}
