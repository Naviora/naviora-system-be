import { AccountStatus, Gender } from '@common/enums/account-role.enum'

export class ProfileDTO {
  accountId: string
  name: string
  email: string
  staffId: string
  avatar: string
  phone: string
  address: string
  gender: Gender
  dateOfBirth: Date
  status: AccountStatus
  department: string
  rank: string
  role: string
  salary: number
}
