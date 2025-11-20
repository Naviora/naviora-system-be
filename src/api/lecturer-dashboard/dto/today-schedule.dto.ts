import { ApiProperty } from '@nestjs/swagger'

export class TodaySessionDto {
  @ApiProperty({ description: 'Session ID', example: 'uuid' })
  id: string

  @ApiProperty({ description: 'Session number', example: 1 })
  session_number: number

  @ApiProperty({ description: 'Class ID', example: 'uuid' })
  class_id: string

  @ApiProperty({ description: 'Class name', example: 'Lớp Sinh học 10 - Thành phố' })
  class_name: string

  @ApiProperty({ description: 'Class code', example: 'SINH10-CITY-001' })
  class_code: string

  @ApiProperty({ description: 'Module ID', example: 'uuid' })
  module_id: string

  @ApiProperty({ description: 'Module name', example: 'Sinh học tế bào' })
  module_name: string

  @ApiProperty({ description: 'Start time', example: '08:00' })
  start_time: string

  @ApiProperty({ description: 'End time', example: '09:30' })
  end_time: string

  @ApiProperty({ description: 'Room number', example: 'A101', required: false })
  room_number?: string

  @ApiProperty({ description: 'Building', example: 'Building A', required: false })
  building?: string

  @ApiProperty({ description: 'Student count', example: 30 })
  student_count: number

  @ApiProperty({
    description: 'Status',
    enum: ['pending', 'in-progress', 'completed'],
    example: 'pending'
  })
  status: 'pending' | 'in-progress' | 'completed'
}

export class TodayScheduleResponseDto {
  @ApiProperty({ description: 'Date in ISO 8601', example: '2025-11-20' })
  date: string

  @ApiProperty({ type: [TodaySessionDto] })
  sessions: TodaySessionDto[]
}
