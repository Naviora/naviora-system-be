import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateAccountStaffDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  staffId: string

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date

  @IsNotEmpty()
  @IsNumber()
  roleId: number
}
