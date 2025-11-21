import { User } from '@api/user/entities/user.entity'
import dayjs from 'dayjs'
import * as dotenv from 'dotenv'

const envFile = process.env.NODE_ENV?.trim() === 'development' ? '.env.dev' : '.env'
dotenv.config({ path: envFile })
export const formatDateTime = (date: string): string => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss.SSS')
}

export const combineDateTime = (date: string, time: string): string => {
  return dayjs(`${date} ${time}`).format('YYYY-MM-DD HH:mm:ss.SSS')
}

const defaultAvatar = process.env.DEFAULT_AVATAR

export const getDefaultPublicIdAvatar = (): string => {
  const result = 'avatar/' + defaultAvatar.split('/').pop()?.split('.')[0]
  return result
}

export const getPublicIdAvatar = (url: string): string => {
  const result = 'avatar/' + url.split('/').pop()?.split('.')[0]
  return result
}

export const extractUserRole = (currentUser: User) => {
  const userRole = typeof currentUser.role === 'string' ? currentUser.role : currentUser.role?.name
  return userRole
}
