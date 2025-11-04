import { ApiProperty } from '@nestjs/swagger'
import { DateField, DateFieldOptional, UUIDFieldOptional } from '@decorators/field.decorators'

export class GetWeeklyMeetingEventsQueryDto {
  @ApiProperty({ description: 'Start of week (inclusive, ISO date/time)', example: '2025-02-03T00:00:00Z' })
  @DateField()
  start: Date

  @ApiProperty({
    description: 'End of week (exclusive/inclusive as per service, use end of week)',
    example: '2025-02-10T00:00:00Z'
  })
  @DateField()
  end: Date

  @ApiProperty({ description: 'Filter by class (optional, mainly for lecturers with many classes)', required: false })
  @UUIDFieldOptional()
  class_id?: string
}
