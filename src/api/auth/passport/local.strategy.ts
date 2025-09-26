import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { AccountStatus } from '@common/enums/account-role.enum'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Validate user by email
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<unknown> {
    try {
      const user = await this.authService.validateAccount(email, password)
      if (!user) {
        throw new BadRequestException('Email or password is incorrect!!!')
      }

      if (user.status === AccountStatus.Unactive) {
        throw new ForbiddenException('Account is not activated yet!')
      }

      const role = user?.role?.name || ''
      return { ...user, role }
    } catch (error) {
      throw error
    }
  }
}
