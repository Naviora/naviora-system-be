import { AccountStatus, Gender, RoleInAccount } from '@common/enums/account-role.enum'

export const accountStatuses = [
  //1
  {
    phone: '0958574507',
    address: '22 Nguyen Gia Tri St., Ward 7, Binh Thanh District, HCM City',
    dateOfBirth: '2003-03-28',
    gender: Gender.Female,
    email: 'claimer3@example.com',
    role: RoleInAccount.User,
    status: AccountStatus.Active
  },
  {
    phone: '0954887031',
    address: '4 Nguyen Huu Canh St., Ward 10, Binh Thanh District, HCM City',
    dateOfBirth: '1987-07-05',
    gender: Gender.Female,
    email: 'nganpttse184030@fpt.edu.vn',
    role: RoleInAccount.User,
    status: AccountStatus.Active
  },

  //2
  {
    phone: '0321547896',
    address: '25 Tran Hung Dao, District 1, HCM City',
    dateOfBirth: '1998-06-20',
    gender: Gender.Male,
    email: 'claimer4@example.com',
    role: RoleInAccount.User,
    status: AccountStatus.Active
  },
  {
    phone: '0789654123',
    address: '78 Pham Van Dong, Thu Duc City, HCM',
    dateOfBirth: '1997-11-05',
    gender: Gender.Male,
    email: 'claimer5@example.com',
    role: RoleInAccount.User,
    status: AccountStatus.Active
  },
  {
    phone: '0932145789',
    address: '99 Nguyen Van Cu, District 5, HCM City',
    dateOfBirth: '1994-03-12',
    gender: Gender.Male,
    email: 'claimer6@example.com',
    role: RoleInAccount.User,
    status: AccountStatus.Active
  },
  {
    phone: '0823546971',
    address: '12 Hoang Dieu, District 4, HCM City',
    dateOfBirth: '1992-12-25',
    gender: Gender.Female,
    email: 'claimer7@example.com',
    role: RoleInAccount.Admin,
    status: AccountStatus.Active
  },
  {
    phone: '0302890570',
    address: '23 Le Van Duyet St., Ward 10, District 7, HCM City',
    dateOfBirth: '1989-04-01',
    gender: Gender.Female,
    email: 'approver2@example.com',
    role: RoleInAccount.User,
    status: AccountStatus.Active
  }
]
