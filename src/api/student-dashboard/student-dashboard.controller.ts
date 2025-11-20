import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { StudentDashboardService } from './student-dashboard.service'
import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'
import { StudentDashboardStatisticsResponseDto } from './dto/student-dashboard-statistics.dto'
import { LearningHoursResponseDto } from './dto/learning-hours.dto'
import { DayStreakResponseDto } from './dto/day-streak.dto'
import { StudentModulesResponseDto } from './dto/student-modules.dto'
import {
  StudentDashboardStatisticsQueryDto,
  LearningHoursQueryDto,
  StudentModulesQueryDto
} from './dto/query-params.dto'

@ApiTags('Student Dashboard')
@Controller({
  path: 'students',
  version: '1'
})
@ApiBearerAuth('Authorization')
@UseGuards(AccessTokenGuard)
export class StudentDashboardController {
  constructor(private readonly studentDashboardService: StudentDashboardService) {}

  @Get(':studentId/dashboard/statistics')
  @ApiOperation({ summary: 'Get student dashboard statistics' })
  @ApiParam({ name: 'studentId', description: 'Student ID' })
  @ApiResponse({
    status: 200,
    description: 'Student dashboard statistics retrieved successfully',
    type: StudentDashboardStatisticsResponseDto
  })
  @ResponseMessage('Student dashboard statistics retrieved successfully')
  async getDashboardStatistics(
    @Param('studentId') studentId: string,
    @CurrentUser() currentUser: User,
    @Query() query: StudentDashboardStatisticsQueryDto
  ) {
    const data = await this.studentDashboardService.getDashboardStatistics(
      studentId,
      currentUser,
      query.period || 'month'
    )
    return { data }
  }

  @Get(':studentId/dashboard/learning-hours')
  @ApiOperation({ summary: 'Get learning hours data for the last N days' })
  @ApiParam({ name: 'studentId', description: 'Student ID' })
  @ApiResponse({
    status: 200,
    description: 'Learning hours data retrieved successfully',
    type: LearningHoursResponseDto
  })
  @ResponseMessage('Learning hours data retrieved successfully')
  async getLearningHours(
    @Param('studentId') studentId: string,
    @CurrentUser() currentUser: User,
    @Query() query: LearningHoursQueryDto
  ) {
    const data = await this.studentDashboardService.getLearningHours(studentId, currentUser, query.days || 16)
    return { data }
  }

  @Get(':studentId/dashboard/day-streak')
  @ApiOperation({ summary: 'Get day streak data' })
  @ApiParam({ name: 'studentId', description: 'Student ID' })
  @ApiResponse({
    status: 200,
    description: 'Day streak data retrieved successfully',
    type: DayStreakResponseDto
  })
  @ResponseMessage('Day streak data retrieved successfully')
  async getDayStreak(@Param('studentId') studentId: string, @CurrentUser() currentUser: User) {
    const data = await this.studentDashboardService.getDayStreak(studentId, currentUser)
    return { data }
  }

  @Get(':studentId/modules')
  @ApiOperation({ summary: 'Get student modules/courses' })
  @ApiParam({ name: 'studentId', description: 'Student ID' })
  @ApiResponse({
    status: 200,
    description: 'Student modules retrieved successfully',
    type: StudentModulesResponseDto
  })
  @ResponseMessage('Student modules retrieved successfully')
  async getStudentModules(
    @Param('studentId') studentId: string,
    @CurrentUser() currentUser: User,
    @Query() query: StudentModulesQueryDto
  ) {
    const data = await this.studentDashboardService.getStudentModules(studentId, currentUser, query)
    return { data }
  }
}
