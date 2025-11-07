import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { AccountStatus, Gender, RoleInAccount } from '@common/enums/account-role.enum'
import { EnumFieldOptional, StringFieldOptional } from '@decorators/field.decorators'

export class GetUsersQueryDto extends PageOptionsDto {
  @EnumFieldOptional(() => RoleInAccount)
  readonly role?: RoleInAccount

  @EnumFieldOptional(() => Gender)
  readonly gender?: Gender

  @EnumFieldOptional(() => AccountStatus)
  readonly status?: AccountStatus

  @StringFieldOptional()
  readonly sortBy?: string
}

