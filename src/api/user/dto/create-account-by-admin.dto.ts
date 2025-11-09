import { ApiProperty } from '@nestjs/swagger'
import { EmailField, NumberField, StringField } from '@decorators/field.decorators'

export class CreateAccountByAdminDto {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @StringField()
  name: string

  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  @EmailField()
  email: string

  @ApiProperty({ description: 'Role ID (optional, must be below Admin level)', example: '2', required: false })
  @NumberField()
  role_id: number

  @ApiProperty({ description: 'Password', example: 'Password@123' })
  @StringField()
  password: string
}
