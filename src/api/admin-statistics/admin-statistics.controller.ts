import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { AdminStatisticsService } from './admin-statistics.service'
import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Roles } from '@decorators/roles.decorator'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { UserStatisticsResponseDto, UserCountByRoleDto, UserCountByMonthDto } from './dto/user-statistics-response.dto'

@ApiTags('Admin Statistics')
@Controller({
  path: 'admin/statistics',
  version: '1'
})
@ApiBearerAuth('Authorization')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(RoleInAccount.Admin)
export class AdminStatisticsController {
  constructor(private readonly adminStatisticsService: AdminStatisticsService) {}

  @Get('users/total')
  @ApiOperation({ summary: 'Get total number of users in the system' })
  @ApiResponse({
    status: 200,
    description: 'Total number of users retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'number',
          example: 500
        },
        message: {
          type: 'string',
          example: 'Total users retrieved successfully'
        }
      }
    }
  })
  @ResponseMessage('Total users retrieved successfully')
  async getTotalUsers() {
    const count = await this.adminStatisticsService.getTotalUsers()
    return { data: count }
  }

  @Get('users/active')
  @ApiOperation({ summary: 'Get total number of active users (not deleted)' })
  @ApiResponse({
    status: 200,
    description: 'Active users count retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'number',
          example: 450
        },
        message: {
          type: 'string',
          example: 'Active users retrieved successfully'
        }
      }
    }
  })
  @ResponseMessage('Active users retrieved successfully')
  async getActiveUsers() {
    const count = await this.adminStatisticsService.getActiveUsers()
    return { data: count }
  }

  @Get('users/inactive')
  @ApiOperation({ summary: 'Get total number of inactive users (deleted)' })
  @ApiResponse({
    status: 200,
    description: 'Inactive users count retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'number',
          example: 50
        },
        message: {
          type: 'string',
          example: 'Inactive users retrieved successfully'
        }
      }
    }
  })
  @ResponseMessage('Inactive users retrieved successfully')
  async getInactiveUsers() {
    const count = await this.adminStatisticsService.getInactiveUsers()
    return { data: count }
  }

  @Get('users/active-inactive-ratio')
  @ApiOperation({ summary: 'Get ratio between active and inactive users' })
  @ApiResponse({
    status: 200,
    description: 'Active to inactive ratio retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'number',
          example: 9.0
        },
        message: {
          type: 'string',
          example: 'Active to inactive ratio retrieved successfully'
        }
      }
    }
  })
  @ResponseMessage('Active to inactive ratio retrieved successfully')
  async getActiveToInactiveRatio() {
    const ratio = await this.adminStatisticsService.getActiveToInactiveRatio()
    return { data: ratio }
  }

  @Get('users/by-month')
  @ApiOperation({ summary: 'Get user count by month in the current year' })
  @ApiResponse({
    status: 200,
    description: 'Users by month retrieved successfully',
    type: [UserCountByMonthDto]
  })
  @ResponseMessage('Users by month retrieved successfully')
  async getUsersByMonth() {
    const data = await this.adminStatisticsService.getUsersByMonth()
    return { data }
  }

  @Get('users/by-role')
  @ApiOperation({ summary: 'Get user count by role' })
  @ApiResponse({
    status: 200,
    description: 'Users by role retrieved successfully',
    type: [UserCountByRoleDto]
  })
  @ResponseMessage('Users by role retrieved successfully')
  async getUsersByRole() {
    const data = await this.adminStatisticsService.getUsersByRole()
    return { data }
  }

  @Get('users/all')
  @ApiOperation({ summary: 'Get all user statistics at once' })
  @ApiResponse({
    status: 200,
    description: 'All user statistics retrieved successfully',
    type: UserStatisticsResponseDto
  })
  @ResponseMessage('All user statistics retrieved successfully')
  async getAllUserStatistics() {
    const data = await this.adminStatisticsService.getAllUserStatistics()
    return { data }
  }
}
