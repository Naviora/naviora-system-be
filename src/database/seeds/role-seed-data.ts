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
  },
  {
    name: RoleInAccount.Student,
    description: 'Student user with limited access.',
    permissions: 'view,create'
  }
]
