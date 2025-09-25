import { ApiProperty } from '@nestjs/swagger'
import { User } from '@api/user/entities/user.entity'

export class NotifyBody {
  @ApiProperty()
  id: string

  @ApiProperty()
  message: string
}

export class CreateNotifyResDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  type: string

  @ApiProperty({ type: NotifyBody })
  body: NotifyBody

  @ApiProperty()
  status: boolean

  @ApiProperty()
  createdAt: string

  @ApiProperty()
  userTarget: User
}
