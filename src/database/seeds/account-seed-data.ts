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
  {
    name: 'Student 2',
    phone: '0912345678',
    address: '123 Le Van Viet St., Ward 9, Thu Duc District, HCM City',
    dateOfBirth: '2002-05-15',
    gender: Gender.Male,
    email: 'student2@example.com',
    role: RoleInAccount.Student,
    password: 'Student@123',
    status: AccountStatus.Active
  },
  {
    name: 'Student 3',
    phone: '0923456789',
    address: '456 Vo Van Tan St., Ward 6, District 3, HCM City',
    dateOfBirth: '2004-08-22',
    gender: Gender.Female,
    email: 'student3@example.com',
    role: RoleInAccount.Student,
    password: 'Student@123',
    status: AccountStatus.Active
  },
  {
    name: 'Student 4',
    phone: '0934567890',
    address: '789 Nguyen Trai St., Ward 5, District 5, HCM City',
    dateOfBirth: '2003-11-10',
    gender: Gender.Male,
    email: 'student4@example.com',
    role: RoleInAccount.Student,
    password: 'Student@123',
    status: AccountStatus.Active
  },
  {
    name: 'Student 5',
    phone: '0945678901',
    address: '321 Ly Tu Trong St., Ward 1, District 1, HCM City',
    dateOfBirth: '2002-02-18',
    gender: Gender.Other,
    email: 'student5@example.com',
    role: RoleInAccount.Student,
    password: 'Student@123',
    status: AccountStatus.Active
  },
  {
    name: 'Student 6',
    phone: '0956789012',
    address: '654 Pasteur St., Ward 6, District 3, HCM City',
    dateOfBirth: '2004-07-05',
    gender: Gender.Female,
    email: 'student6@example.com',
    role: RoleInAccount.Student,
    password: 'Student@123',
    status: AccountStatus.Active
  },
  {
    name: 'Student 7',
    phone: '0967890123',
    address: '987 Cach Mang Thang Tam St., Ward 7, District 10, HCM City',
    dateOfBirth: '2003-09-30',
    gender: Gender.Male,
    email: 'student7@example.com',
    role: RoleInAccount.Student,
    password: 'Student@123',
    status: AccountStatus.Active
  },
  {
    name: 'Student 8',
    phone: '0978901234',
    address: '147 Nguyen Dinh Chieu St., Ward 6, District 3, HCM City',
    dateOfBirth: '2002-12-14',
    gender: Gender.Female,
    email: 'student8@example.com',
    role: RoleInAccount.Student,
    password: 'Student@123',
    status: AccountStatus.Active
  },
  {
    name: 'Student 9',
    phone: '0989012345',
    address: '258 Hoang Van Thu St., Ward 4, Tan Binh District, HCM City',
    dateOfBirth: '2004-04-25',
    gender: Gender.Male,
    email: 'student9@example.com',
    role: RoleInAccount.Student,
    password: 'Student@123',
    status: AccountStatus.Active
  },
  {
    name: 'Student 10',
    phone: '0990123456',
    address: '369 Nguyen Van Cu St., Ward 4, District 5, HCM City',
    dateOfBirth: '2003-06-08',
    gender: Gender.Female,
    email: 'student10@example.com',
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
