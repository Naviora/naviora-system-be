import { RoleInAccount } from '@common/enums/account-role.enum'

export const RoleInAccounts = [
  {
    name: RoleInAccount.User,
    description: 'User submitting claims.',
    permissions: 'create,view'
  },
  {
    name: RoleInAccount.Admin,
    description: 'System administrator.',
    permissions: 'manage,view,edit,delete'
  }
]
