import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'

type JwtPayload = {
  id: string
}
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req.body && req.body.refreshToken) {
            return req.body.refreshToken
          }
          return null
        }
      ]),
      secretOrKey: configService.get<string>('REFRESH_SECRET'),
      passReqToCallback: true
    })
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.body.refreshToken
    return { ...payload, refreshToken }
  }
}
