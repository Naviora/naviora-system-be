import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { LecturerDashboardService } from './lecturer-dashboard.service'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'
import { LecturerDashboardStatisticsResponseDto } from './dto/lecturer-dashboard-statistics.dto'
import { LecturerClassesResponseDto } from './dto/lecturer-classes.dto'
import { LecturerModulesResponseDto } from './dto/lecturer-modules.dto'
import { TodayScheduleResponseDto } from './dto/today-schedule.dto'
import { UpcomingActivitiesResponseDto } from './dto/upcoming-activities.dto'
import { LecturerClassesQueryDto, LecturerModulesQueryDto, UpcomingActivitiesQueryDto } from './dto/query-params.dto'

@ApiTags('Lecturer Dashboard')
@Controller({
  path: 'lecturers',
  version: '1'
})
@ApiBearerAuth('Authorization')
export class LecturerDashboardController {
  constructor(private readonly lecturerDashboardService: LecturerDashboardService) {}

  @Get(':lecturerId/dashboard/statistics')
  @ApiOperation({ summary: 'Get lecturer dashboard statistics' })
  @ApiParam({ name: 'lecturerId', description: 'Lecturer ID' })
  @ApiResponse({
    status: 200,
    description: 'Lecturer dashboard statistics retrieved successfully',
    type: LecturerDashboardStatisticsResponseDto
  })
  @ResponseMessage('Lecturer dashboard statistics retrieved successfully')
  async getDashboardStatistics(@Param('lecturerId') lecturerId: string, @CurrentUser() currentUser: User) {
    const data = await this.lecturerDashboardService.getDashboardStatistics(lecturerId, currentUser)
    return { data }
  }

  @Get(':lecturerId/classes')
  @ApiOperation({ summary: 'Get lecturer assigned classes' })
  @ApiParam({ name: 'lecturerId', description: 'Lecturer ID' })
  @ApiResponse({
    status: 200,
    description: 'Lecturer classes retrieved successfully',
    type: LecturerClassesResponseDto
  })
  @ResponseMessage('Lecturer classes retrieved successfully')
  async getLecturerClasses(
    @Param('lecturerId') lecturerId: string,
    @CurrentUser() currentUser: User,
    @Query() query: LecturerClassesQueryDto
  ) {
    const data = await this.lecturerDashboardService.getLecturerClasses(lecturerId, currentUser, query)
    return { data }
  }

  @Get(':lecturerId/modules')
  @ApiOperation({ summary: 'Get lecturer modules' })
  @ApiParam({ name: 'lecturerId', description: 'Lecturer ID' })
  @ApiResponse({
    status: 200,
    description: 'Lecturer modules retrieved successfully',
    type: LecturerModulesResponseDto
  })
  @ResponseMessage('Lecturer modules retrieved successfully')
  async getLecturerModules(
    @Param('lecturerId') lecturerId: string,
    @CurrentUser() currentUser: User,
    @Query() query: LecturerModulesQueryDto
  ) {
    const data = await this.lecturerDashboardService.getLecturerModules(lecturerId, currentUser, query)
    return { data }
  }

  @Get(':lecturerId/schedule/today')
  @ApiOperation({ summary: 'Get lecturer today schedule' })
  @ApiParam({ name: 'lecturerId', description: 'Lecturer ID' })
  @ApiResponse({
    status: 200,
    description: 'Today schedule retrieved successfully',
    type: TodayScheduleResponseDto
  })
  @ResponseMessage('Today schedule retrieved successfully')
  async getTodaySchedule(@Param('lecturerId') lecturerId: string, @CurrentUser() currentUser: User) {
    const data = await this.lecturerDashboardService.getTodaySchedule(lecturerId, currentUser)
    return { data }
  }

  @Get(':lecturerId/activities/upcoming')
  @ApiOperation({ summary: 'Get lecturer upcoming activities' })
  @ApiParam({ name: 'lecturerId', description: 'Lecturer ID' })
  @ApiResponse({
    status: 200,
    description: 'Upcoming activities retrieved successfully',
    type: UpcomingActivitiesResponseDto
  })
  @ResponseMessage('Upcoming activities retrieved successfully')
  async getUpcomingActivities(
    @Param('lecturerId') lecturerId: string,
    @CurrentUser() currentUser: User,
    @Query() query: UpcomingActivitiesQueryDto
  ) {
    const data = await this.lecturerDashboardService.getUpcomingActivities(lecturerId, currentUser, query)
    return { data }
  }
}
