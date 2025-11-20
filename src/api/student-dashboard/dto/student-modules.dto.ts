import { ApiProperty } from '@nestjs/swagger'
import { OffsetPaginationDto } from '@common/dto/offset-pagination/offset-pagination.dto'

export class StudentModuleDto {
  @ApiProperty({ description: 'Module ID', example: 'uuid' })
  id: string

  @ApiProperty({ description: 'Module ID', example: 'uuid' })
  module_id: string

  @ApiProperty({ description: 'Module name', example: 'Sinh học tế bào' })
  module_name: string

  @ApiProperty({ description: 'Module code', example: 'SINH10-MOD01' })
  module_code: string

  @ApiProperty({ description: 'Class type', example: 'CITY' })
  class_type: string

  @ApiProperty({ description: 'Class name', example: 'Lớp Sinh học 10 - Thành phố' })
  class_name: string

  @ApiProperty({ description: 'Lecturer names', type: [String], example: ['Nguyễn Văn A', 'Trần Thị B'] })
  lecturer_names: string[]

  @ApiProperty({ description: 'Progress percentage (0-100)', example: 65 })
  progress: number

  @ApiProperty({ description: 'Thumbnail URL', example: 'https://example.com/thumb.jpg', nullable: true })
  thumbnail: string | null

  @ApiProperty({ description: 'Status', enum: ['ongoing', 'completed'], example: 'ongoing' })
  status: 'ongoing' | 'completed'

  @ApiProperty({ description: 'Completion date in ISO 8601', example: '2025-12-01T00:00:00Z', required: false })
  completion_date?: string

  @ApiProperty({ description: 'Enrollment date in ISO 8601', example: '2025-09-01T00:00:00Z' })
  enrolled_at: string
}

export class StudentModulesResponseDto {
  @ApiProperty({ type: [StudentModuleDto] })
  courses: StudentModuleDto[]

  @ApiProperty({ type: OffsetPaginationDto })
  pagination: OffsetPaginationDto
}
