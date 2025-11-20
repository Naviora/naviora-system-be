import { ApiProperty } from '@nestjs/swagger'
import { OffsetPaginationDto } from '@common/dto/offset-pagination/offset-pagination.dto'

export class PrincipalClassDto {
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

  @ApiProperty({ description: 'Lecturer count', example: 2 })
  lecturer_count: number

  @ApiProperty({ description: 'Start date in ISO 8601', example: '2025-09-01T00:00:00Z' })
  start_date: string

  @ApiProperty({ description: 'End date in ISO 8601', example: '2025-12-31T23:59:59Z' })
  end_date: string

  @ApiProperty({ description: 'Is active', example: true })
  is_active: boolean

  @ApiProperty({ description: 'Module count', example: 5 })
  module_count: number

  @ApiProperty({ description: 'Average score', example: 8.5, required: false })
  average_score?: number

  @ApiProperty({ description: 'Updated at in ISO 8601', example: '2025-11-20T00:00:00Z' })
  updated_at: string
}

export class PrincipalClassesResponseDto {
  @ApiProperty({ type: [PrincipalClassDto] })
  classes: PrincipalClassDto[]

  @ApiProperty({ type: OffsetPaginationDto })
  pagination: OffsetPaginationDto
}
