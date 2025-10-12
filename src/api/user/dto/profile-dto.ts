import { AccountStatus, Gender } from '@common/enums/account-role.enum'

export class ProfileDTO {
  account_id: string
  name: string
  email: string
  staff_id: string
  avatar: string
  phone: string
  address: string
  gender: Gender
  date_of_birth: Date
  status: AccountStatus
  department: string
  rank: string
  role: string
  salary: number
}
