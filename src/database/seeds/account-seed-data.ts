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
    // Student account
    name: 'Student 1',
    phone: '0958574507',
    address: '22 Nguyen Gia Tri St., Ward 7, Binh Thanh District, HCM City',
    dateOfBirth: '2003-03-28',
    gender: Gender.Female,
    email: 'student1@example.com',
    role: RoleInAccount.Student,
    password: 'Student@123',
    status: AccountStatus.Active
  },
  // User account
  {
    name: 'Regular User',
    phone: '0911222333',
    address: '101 Tran Hung Dao St., District 1, HCM City',
    dateOfBirth: '1995-07-12',
    gender: Gender.Other,
    email: 'user@example.com',
    password: 'User@123',
    role: RoleInAccount.User,
    status: AccountStatus.Active
  },
  // Lecturer account
  {
    name: 'Lecturer 1',
    phone: '0933445566',
    address: '45 Dien Bien Phu St., District 3, HCM City',
    dateOfBirth: '1985-11-05',
    gender: Gender.Male,
    email: 'lecturer@example.com',
    password: 'Lecturer@123',
    role: RoleInAccount.Lecturer,
    status: AccountStatus.Active
  },
  // Principal account
  {
    name: 'Principal 1',
    phone: '0988777666',
    address: '78 Le Loi St., District 1, HCM City',
    dateOfBirth: '1970-04-18',
    gender: Gender.Female,
    email: 'principal@example.com',
    password: 'Principal@123',
    role: RoleInAccount.Principal,
    status: AccountStatus.Active
  }
]
