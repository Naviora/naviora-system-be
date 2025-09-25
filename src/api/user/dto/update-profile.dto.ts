import { ApiProperty } from '@nestjs/swagger'

import { Gender } from '@common/enums/account-role.enum'
import { IsEnum } from 'class-validator'
import { IsDateFormat } from '@decorators/validators/is-date-format.decorator'
import { IsPhoneNumber } from '@decorators/validators/is-phone-format.decorator'

export class UpdateProfileDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  @IsPhoneNumber()
  phone: string

  @ApiProperty()
  address: string

  @ApiProperty()
  avatar: string

  @ApiProperty()
  @IsDateFormat()
  dateOfBirth: Date

  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender
}
