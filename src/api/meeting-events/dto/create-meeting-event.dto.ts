import { UUIDField, UUIDFieldOptional, StringField, StringFieldOptional, DateField } from '@decorators/field.decorators'
import { ApiProperty } from '@nestjs/swagger'

export class CreateMeetingEventDto {
  @ApiProperty({ description: 'Class ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @UUIDField()
  class_id: string

  @ApiProperty({ description: 'Lecturer (host) ID', example: '550e8400-e29b-41d4-a716-446655440001' })
  @UUIDField()
  host_by: string

  @ApiProperty({ description: 'Invited student IDs', example: ['uuid-1', 'uuid-2'], required: false, isArray: true })
  @UUIDFieldOptional({ each: true })
  invitee?: string[]

  @ApiProperty({ description: 'Title', example: 'Consultation meeting' })
  @StringField({ maxLength: 255 })
  title: string

  @ApiProperty({ description: 'Description', example: 'Discuss project progress', required: false })
  @StringFieldOptional()
  description?: string

  @ApiProperty({ description: 'Note', example: 'Bring latest report', required: false })
  @StringFieldOptional()
  note?: string

  @ApiProperty({ description: 'Start time (ISO8601)', example: '2025-02-01T09:00:00Z' })
  @DateField()
  start_time: Date

  @ApiProperty({ description: 'End time (ISO8601)', example: '2025-02-01T10:00:00Z' })
  @DateField()
  end_time: Date
}
