import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'

export class VerifyOtpDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @Length(6, 6)
  @Matches(/^\d{6}$/, { message: 'OTP must be a 6-digit number' })
  otp: string
}
