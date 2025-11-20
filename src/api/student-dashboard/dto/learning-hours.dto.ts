import { ApiProperty } from '@nestjs/swagger'

export class LearningHourDto {
  @ApiProperty({ description: 'Day number (1-16)', example: 1 })
  day: number

  @ApiProperty({ description: 'Hours studied', example: 0.8 })
  hours: number

  @ApiProperty({ description: 'Date in ISO 8601 format', example: '2025-11-04' })
  date: string
}

export class LearningHoursResponseDto {
  @ApiProperty({ type: [LearningHourDto] })
  learning_hours: LearningHourDto[]

  @ApiProperty({ description: 'Total hours', example: 12.5 })
  total_hours: number

  @ApiProperty({ description: 'Average daily hours', example: 0.78 })
  average_daily_hours: number

  @ApiProperty({ description: 'Trend', enum: ['up', 'down', 'stable'], example: 'up' })
  trend: 'up' | 'down' | 'stable'
}
