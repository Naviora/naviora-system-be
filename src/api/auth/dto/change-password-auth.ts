import { IsPassword } from '@decorators/validators/is-password.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangePasswordAuthDto {
  @ApiProperty()
  @IsPassword()
  currentPassword: string

  @ApiProperty()
  @IsPassword()
  newPassword: string

  @ApiProperty()
  @IsPassword()
  confirmPassword: string
}

export class EmailDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export class ForgotPasswordDTO {
  id?: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @Length(6, 6)
  otp: string

  @IsPassword()
  newPassword: string

  @IsPassword()
  confirmNewPassword: string
}
