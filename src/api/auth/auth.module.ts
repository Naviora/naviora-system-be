import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './passport/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenStrategy } from './passport/accessToken.strategy'
import { RefreshTokenStrategy } from './passport/refreshToken.strategy'
import { AccessTokenGuard } from './passport/accessToken.guard'
import { LocalAuthGuard } from './passport/local-auth.guard'
import { RefreshTokenGuard } from './passport/refreshToken.guard'
import { UserModule } from '@api/user/user.module'
import { MailService } from '@mail/mail.service'
import { MailModule } from '@mail/mail.module'
import { SessionEntity } from '@api/user/entities/session.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity]), UserModule, PassportModule, JwtModule.register({}), MailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenGuard,
    RefreshTokenStrategy,
    AccessTokenStrategy,
    LocalAuthGuard,
    RefreshTokenGuard,
    MailService
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
