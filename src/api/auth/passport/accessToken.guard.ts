import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../../../decorators/auth.decorator'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    super()
  }

  canActivate(context: ExecutionContext) {
    // Skip authentication for public endpoints
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }
    // For HTTP requests, use the default behavior
    return super.canActivate(context)
  }

  handleRequest(err, account, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException('Access token is missing')
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('ACCESS_SECRET')
      })

      request.user = decoded
      return decoded
    } catch (error) {
      throw new UnauthorizedException('Access token is invalid or expired')
    }
  }
}
