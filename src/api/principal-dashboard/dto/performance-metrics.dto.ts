import { ApiProperty } from '@nestjs/swagger'

export class PerformanceMetricsDto {
  @ApiProperty({ description: 'Overall score (0-10)', example: 8.5 })
  overall_score: number

  @ApiProperty({ description: 'Average student score', example: 7.8 })
  average_student_score: number

  @ApiProperty({ description: 'Course completion rate (0-100)', example: 75.5 })
  course_completion_rate: number

  @ApiProperty({ description: 'Student engagement rate (0-100)', example: 82.3 })
  student_engagement_rate: number

  @ApiProperty({ description: 'Lecturer activity rate (0-100)', example: 90.0 })
  lecturer_activity_rate: number

  @ApiProperty({ description: 'System uptime (0-100)', example: 99.9 })
  system_uptime: number

  @ApiProperty({ description: 'Average response time in ms', example: 150 })
  average_response_time: number

  @ApiProperty({ description: 'Active sessions count', example: 250 })
  active_sessions: number
}

export class PerformanceMetricsResponseDto {
  @ApiProperty({ type: PerformanceMetricsDto })
  performance: PerformanceMetricsDto

  @ApiProperty({ description: 'Trend', enum: ['up', 'down', 'stable'], example: 'up' })
  trend: 'up' | 'down' | 'stable'

  @ApiProperty({ description: 'Timestamp in ISO 8601', example: '2025-11-20T10:00:00Z' })
  timestamp: string
}
