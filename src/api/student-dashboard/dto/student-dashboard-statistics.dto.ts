import { ApiProperty } from '@nestjs/swagger'

export class StatisticsDto {
  @ApiProperty({ description: 'Number of ongoing courses', example: 3 })
  ongoing_courses: number

  @ApiProperty({ description: 'Number of completed courses', example: 5 })
  completed_courses: number

  @ApiProperty({ description: 'Number of certificates earned', example: 2 })
  certificates_earned: number

  @ApiProperty({ description: 'Average rating (0-5)', example: 4.5 })
  average_rating: number
}

export class DeltaDto {
  @ApiProperty({ description: 'Direction of change', enum: ['up', 'down'], example: 'up' })
  direction: 'up' | 'down'

  @ApiProperty({ description: 'Change value', example: '+10%' })
  value: string

  @ApiProperty({ description: 'Comparison period', example: 'so với tháng trước' })
  comparison_period: string
}

export class DeltasDto {
  @ApiProperty({ type: DeltaDto })
  ongoing_delta: DeltaDto

  @ApiProperty({ type: DeltaDto })
  completed_delta: DeltaDto

  @ApiProperty({ type: DeltaDto })
  certificates_delta: DeltaDto

  @ApiProperty({ type: DeltaDto })
  rating_delta: DeltaDto
}

export class StudentDashboardStatisticsResponseDto {
  @ApiProperty({ type: StatisticsDto })
  statistics: StatisticsDto

  @ApiProperty({ type: DeltasDto })
  deltas: DeltasDto
}
