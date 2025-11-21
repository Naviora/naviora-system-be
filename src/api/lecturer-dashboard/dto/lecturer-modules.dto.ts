import { ApiProperty } from '@nestjs/swagger'
import { OffsetPaginationDto } from '@common/dto/offset-pagination/offset-pagination.dto'

export class LecturerModuleClassDto {
  @ApiProperty({ description: 'Class ID', example: 'uuid' })
  class_id: string

  @ApiProperty({ description: 'Class code', example: 'SINH10-CITY-001' })
  class_code: string

  @ApiProperty({ description: 'Class name', example: 'Lớp Sinh học 10 - Thành phố' })
  class_name: string

  @ApiProperty({ description: 'Student count', example: 30 })
  student_count: number
}

export class LecturerModuleDto {
  @ApiProperty({ description: 'Module ID', example: 'uuid' })
  id: string

  @ApiProperty({ description: 'Module code', example: 'SINH10-MOD01' })
  module_code: string

  @ApiProperty({ description: 'Module name', example: 'Sinh học tế bào' })
  module_name: string

  @ApiProperty({ description: 'Module description', example: 'Mô tả chuyên đề', required: false })
  module_description?: string

  @ApiProperty({ type: [LecturerModuleClassDto] })
  classes: LecturerModuleClassDto[]

  @ApiProperty({ description: 'Lesson count', example: 10 })
  lesson_count: number

  @ApiProperty({ description: 'Status', enum: ['draft', 'published', 'completed'], example: 'published' })
  status: 'draft' | 'published' | 'completed'

  @ApiProperty({ description: 'Created at in ISO 8601', example: '2025-09-01T00:00:00Z' })
  created_at: string

  @ApiProperty({ description: 'Updated at in ISO 8601', example: '2025-11-20T00:00:00Z' })
  updated_at: string
}

export class LecturerModulesResponseDto {
  @ApiProperty({ type: [LecturerModuleDto] })
  modules: LecturerModuleDto[]

  @ApiProperty({ type: OffsetPaginationDto })
  pagination: OffsetPaginationDto
}
