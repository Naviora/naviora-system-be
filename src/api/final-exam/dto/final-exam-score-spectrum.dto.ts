import { ApiProperty } from '@nestjs/swagger'

export class ScoreRangeDto {
  @ApiProperty({
    description: 'Score range (e.g., "0-10", "10-20")',
    example: '0-10'
  })
  score: string

  @ApiProperty({
    description: 'Number of students in this score range',
    example: 15
  })
  count: number

  @ApiProperty({
    description: 'Percentage of students in this score range',
    example: 25.5
  })
  percentage: number
}

export class ScoreStatisticsDto {
  @ApiProperty({
    description: 'Total number of submissions',
    example: 100
  })
  totalSubmissions: number

  @ApiProperty({
    description: 'Average score',
    example: 6.8
  })
  averageScore: number

  @ApiProperty({
    description: 'Highest score',
    example: 10
  })
  highestScore: number

  @ApiProperty({
    description: 'Lowest score',
    example: 2
  })
  lowestScore: number

  @ApiProperty({
    description: 'Median score',
    example: 7
  })
  medianScore: number

  @ApiProperty({
    description: 'Standard deviation',
    example: 2.1
  })
  standardDeviation: number
}

export class FinalExamScoreSpectrumDto {
  @ApiProperty({
    description: 'Final exam ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  finalExamId: string

  @ApiProperty({
    description: 'Final exam title',
    example: 'Mathematics Final Exam'
  })
  finalExamTitle: string

  @ApiProperty({
    description: 'Score statistics',
    type: ScoreStatisticsDto
  })
  statistics: ScoreStatisticsDto

  @ApiProperty({
    description: 'Score distribution by ranges',
    type: [ScoreRangeDto]
  })
  scoreRanges: ScoreRangeDto[]
}
