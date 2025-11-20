import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { PrincipalDashboardService } from './principal-dashboard.service'
import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Roles } from '@decorators/roles.decorator'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'
import { PrincipalDashboardStatisticsResponseDto } from './dto/principal-dashboard-statistics.dto'
import { PerformanceMetricsResponseDto } from './dto/performance-metrics.dto'
import { ExamsTodayResponseDto } from './dto/exams-today.dto'
import { PrincipalClassesResponseDto } from './dto/principal-classes.dto'
import { PrincipalModulesResponseDto } from './dto/principal-modules.dto'
import {
  PrincipalDashboardStatisticsQueryDto,
  PerformanceMetricsQueryDto,
  PrincipalClassesQueryDto,
  PrincipalModulesQueryDto
} from './dto/query-params.dto'

@ApiTags('Principal Dashboard')
@Controller({
  path: 'principal',
  version: '1'
})
@ApiBearerAuth('Authorization')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(RoleInAccount.Principal, RoleInAccount.Admin)
export class PrincipalDashboardController {
  constructor(private readonly principalDashboardService: PrincipalDashboardService) {}

  @Get('dashboard/statistics')
  @ApiOperation({ summary: 'Get principal dashboard statistics' })
  @ApiResponse({
    status: 200,
    description: 'Principal dashboard statistics retrieved successfully',
    type: PrincipalDashboardStatisticsResponseDto
  })
  @ResponseMessage('Principal dashboard statistics retrieved successfully')
  async getDashboardStatistics(@CurrentUser() currentUser: User, @Query() query: PrincipalDashboardStatisticsQueryDto) {
    const data = await this.principalDashboardService.getDashboardStatistics(currentUser, query)
    return { data }
  }

  @Get('exams/today')
  @ApiOperation({ summary: 'Get exams scheduled today' })
  @ApiResponse({
    status: 200,
    description: 'Exams today retrieved successfully',
    type: ExamsTodayResponseDto
  })
  @ResponseMessage('Exams today retrieved successfully')
  async getExamsToday(@CurrentUser() currentUser: User) {
    const data = await this.principalDashboardService.getExamsToday(currentUser)
    return { data }
  }

  @Get('dashboard/performance')
  @ApiOperation({ summary: 'Get system performance metrics' })
  @ApiResponse({
    status: 200,
    description: 'Performance metrics retrieved successfully',
    type: PerformanceMetricsResponseDto
  })
  @ResponseMessage('Performance metrics retrieved successfully')
  async getPerformanceMetrics(@CurrentUser() currentUser: User, @Query() query: PerformanceMetricsQueryDto) {
    const data = await this.principalDashboardService.getPerformanceMetrics(currentUser, query)
    return { data }
  }

  @Get('classes')
  @ApiOperation({ summary: 'Get all classes (Principal view)' })
  @ApiResponse({
    status: 200,
    description: 'Principal classes retrieved successfully',
    type: PrincipalClassesResponseDto
  })
  @ResponseMessage('Principal classes retrieved successfully')
  async getPrincipalClasses(@CurrentUser() currentUser: User, @Query() query: PrincipalClassesQueryDto) {
    const data = await this.principalDashboardService.getPrincipalClasses(currentUser, query)
    return { data }
  }

  @Get('modules')
  @ApiOperation({ summary: 'Get all modules (Principal view)' })
  @ApiResponse({
    status: 200,
    description: 'Principal modules retrieved successfully',
    type: PrincipalModulesResponseDto
  })
  @ResponseMessage('Principal modules retrieved successfully')
  async getPrincipalModules(@CurrentUser() currentUser: User, @Query() query: PrincipalModulesQueryDto) {
    const data = await this.principalDashboardService.getPrincipalModules(currentUser, query)
    return { data }
  }
}
