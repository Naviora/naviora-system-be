import { ApiProperty } from '@nestjs/swagger'

export class PrincipalStatisticsDto {
  @ApiProperty({ description: 'Total classes managed', example: 25 })
  total_classes: number

  @ApiProperty({ description: 'Total modules opened', example: 50 })
  total_modules: number

  @ApiProperty({ description: 'Total exams today', example: 3 })
  total_exams_today: number

  @ApiProperty({ description: 'System performance score (0-10)', example: 8.5 })
  system_performance: number
}

export class PrincipalDashboardStatisticsResponseDto {
  @ApiProperty({ type: PrincipalStatisticsDto })
  statistics: PrincipalStatisticsDto
}
