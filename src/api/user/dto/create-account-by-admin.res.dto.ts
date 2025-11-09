import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

export class CreateAccountByAdminResponseDto {
  @ApiProperty({ description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Expose()
  id: string

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @Expose()
  name: string

  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  @Expose()
  email: string

  @ApiProperty({ description: 'User avatar URL', example: 'https://example.com/avatar.jpg', required: false })
  @Expose()
  avatar: string | null

  @ApiProperty({ description: 'User phone', example: '0123456789', required: false })
  @Expose()
  phone: string | null

  @ApiProperty({ description: 'User address', required: false })
  @Expose()
  address: string | null

  @ApiProperty({ description: 'User gender', example: 'male', required: false })
  @Expose()
  gender: string | null

  @ApiProperty({ description: 'User date of birth', example: '1990-01-01', required: false })
  @Expose()
  dateOfBirth: Date | null

  @ApiProperty({ description: 'User status', example: 'Active' })
  @Expose()
  status: string

  @ApiProperty({ description: 'User office phone number', required: false })
  @Expose()
  officePhoneNumber: string | null

  @ApiProperty({ description: 'User point', required: false })
  @Expose()
  point: number | null

  @ApiProperty({ description: 'User username', required: false })
  @Expose()
  username: string | null

  @ApiProperty({ description: 'Has participated entry test', example: false })
  @Expose()
  hasParticipatedEntryTest: boolean

  @ApiProperty({ description: 'User role', required: false })
  @Expose()
  role: {
    id: number
    name: string
    description: string | null
    isActive: boolean
  } | null

  @ApiProperty({ description: 'Created at', example: '2025-01-01T00:00:00Z' })
  @Expose()
  createdAt: Date

  @ApiProperty({ description: 'Updated at', example: '2025-01-01T00:00:00Z' })
  @Expose()
  updatedAt: Date

  @Exclude()
  password: string

  @Exclude()
  sessions: unknown

  @Exclude()
  teachingAssignments: unknown

  @Exclude()
  teachingModules: unknown

  @Exclude()
  deletedAt: Date | null

  @Exclude()
  version: number
}
