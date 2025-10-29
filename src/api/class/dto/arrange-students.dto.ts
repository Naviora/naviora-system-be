import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested, ArrayMinSize } from 'class-validator'
import { Type } from 'class-transformer'

export class ClassDistributionDto {
  @ApiProperty({
    description: 'Score range for class assignment',
    example: '6-7',
    examples: ['0-3', '3-5', '5-6', '6-7', '7-8', '8-9', '9-10', '>8', '<5']
  })
  @IsString()
  @IsNotEmpty()
  range: string

  @ApiProperty({
    description: 'Class ID to assign students in this range',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID('4')
  @IsNotEmpty()
  classId: string
}

export class ArrangeStudentsDto {
  @ApiProperty({
    description: 'Entry test ID to get student scores from',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID('4')
  @IsNotEmpty()
  entryTestId: string

  @ApiProperty({
    description: 'Class distribution mapping score ranges to classes',
    type: [ClassDistributionDto],
    minItems: 1
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one class distribution is required' })
  @ValidateNested({ each: true })
  @Type(() => ClassDistributionDto)
  classDistribution: ClassDistributionDto[]
}

export class StudentAssignmentDto {
  @ApiProperty({
    description: 'Student ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  studentId: string

  @ApiProperty({
    description: 'Student name',
    example: 'John Doe'
  })
  studentName: string

  @ApiProperty({
    description: 'Student email',
    example: 'john.doe@example.com'
  })
  studentEmail: string

  @ApiProperty({
    description: 'Student entry test score',
    example: 7.5
  })
  score: number

  @ApiProperty({
    description: 'Assigned class ID',
    example: '123e4567-e89b-12d3-a456-426614174001'
  })
  assignedClassId: string

  @ApiProperty({
    description: 'Assigned class name',
    example: 'Advanced Mathematics Class'
  })
  assignedClassName: string

  @ApiProperty({
    description: 'Score range that determined the assignment',
    example: '7-8'
  })
  scoreRange: string
}

export class ClassArrangementResultDto {
  @ApiProperty({
    description: 'Entry test ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  entryTestId: string

  @ApiProperty({
    description: 'Entry test title',
    example: 'Mathematics Entry Test'
  })
  entryTestTitle: string

  @ApiProperty({
    description: 'Total number of students processed',
    example: 150
  })
  totalStudents: number

  @ApiProperty({
    description: 'Number of students successfully enrolled',
    example: 145
  })
  enrolledStudents: number

  @ApiProperty({
    description: 'Number of students that could not be enrolled',
    example: 5
  })
  unenrolledCount: number

  @ApiProperty({
    description: 'Class distribution summary with enrollment counts',
    example: {
      '0-5': { count: 25, classId: 'uuid1', className: 'Basic Math' },
      '5-7': { count: 40, classId: 'uuid2', className: 'Intermediate Math' },
      '7-10': { count: 30, classId: 'uuid3', className: 'Advanced Math' }
    }
  })
  classDistributionSummary: Record<string, { count: number; classId: string; className: string }>

  @ApiProperty({
    description: 'Summary of enrollment results',
    example: {
      success: true,
      message: 'Students successfully enrolled into classes',
      enrolmentDate: '2024-01-15T10:30:00.000Z'
    }
  })
  summary: {
    success: boolean
    message: string
    enrolmentDate: string
  }
}
