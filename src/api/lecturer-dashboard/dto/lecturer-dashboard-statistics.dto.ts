import { ApiProperty } from '@nestjs/swagger'

export class LecturerStatisticsDto {
  @ApiProperty({ description: 'Number of assigned classes', example: 5 })
  assigned_classes: number

  @ApiProperty({ description: 'Number of current semester modules', example: 8 })
  current_semester_modules: number

  @ApiProperty({ description: 'Number of teaching sessions today', example: 2 })
  teaching_sessions_today: number

  @ApiProperty({ description: 'Number of upcoming activities (next 7 days)', example: 5 })
  upcoming_activities: number
}

export class LecturerDashboardStatisticsResponseDto {
  @ApiProperty({ type: LecturerStatisticsDto })
  statistics: LecturerStatisticsDto
}
