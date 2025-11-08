import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsNumberString } from 'class-validator'
import { StringField } from '@decorators/field.decorators'

export class CreateAccountByAdminDto {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @StringField()
  name: string

  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ description: 'Role ID (optional, must be below Admin level)', example: '2', required: false })
  @IsOptional()
  @IsNumberString()
  role_id?: string
}
