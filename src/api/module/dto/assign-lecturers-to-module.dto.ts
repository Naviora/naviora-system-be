import { AssignLecturersDto } from '@api/class/dto/assign-lecturers-to-class.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsDateString } from 'class-validator'

export class AssignLecturersToModuleDto extends AssignLecturersDto {
  @ApiProperty({
    description: 'End date for the teaching assignment (optional)',
    example: '2024-12-31',
    required: false
  })
  @IsOptional()
  @IsDateString()
  end_date?: string
}
