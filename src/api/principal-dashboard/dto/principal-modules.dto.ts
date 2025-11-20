import { ApiProperty } from '@nestjs/swagger'
import { OffsetPaginationDto } from '@common/dto/offset-pagination/offset-pagination.dto'

export class PrincipalModuleDto {
  @ApiProperty({ description: 'Module ID', example: 'uuid' })
  id: string

  @ApiProperty({ description: 'Module code', example: 'SINH10-MOD01' })
  module_code: string

  @ApiProperty({ description: 'Module name', example: 'Sinh học tế bào' })
  module_name: string

  @ApiProperty({ description: 'Module description', example: 'Mô tả chuyên đề', required: false })
  module_description?: string

  @ApiProperty({ description: 'Status', enum: ['draft', 'published', 'completed'], example: 'published' })
  status: 'draft' | 'published' | 'completed'

  @ApiProperty({ description: 'Class count', example: 3 })
  class_count: number

  @ApiProperty({ description: 'Lecturer count', example: 2 })
  lecturer_count: number

  @ApiProperty({ description: 'Student count', example: 90 })
  student_count: number

  @ApiProperty({ description: 'Lesson count', example: 10 })
  lesson_count: number

  @ApiProperty({ description: 'Created at in ISO 8601', example: '2025-09-01T00:00:00Z' })
  created_at: string

  @ApiProperty({ description: 'Updated at in ISO 8601', example: '2025-11-20T00:00:00Z' })
  updated_at: string
}

export class PrincipalModulesResponseDto {
  @ApiProperty({ type: [PrincipalModuleDto] })
  modules: PrincipalModuleDto[]

  @ApiProperty({ type: OffsetPaginationDto })
  pagination: OffsetPaginationDto
}
