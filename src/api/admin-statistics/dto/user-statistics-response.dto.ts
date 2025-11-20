import { ApiProperty } from '@nestjs/swagger'

export class UserCountByRoleDto {
  @ApiProperty({ description: 'Role name', example: 'Student' })
  roleName: string

  @ApiProperty({ description: 'Total number of users with this role', example: 150 })
  count: number
}

export class UserCountByMonthDto {
  @ApiProperty({ description: 'Month number (1-12)', example: 1 })
  month: number

  @ApiProperty({ description: 'Month name', example: 'January' })
  monthName: string

  @ApiProperty({ description: 'Total number of users created in this month', example: 25 })
  count: number
}

export class UserStatisticsResponseDto {
  @ApiProperty({ description: 'Total number of users in the system', example: 500 })
  totalUsers: number

  @ApiProperty({ description: 'Total number of active users (not deleted)', example: 450 })
  activeUsers: number

  @ApiProperty({ description: 'Total number of inactive users (deleted)', example: 50 })
  inactiveUsers: number

  @ApiProperty({ description: 'Ratio of active to inactive users', example: 9.0 })
  activeToInactiveRatio: number

  @ApiProperty({
    description: 'User count by month in the current year',
    type: [UserCountByMonthDto]
  })
  usersByMonth: UserCountByMonthDto[]

  @ApiProperty({
    description: 'User count by role',
    type: [UserCountByRoleDto]
  })
  usersByRole: UserCountByRoleDto[]
}
