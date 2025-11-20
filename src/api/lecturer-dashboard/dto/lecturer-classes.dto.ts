import { ApiProperty } from '@nestjs/swagger'
import { OffsetPaginationDto } from '@common/dto/offset-pagination/offset-pagination.dto'

export class LecturerClassDto {
  @ApiProperty({ description: 'Class ID', example: 'uuid' })
  id: string

  @ApiProperty({ description: 'Class code', example: 'SINH10-CITY-001' })
  class_code: string

  @ApiProperty({ description: 'Class name', example: 'Lớp Sinh học 10 - Thành phố' })
  class_name: string

  @ApiProperty({ description: 'Class type', example: 'CITY' })
  class_type: string

  @ApiProperty({ description: 'Student count', example: 30 })
  student_count: number

  @ApiProperty({ description: 'Start date in ISO 8601', example: '2025-09-01T00:00:00Z' })
  start_date: string

  @ApiProperty({ description: 'End date in ISO 8601', example: '2025-12-31T23:59:59Z' })
  end_date: string

  @ApiProperty({ description: 'Semester', example: 'Fall 2025', required: false })
  semester?: string

  @ApiProperty({ description: 'Status', enum: ['active', 'completed'], example: 'active' })
  status: 'active' | 'completed'
}

export class LecturerClassesResponseDto {
  @ApiProperty({ type: [LecturerClassDto] })
  classes: LecturerClassDto[]

  @ApiProperty({ type: OffsetPaginationDto })
  pagination: OffsetPaginationDto
}
