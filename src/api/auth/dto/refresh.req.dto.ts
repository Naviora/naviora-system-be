import { TokenField } from '@decorators/field.decorators'

export class RefreshReqDto {
  @TokenField()
  refresh_token!: string
}
