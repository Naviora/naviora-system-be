import { ClassType } from '@common/enums/class-types.enum'
import { IsDate, IsEnum, IsNotEmpty, Matches } from 'class-validator'

export class CreateClassDto {
  @IsNotEmpty()
  @Matches(/^BIO-\d{2}-\d{3}$/i, {
    message: 'classCode must match format BIO-YY-NNN (e.g., BIO-25-001)'
  })
  classCode: string

  @IsNotEmpty()
  className: string

  @IsNotEmpty()
  @IsEnum(ClassType)
  classType: ClassType

  @IsNotEmpty()
  @IsDate()
  startDate: Date

  @IsNotEmpty()
  @IsDate()
  endDate: Date
}
