import { AccountStatus, Gender, RoleInAccount } from '@common/enums/account-role.enum'
export const accountStatuses = [
  // Admin account
  {
    name: 'System Administrator',
    phone: '0123456789',
    address: 'Admin Office, HCM City',
    dateOfBirth: '1990-01-01',
    gender: Gender.Male,
    email: 'admin@naviora.com',
    password: 'Admin@123',
    role: RoleInAccount.Admin,
    status: AccountStatus.Active
  },
  {
    //1
    name: 'Student 1',
    phone: '0958574507',
    address: '22 Nguyen Gia Tri St., Ward 7, Binh Thanh District, HCM City',
    dateOfBirth: '2003-03-28',
    gender: Gender.Female,
    email: 'student1@example.com',
    role: RoleInAccount.User,
    password: 'Student@123',
    status: AccountStatus.Active
  }
]
