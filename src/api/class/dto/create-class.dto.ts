import { ClassType } from '@common/enums/class-types.enum'
import { IsDateFormat } from '@decorators/validators/is-date-format.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, Matches, MaxLength, IsString } from 'class-validator'

export class CreateClassDto {
  @ApiProperty({
    description: 'The code of the class',
    example: 'BIO-25-001'
  })
  @IsNotEmpty()
  @Matches(/^BIO-\d{2}-\d{3}$/i, {
    message: 'class_code must match format BIO-YY-NNN (e.g., BIO-25-001)'
  })
  class_code: string

  @ApiProperty({
    description: 'The name of the class',
    example: 'Biology Class 1',
    maxLength: 255
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, { message: 'Class name must not exceed 255 characters' })
  class_name: string

  @ApiProperty({
    description: 'The type of the class - it indicates the scope of the competition in which students participate',
    example: 'city'
  })
  @IsNotEmpty()
  @IsEnum(ClassType)
  class_type: ClassType

  @ApiProperty({
    description: 'The start date of the class',
    example: '2025-01-01'
  })
  @IsNotEmpty()
  @IsDateFormat()
  start_date: Date

  @ApiProperty({
    description: 'The end date of the class',
    example: '2025-01-01'
  })
  @IsNotEmpty()
  @IsDateFormat()
  end_date: Date
}
