import { UserService } from '@api/user/user.service'
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { compareString, generateExpired, generateOtp } from '@utils/auth.util'
import { ChangePasswordAuthDto, EmailDTO, ForgotPasswordDTO } from './dto/change-password-auth'
import { VerifyOtpDTO } from './dto/verify-otp-payload'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { User } from '@api/user/entities/user.entity'
import { MailService } from '@mail/mail.service'
import ms, { type StringValue as MsStringValue } from 'ms'
import { JwtPayloadType } from '@api/auth/types/jwt-payload.type'
import { CacheKey } from '@constants/cache.constant'
import { createCacheKey } from '@utils/cache.util'
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util'
import crypto from 'crypto'
import { InjectRepository } from '@nestjs/typeorm'
import { SessionEntity } from '@api/user/entities/session.entity'
import { Repository } from 'typeorm'
import { JwtRefreshPayloadType } from '@api/auth/types/jwt-refresh-payload.type'
type PayLoadAuth = { id?: string; role?: string }
type Token = {
  accessToken: string
  refreshToken: string
  tokenExpires: number
}
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerService: MailService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>
  ) {}

  private async generateTokens(accountId: string, role: string, hash: string, sessionId: string): Promise<Token> {
    const accessExpiresIn: MsStringValue = (this.configService.get<string>('ACCESS_EXPIRES_IN') ??
      '15m') as MsStringValue
    const tokenExpires = Date.now() + ms(accessExpiresIn)

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id: accountId, role, session_id: sessionId },
        {
          secret: this.configService.get<string>('ACCESS_SECRET'),
          expiresIn: accessExpiresIn
        }
      ),
      this.jwtService.signAsync(
        { session_id: sessionId, hash },
        {
          secret: this.configService.get<string>('REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('REFRESH_EXPIRES_IN') ?? '7d'
        }
      )
    ])

    return { accessToken, refreshToken, tokenExpires } as Token
  }

  async validateAccount(email: string, pass: string): Promise<User> {
    try {
      const account = await this.userService.findByEmail(email)
      if (!account) {
        throw new ValidationException(ErrorCode.E004, 'Email not exists', [
          {
            property: 'email',
            code: ErrorCode.E004
          }
        ])
      }
      const isCheckedPassword = await compareString(pass, account.password)
      if (!isCheckedPassword) {
        throw new ValidationException(ErrorCode.E005, 'Password not correct', [
          {
            property: 'password',
            code: ErrorCode.E005
          }
        ])
      }
      return account
    } catch (error) {
      throw error
    }
  }

  async login(account: PayLoadAuth) {
    try {
      const hash = crypto.createHash('sha256').update(randomStringGenerator()).digest('hex')
      const session = this.sessionRepository.create({
        userId: account.id,
        hash
      })
      await this.sessionRepository.save(session)
      const tokens = await this.generateTokens(account.id, account.role, hash, session.id)
      if (!tokens.accessToken || !tokens.refreshToken) {
        throw new Error('Login failed')
      }

      return {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        expires_in: tokens.tokenExpires,
        role: account.role
      }
    } catch (error) {
      throw error
    }
  }

  async refreshToken(refresh_token: string) {
    try {
      const { session_id, hash } = this.verifyRefreshToken(refresh_token)
      const session = await this.sessionRepository.findOneBy({ id: session_id })

      if (!session || session.hash !== hash) {
        throw new UnauthorizedException()
      }

      const user = await this.userService.findById(session.userId)

      const newHash = crypto.createHash('sha256').update(randomStringGenerator()).digest('hex')

      this.sessionRepository.update(session.id, { hash: newHash })

      return await this.generateTokens(user.id, user.role.name, newHash, session.id)
    } catch (error) {
      throw error
    }
  }

  async logout(userToken: JwtPayloadType) {
    await this.cacheManager.set<boolean>(
      createCacheKey(CacheKey.SESSION_BLACKLIST, userToken.session_id),
      true,
      userToken.exp * 1000 - Date.now()
    )
    await this.sessionRepository.delete(userToken.session_id)
  }

  async verifyAccessToken(token: string): Promise<JwtPayloadType> {
    let payload: JwtPayloadType
    try {
      payload = this.jwtService.verify(token, {
        secret: this.configService.getOrThrow('ACCESS_SECRET')
      })
    } catch {
      throw new UnauthorizedException()
    }

    // Force logout if the session is in the blacklist
    const isSessionBlacklisted = await this.cacheManager.get<boolean>(
      createCacheKey(CacheKey.SESSION_BLACKLIST, payload.session_id)
    )

    if (isSessionBlacklisted) {
      throw new UnauthorizedException('Access token is invalid or revoked')
    }

    return payload
  }

  private verifyRefreshToken(token: string): JwtRefreshPayloadType {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.getOrThrow('REFRESH_SECRET')
      })
    } catch {
      throw new UnauthorizedException()
    }
  }

  async changePassword(id: string, data: ChangePasswordAuthDto) {
    try {
      return await this.userService.changePassword(id, data)
    } catch (error) {
      throw error
    }
  }

  async createOtp(payload: EmailDTO) {
    try {
      const otp = generateOtp(+this.configService.get<string>('OTP_LENGTH'))
      const expired_otp = generateExpired(+this.configService.get<string>('OTP_EXPIRES_IN'))
      const account = await this.userService.findByEmail(payload.email)
      if (!account) {
        throw new ValidationException(ErrorCode.E004, 'Email not exists', [
          {
            property: 'email',
            code: ErrorCode.E004
          }
        ])
      }
      await this.userService.createOtp(account.id, otp, expired_otp)

      this.mailerService.sendOtp(payload.email, otp, account.name)
    } catch (error) {
      throw error
    }
  }

  async verifyOtp(payload: VerifyOtpDTO): Promise<User> {
    try {
      const { email, otp } = payload
      const account = await this.userService.findByEmail(email)
      if (!account) {
        throw new ValidationException(ErrorCode.E004, 'Email not exists', [
          {
            property: 'email',
            code: ErrorCode.E004
          }
        ])
      }
      const otpRedis = await this.cacheManager.get(`otp:${account.id}`)
      if (!otpRedis) {
        throw new ValidationException(ErrorCode.E007, 'OTP has expired', [
          {
            property: 'otp',
            code: ErrorCode.E007
          }
        ])
      }
      if (otpRedis !== otp) {
        throw new ValidationException(ErrorCode.E008, 'OTP not match', [
          {
            property: 'otp',
            code: ErrorCode.E008
          }
        ])
      }
      return account
    } catch (error) {
      throw error
    }
  }

  async activeAccountOtp(account: User): Promise<void> {
    try {
      await this.userService.activeAccount(account.id)
    } catch (error) {
      throw error
    }
  }

  async forgotPassword(payload: ForgotPasswordDTO): Promise<void> {
    try {
      const { newPassword, confirmNewPassword } = payload
      if (newPassword !== confirmNewPassword) {
        throw new BadRequestException('New password and confirm password do not match')
      }
      await this.userService.forgotPassword(payload)
    } catch (error) {
      throw error
    }
  }
}
