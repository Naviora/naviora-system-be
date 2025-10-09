import { ClassType } from '@common/enums/class-types.enum'
import { ApiProperty } from '@nestjs/swagger'

export class LecturerDTO {
  @ApiProperty({
    description: 'Lecturer ID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  id: string

  @ApiProperty({
    description: 'Lecturer name',
    example: 'John Doe'
  })
  name: string

  @ApiProperty({
    description: 'Lecturer email',
    example: 'john.doe@example.com'
  })
  email: string

  @ApiProperty({
    description: 'Lecturer avatar',
    example: 'https://example.com/avatar.jpg',
    required: false
  })
  avatar?: string

  @ApiProperty({
    description: 'Lecturer phone',
    example: '+1234567890',
    required: false
  })
  phone?: string
}

export class ClassDetailDTO {
  @ApiProperty({
    description: 'Class ID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  classId: string

  @ApiProperty({
    description: 'Class code',
    example: 'BIO-25-001'
  })
  classCode: string

  @ApiProperty({
    description: 'Class name',
    example: 'Biology Class 1'
  })
  className: string

  @ApiProperty({
    description: 'Class type',
    enum: ClassType,
    example: ClassType.CITY
  })
  classType: ClassType

  @ApiProperty({
    description: 'Start date of the class',
    example: '2025-01-01'
  })
  startDate: Date

  @ApiProperty({
    description: 'End date of the class',
    example: '2025-12-31'
  })
  endDate: Date

  @ApiProperty({
    description: 'Whether the class is active',
    example: true
  })
  isActive: boolean

  @ApiProperty({
    description: 'List of assigned lecturers',
    type: [LecturerDTO]
  })
  lecturers: LecturerDTO[]

  @ApiProperty({
    description: 'Date when the class was created',
    example: '2025-01-01T00:00:00.000Z'
  })
  createdAt: Date

  @ApiProperty({
    description: 'Date when the class was last updated',
    example: '2025-01-01T00:00:00.000Z'
  })
  updatedAt: Date
}
