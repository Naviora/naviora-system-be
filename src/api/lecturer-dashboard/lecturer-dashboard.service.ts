import { Injectable, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Between, MoreThanOrEqual } from 'typeorm'
import { User } from '@api/user/entities/user.entity'
import { TeachingAssignment } from '@api/class/entities/teaching-assignment.entity'
import { TeachingModule } from '@api/module/entities/teaching-module.entity'
import { MeetingEventEntity } from '@api/meeting-events/entities/meeting-event.entity'
import { EntryTestEntity } from '@api/entry-test/entities/entry-test.entity'
import { FinalExamEntity } from '@api/final-exam/entities/final-exam.entity'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { LecturerDashboardStatisticsResponseDto, LecturerStatisticsDto } from './dto/lecturer-dashboard-statistics.dto'
import { LecturerClassesResponseDto, LecturerClassDto } from './dto/lecturer-classes.dto'
import { LecturerModulesResponseDto, LecturerModuleDto } from './dto/lecturer-modules.dto'
import { TodayScheduleResponseDto, TodaySessionDto } from './dto/today-schedule.dto'
import { UpcomingActivitiesResponseDto, UpcomingActivityDto } from './dto/upcoming-activities.dto'
import { LecturerClassesQueryDto, LecturerModulesQueryDto, UpcomingActivitiesQueryDto } from './dto/query-params.dto'
import { paginate } from '@utils/offset-pagination'
import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { OffsetPaginationDto } from '@common/dto/offset-pagination/offset-pagination.dto'
import { plainToInstance } from 'class-transformer'
import { extractUserRole } from '@utils/common.util'

@Injectable()
export class LecturerDashboardService {
  constructor(
    @InjectRepository(TeachingAssignment)
    private readonly teachingAssignmentRepository: Repository<TeachingAssignment>,
    @InjectRepository(TeachingModule)
    private readonly teachingModuleRepository: Repository<TeachingModule>,
    @InjectRepository(MeetingEventEntity)
    private readonly meetingEventRepository: Repository<MeetingEventEntity>,
    @InjectRepository(EntryTestEntity)
    private readonly entryTestRepository: Repository<EntryTestEntity>,
    @InjectRepository(FinalExamEntity)
    private readonly finalExamRepository: Repository<FinalExamEntity>
  ) {}

  private async verifyLecturerAccess(
    lecturerId: string,
    currentUserId: string,
    currentUserRole: string
  ): Promise<void> {
    if (currentUserRole !== RoleInAccount.Lecturer && currentUserRole !== RoleInAccount.Admin) {
      throw new ForbiddenException('Only lecturers can access this resource')
    }

    if (currentUserRole === RoleInAccount.Lecturer && lecturerId !== currentUserId) {
      throw new ForbiddenException('You can only access your own dashboard')
    }
  }

  async getDashboardStatistics(lecturerId: string, currentUser: User): Promise<LecturerDashboardStatisticsResponseDto> {
    await this.verifyLecturerAccess(lecturerId, currentUser.id, extractUserRole(currentUser))

    const now = new Date()
    const startOfToday = new Date(now.setHours(0, 0, 0, 0))
    const endOfToday = new Date(now.setHours(23, 59, 59, 999))
    const sevenDaysLater = new Date(now)
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7)

    const [assignedClasses, currentSemesterModules, teachingSessionsToday, upcomingActivities] = await Promise.all([
      this.getAssignedClassesCount(lecturerId),
      this.getCurrentSemesterModulesCount(lecturerId),
      this.getTeachingSessionsTodayCount(lecturerId, startOfToday, endOfToday),
      this.getUpcomingActivitiesCount(lecturerId, now, sevenDaysLater)
    ])

    const statistics: LecturerStatisticsDto = {
      assigned_classes: assignedClasses,
      current_semester_modules: currentSemesterModules,
      teaching_sessions_today: teachingSessionsToday,
      upcoming_activities: upcomingActivities
    }

