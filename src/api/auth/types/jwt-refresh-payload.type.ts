import { Uuid } from '@common/types/common.type'

export type JwtRefreshPayloadType = {
  session_id: Uuid
  hash: string
  iat: number
  exp: number
}
