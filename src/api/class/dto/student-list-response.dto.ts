import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { OffsetPaginationDto } from '@common/dto/offset-pagination/offset-pagination.dto'

export class StudentListItemDto {
  @ApiProperty({ description: 'Student ID' })
  @Expose()
  id: string

  @ApiProperty({ description: 'Student name' })
  @Expose()
  name: string

  @ApiProperty({ description: 'Student email' })
  @Expose()
  email: string

  @ApiProperty({ description: 'Student avatar URL', nullable: true })
  @Expose()
  avatar: string | null

  @ApiProperty({ description: 'Student phone', nullable: true })
  @Expose()
  phone: string | null

  @ApiProperty({ description: 'Student enrollment date in the class' })
  @Expose()
  enrolment_date: Date
}

export class StudentListResponseDto {
  @ApiProperty({ description: 'Class ID' })
  @Expose()
  class_id: string

  @ApiProperty({ type: [StudentListItemDto], description: 'List of students enrolled in the class' })
  @Expose()
  @Type(() => StudentListItemDto)
  students: StudentListItemDto[]

  @ApiProperty({ type: OffsetPaginationDto, description: 'Pagination metadata' })
  @Expose()
  @Type(() => OffsetPaginationDto)
  pagination: OffsetPaginationDto
}

