import { ApiProperty } from '@nestjs/swagger'
import { IsUUID, IsInt, IsDateString } from 'class-validator'

export class StreakResponseDto {
  @ApiProperty({ description: 'Streak ID' })
  @IsUUID()
  streak_id: string

  @ApiProperty({ description: 'Student ID' })
  @IsUUID()
  student_id: string

  @ApiProperty({ description: 'Current streak count' })
  @IsInt()
  current_streak: number

  @ApiProperty({ description: 'Longest streak achieved' })
  @IsInt()
  longest_streak: number

  @ApiProperty({ description: 'Last activity date' })
  @IsDateString()
  last_activity_date: string

  @ApiProperty({ description: 'Updated at timestamp' })
  @IsDateString()
  updated_at: string
}
