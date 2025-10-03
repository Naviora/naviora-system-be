import { RoleInAccount } from '@common/enums/account-role.enum'

export const RoleInAccounts = [
  {
    name: RoleInAccount.Admin,
    description: 'System administrator.',
    permissions: 'manage,view,edit,delete'
  },
  {
    name: RoleInAccount.Student,
    description: 'Student user with limited access.',
    permissions: 'view,create'
  },
  {
    name: RoleInAccount.User,
    description: 'User submitting claims.',
    permissions: 'create,view'
  },
  {
    name: RoleInAccount.Lecturer,
    description: 'Lecturer user with limited access.',
    permissions: 'view,create'
  },
  {
    name: RoleInAccount.Principal,
    description: 'Principal user with limited access.',
    permissions: 'view,create'
  }
]
