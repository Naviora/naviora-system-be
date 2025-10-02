import { ClassType } from '@common/enums/class-types.enum'
import { IsDateFormat } from '@decorators/validators/is-date-format.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, Matches } from 'class-validator'

export class CreateClassDto {
  @ApiProperty({
    description: 'The code of the class',
    example: 'BIO-25-001'
  })
  @IsNotEmpty()
  @Matches(/^BIO-\d{2}-\d{3}$/i, {
    message: 'classCode must match format BIO-YY-NNN (e.g., BIO-25-001)'
  })
  classCode: string

  @ApiProperty({
    description: 'The name of the class',
    example: 'Biology Class 1'
  })
  @IsNotEmpty()
  className: string

  @ApiProperty({
    description: 'The type of the class - it indicates the scope of the competition in which students participate',
    example: 'city'
  })
  @IsNotEmpty()
  @IsEnum(ClassType)
  classType: ClassType

  @ApiProperty({
    description: 'The start date of the class',
    example: '2025-01-01'
  })
  @IsNotEmpty()
  @IsDateFormat()
  startDate: Date

  @ApiProperty({
    description: 'The end date of the class',
    example: '2025-01-01'
  })
  @IsNotEmpty()
  @IsDateFormat()
  endDate: Date
}
