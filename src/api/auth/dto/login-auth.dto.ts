import { IsPassword } from '@decorators/validators/is-password.decorator'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsPassword()
  password: string
}
