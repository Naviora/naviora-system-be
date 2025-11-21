import { ApiProperty } from '@nestjs/swagger'

export class WeeklyActivityDto {
  @ApiProperty({ description: 'Day of week', enum: ['S', 'M', 'T', 'W', 'T', 'F', 'S'], example: 'M' })
  day: 'S' | 'M' | 'T' | 'W' | 'T' | 'F' | 'S'

  @ApiProperty({ description: 'Whether student studied today', example: true })
  checked: boolean

  @ApiProperty({ description: 'Hours studied', example: 1.5 })
  hours: number
}

export class DayStreakResponseDto {
  @ApiProperty({ description: 'Current streak days', example: 5 })
  current_streak: number

  @ApiProperty({ description: 'Longest streak days', example: 10 })
  longest_streak: number

  @ApiProperty({ type: [WeeklyActivityDto] })
  weekly_activity: WeeklyActivityDto[]

  @ApiProperty({ description: 'Last active date in ISO 8601', example: '2025-11-20T10:00:00Z' })
  last_active: string

  @ApiProperty({ description: 'Streak start date in ISO 8601', example: '2025-11-15T00:00:00Z' })
  streak_start_date: string
}
