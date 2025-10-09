import { ClassType } from '@common/enums/class-types.enum'
import { IsDateFormat } from '@decorators/validators/is-date-format.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsBoolean } from 'class-validator'

export class UpdateClassDto {
  @ApiProperty({
    description: 'The name of the class',
    example: 'Biology Class 1',
    required: false
  })
  @IsOptional()
  className?: string

  @ApiProperty({
    description: 'The type of the class - it indicates the scope of the competition in which students participate',
    example: 'city',
    required: false
  })
  @IsOptional()
  @IsEnum(ClassType)
  classType?: ClassType

  @ApiProperty({
    description: 'The start date of the class',
    example: '2025-01-01',
    required: false
  })
  @IsOptional()
  @IsDateFormat()
  startDate?: Date

  @ApiProperty({
    description: 'The end date of the class',
    example: '2025-12-31',
    required: false
  })
  @IsOptional()
  @IsDateFormat()
  endDate?: Date

  @ApiProperty({
    description: 'Whether the class is active',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}
