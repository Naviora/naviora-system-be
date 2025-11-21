import { ApiProperty } from '@nestjs/swagger'

export class UpcomingActivityDto {
  @ApiProperty({ description: 'Activity ID', example: 'uuid' })
  id: string

  @ApiProperty({
    description: 'Activity type',
    enum: ['assignment_due', 'exam_schedule', 'class_session', 'announcement'],
    example: 'assignment_due'
  })
  type: 'assignment_due' | 'exam_schedule' | 'class_session' | 'announcement'

  @ApiProperty({ description: 'Title', example: 'Bài tập về nhà - Tuần 10' })
  title: string

  @ApiProperty({ description: 'Description', example: 'Hoàn thành bài tập chương 5', required: false })
  description?: string

  @ApiProperty({ description: 'Related module ID', example: 'uuid', required: false })
  related_module_id?: string

  @ApiProperty({ description: 'Related module name', example: 'Sinh học tế bào', required: false })
  related_module_name?: string

  @ApiProperty({ description: 'Related class ID', example: 'uuid', required: false })
  related_class_id?: string

  @ApiProperty({ description: 'Related class name', example: 'Lớp Sinh học 10', required: false })
  related_class_name?: string

  @ApiProperty({ description: 'Due date in ISO 8601', example: '2025-11-25T23:59:59Z' })
  due_date: string

  @ApiProperty({
    description: 'Priority',
    enum: ['high', 'normal', 'low'],
    example: 'normal',
    default: 'normal'
  })
  priority: 'high' | 'normal' | 'low'

  @ApiProperty({
    description: 'Status',
    enum: ['pending', 'completed'],
    example: 'pending',
    default: 'pending'
  })
  status: 'pending' | 'completed'
}

export class UpcomingActivitiesResponseDto {
  @ApiProperty({ type: [UpcomingActivityDto] })
  activities: UpcomingActivityDto[]
}
