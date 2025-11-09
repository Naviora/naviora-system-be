import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { AttemptStatus } from '@common/enums/attempt-status.enum'
import { OffsetPaginationDto } from '@common/dto/offset-pagination/offset-pagination.dto'

export class StudentGradeItemDto {
  @ApiProperty({ description: 'Student ID' })
  @Expose()
  studentId: string

  @ApiProperty({ description: 'Student name' })
  @Expose()
  studentName: string

  @ApiProperty({ description: 'Student email' })
  @Expose()
  studentEmail: string

  @ApiProperty({ description: 'Student avatar URL', required: false })
  @Expose()
  studentAvatar?: string

  @ApiProperty({ description: 'Submission ID' })
  @Expose()
  submissionId: string

  @ApiProperty({ description: 'Score/Grade', nullable: true })
  @Expose()
  score: number | null

  @ApiProperty({ description: 'Attempt status', enum: AttemptStatus })
  @Expose()
  attemptStatus: AttemptStatus

  @ApiProperty({ description: 'Submission date', nullable: true })
  @Expose()
  submittedAt: Date | null

  @ApiProperty({ description: 'Note from lecturer', nullable: true })
  @Expose()
  note: string | null

  @ApiProperty({ description: 'Whether penalty was applied', nullable: true })
  @Expose()
  penalty: boolean | null
}

export class StudentGradeListResponseDto {
  @ApiProperty({ description: 'Reviewed exercise ID' })
  @Expose()
  reviewedExerciseId: string

  @ApiProperty({ description: 'List of students with their grades', type: [StudentGradeItemDto] })
  @Expose()
  students: StudentGradeItemDto[]

  @ApiProperty({ description: 'Pagination metadata', type: OffsetPaginationDto })
  @Expose()
  pagination: OffsetPaginationDto
}