    return { statistics }
  }

  async getLecturerClasses(
    lecturerId: string,
    currentUser: User,
    query: LecturerClassesQueryDto
  ): Promise<LecturerClassesResponseDto> {
    await this.verifyLecturerAccess(lecturerId, currentUser.id, extractUserRole(currentUser))

    const pageOptions = plainToInstance(PageOptionsDto, {
      page: query.page ?? 1,
      limit: query.limit ?? 20
    })

    const builder = this.teachingAssignmentRepository
      .createQueryBuilder('assignment')
      .leftJoinAndSelect('assignment.class', 'class')
      .leftJoinAndSelect('class.enrolments', 'enrolment')
      .where('assignment.lecturer.id = :lecturerId', { lecturerId })
      .andWhere('assignment.isActive = :isActive', { isActive: true })
      .andWhere('assignment.deletedAt IS NULL')

    if (query.status === 'active') {
      builder.andWhere('class.endDate >= :now', { now: new Date() })
    } else if (query.status === 'completed') {
      builder.andWhere('class.endDate < :now', { now: new Date() })
    }

    const sortMapping: Record<string, string> = {
      updated_at: 'class.updatedAt',
      created_at: 'class.createdAt',
      class_name: 'class.className'
    }
    const sortField = sortMapping[query.sort_by ?? 'updated_at'] ?? 'class.updatedAt'
    builder.orderBy(sortField, query.order || 'DESC')

    const [assignments, pagination]: [TeachingAssignment[], OffsetPaginationDto] = await paginate(builder, pageOptions)

    const classes: LecturerClassDto[] = assignments.map((assignment) => {
      const classEntity = assignment.class
      const studentCount = classEntity.enrolments?.filter((e) => !e.deletedAt).length || 0

      return {
        id: classEntity.classId,
        class_code: classEntity.classCode,
        class_name: classEntity.className,
        class_type: classEntity.classType,
        student_count: studentCount,
        start_date: classEntity.startDate.toISOString(),
        end_date: classEntity.endDate.toISOString(),
        status: classEntity.endDate < new Date() ? 'completed' : 'active'
      }
    })

    return { classes, pagination }
  }

  async getLecturerModules(
    lecturerId: string,
    currentUser: User,
    query: LecturerModulesQueryDto
  ): Promise<LecturerModulesResponseDto> {
    await this.verifyLecturerAccess(lecturerId, currentUser.id, extractUserRole(currentUser))

    const pageOptions = plainToInstance(PageOptionsDto, {
      page: query.page ?? 1,
      limit: query.limit ?? 20
    })

    const builder = this.teachingModuleRepository
      .createQueryBuilder('teachingModule')
      .leftJoinAndSelect('teachingModule.module', 'module')
      .leftJoinAndSelect('module.class', 'class')
      .leftJoinAndSelect('module.lessons', 'lessons')
      .leftJoinAndSelect('class.enrolments', 'enrolment')
      .where('teachingModule.lecturer.id = :lecturerId', { lecturerId })
      .andWhere('teachingModule.isActive = :isActive', { isActive: true })
      .andWhere('teachingModule.deletedAt IS NULL')

    if (query.semester === 'current') {
      const now = new Date()
      const sixMonthsAgo = new Date(now)
      sixMonthsAgo.setMonth(now.getMonth() - 6)
      builder.andWhere('module.createdAt >= :sixMonthsAgo', { sixMonthsAgo })
    }

    const moduleSortMapping: Record<string, string> = {
      updated_at: 'module.updatedAt',
      created_at: 'module.createdAt',
      module_name: 'module.moduleName'
    }
    const sortField = moduleSortMapping[query.sort_by ?? 'updated_at'] ?? 'module.updatedAt'
    builder.orderBy(sortField, query.order || 'DESC')

    const [teachingModules, pagination]: [TeachingModule[], OffsetPaginationDto] = await paginate(builder, pageOptions)

    const modules: LecturerModuleDto[] = teachingModules.map((tm) => {
      const module = tm.module
      const classes = module.class
        ? [
            {
              class_id: module.class.classId,
              class_code: module.class.classCode,
              class_name: module.class.className,
              student_count: module.class.enrolments?.filter((e) => !e.deletedAt).length || 0
            }
          ]
        : []

      return {
        id: module.moduleId,
        module_code: module.moduleCode,
        module_name: module.moduleName,
        module_description: module.moduleDescription,
        classes,
        lesson_count: module.lessons?.length || 0,
        status: 'published', // Default status - can be enhanced
        created_at: module.createdAt.toISOString(),
        updated_at: module.updatedAt.toISOString()
      }
    })

    return { modules, pagination }
  }

  async getTodaySchedule(lecturerId: string, currentUser: User): Promise<TodayScheduleResponseDto> {
    await this.verifyLecturerAccess(lecturerId, currentUser.id, extractUserRole(currentUser))

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const endOfDay = new Date(today)
    endOfDay.setHours(23, 59, 59, 999)

    // Get meeting events for today
    const meetings = await this.meetingEventRepository.find({
      where: {
        hostBy: lecturerId,
        startTime: Between(today, endOfDay)
      },
      relations: ['class', 'host']
    })

    const sessions: TodaySessionDto[] = meetings.map((meeting, index) => {
      const classEntity = meeting.class
      return {
        id: meeting.meetingEventsId,
        session_number: index + 1,
        class_id: classEntity.classId,
        class_name: classEntity.className,
        class_code: classEntity.classCode,
        module_id: '', // Can be enhanced to link to module
        module_name: meeting.title,
        start_time: meeting.startTime.toTimeString().slice(0, 5),
        end_time: meeting.endTime.toTimeString().slice(0, 5),
        student_count: 0, // Can be enhanced
        status: meeting.startTime > new Date() ? 'pending' : meeting.endTime < new Date() ? 'completed' : 'in-progress'
      }
    })

    return {
      date: today.toISOString().split('T')[0],
      sessions
    }
  }

  async getUpcomingActivities(
    lecturerId: string,
    currentUser: User,
    query: UpcomingActivitiesQueryDto
  ): Promise<UpcomingActivitiesResponseDto> {
    await this.verifyLecturerAccess(lecturerId, currentUser.id, extractUserRole(currentUser))

    const now = new Date()
    const endDate = new Date(now)
    endDate.setDate(endDate.getDate() + (query.days || 7))

    const activities: UpcomingActivityDto[] = []

    // Get upcoming exams
    if (query.activity_types === 'all' || query.activity_types === 'exam_schedule') {
      const exams = await this.finalExamRepository.find({
        where: {
          createdBy: { id: lecturerId },
          startTime: Between(now, endDate)
        },
        relations: ['createdBy']
      })

      exams.forEach((exam) => {
        activities.push({
          id: exam.finalExamId,
          type: 'exam_schedule',
          title: exam.title,
          description: exam.description || undefined,
          due_date: exam.startTime.toISOString(),
          priority: 'high',
          status: exam.startTime > new Date() ? 'pending' : 'completed'
        })
      })
    }

    // Get upcoming entry tests
    if (query.activity_types === 'all' || query.activity_types === 'exam_schedule') {
      const entryTests = await this.entryTestRepository.find({
        where: {
          createdBy: { id: lecturerId },
          startTime: Between(now, endDate)
        },
        relations: ['createdBy']
      })

      entryTests.forEach((test) => {
        activities.push({
          id: test.entryTestId,
          type: 'exam_schedule',
          title: test.title,
          description: test.description || undefined,
          due_date: test.startTime.toISOString(),
          priority: 'high',
          status: test.startTime > new Date() ? 'pending' : 'completed'
        })
      })
    }

    // Sort by due date
    activities.sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())

    return { activities }
  }

  // Helper methods
  private async getAssignedClassesCount(lecturerId: string): Promise<number> {
    return this.teachingAssignmentRepository.count({
      where: {
        lecturer: { id: lecturerId },
        isActive: true
      }
    })
  }

  private async getCurrentSemesterModulesCount(lecturerId: string): Promise<number> {
    const now = new Date()
    const sixMonthsAgo = new Date(now)
    sixMonthsAgo.setMonth(now.getMonth() - 6)

    return this.teachingModuleRepository.count({
      where: {
        lecturer: { id: lecturerId },
        isActive: true,
        module: {
          createdAt: MoreThanOrEqual(sixMonthsAgo)
        }
      },
      relations: ['module']
    })
  }

  private async getTeachingSessionsTodayCount(lecturerId: string, startOfDay: Date, endOfDay: Date): Promise<number> {
    return this.meetingEventRepository.count({
      where: {
        hostBy: lecturerId,
        startTime: Between(startOfDay, endOfDay)
      }
    })
  }

  private async getUpcomingActivitiesCount(lecturerId: string, startDate: Date, endDate: Date): Promise<number> {
    const [exams, entryTests] = await Promise.all([
      this.finalExamRepository.count({
        where: {
          createdBy: { id: lecturerId },
          startTime: Between(startDate, endDate)
        }
      }),
      this.entryTestRepository.count({
        where: {
          createdBy: { id: lecturerId },
          startTime: Between(startDate, endDate)
        }
      })
    ])

    return exams + entryTests
  }
}
