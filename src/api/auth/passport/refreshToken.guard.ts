import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService
  ) {
    super()
  }
  handleRequest(err, user, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    // Lấy refresh token từ body
    const { refreshToken } = request.body

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing')
    }
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_SECRET')
      })
      if (err || !user) {
        throw new UnauthorizedException('Refresh token is invalid or expired')
      }
      return user
    } catch (error) {
      throw new UnauthorizedException('Refresh token is invalid or expired')
    }
  }
}
