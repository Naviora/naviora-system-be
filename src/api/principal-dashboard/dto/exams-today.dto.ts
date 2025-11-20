import { ApiProperty } from '@nestjs/swagger'

export class ExamTodayDto {
  @ApiProperty({ description: 'Exam ID', example: 'uuid' })
  id: string

  @ApiProperty({ description: 'Exam code', example: 'EXAM-001' })
  exam_code: string

  @ApiProperty({ description: 'Exam name', example: 'Kiểm tra giữa kỳ' })
  exam_name: string

  @ApiProperty({ description: 'Module ID', example: 'uuid' })
  module_id: string

  @ApiProperty({ description: 'Module name', example: 'Sinh học tế bào' })
  module_name: string

  @ApiProperty({ description: 'Class ID', example: 'uuid' })
  class_id: string

  @ApiProperty({ description: 'Class name', example: 'Lớp Sinh học 10 - Thành phố' })
  class_name: string

  @ApiProperty({ description: 'Start time', example: '09:00' })
  start_time: string

  @ApiProperty({ description: 'End time', example: '10:30' })
  end_time: string

  @ApiProperty({ description: 'Room number', example: 'A101', required: false })
  room_number?: string

  @ApiProperty({ description: 'Total students', example: 30 })
  total_students: number

  @ApiProperty({ description: 'Participated students', example: 28 })
  participated_students: number

  @ApiProperty({ description: 'Average score', example: 8.5, required: false })
  average_score?: number

  @ApiProperty({
    description: 'Status',
    enum: ['pending', 'in-progress', 'completed'],
    example: 'pending'
  })
  status: 'pending' | 'in-progress' | 'completed'
}

export class ExamsTodayResponseDto {
  @ApiProperty({ description: 'Date in ISO 8601', example: '2025-11-20' })
  date: string

  @ApiProperty({ type: [ExamTodayDto] })
  exams: ExamTodayDto[]
}
