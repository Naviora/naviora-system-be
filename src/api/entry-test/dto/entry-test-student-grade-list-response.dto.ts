import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { OffsetPaginationDto } from '@common/dto/offset-pagination/offset-pagination.dto'
import { AttemptStatus } from '@common/enums/attempt-status.enum'

export class EntryTestStudentGradeItemDto {
  @ApiProperty({ description: 'Student ID' })
  @Expose()
  studentId: string

  @ApiProperty({ description: 'Student name' })
  @Expose()
  studentName: string

  @ApiProperty({ description: 'Student email' })
  @Expose()
  studentEmail: string

  @ApiProperty({ description: 'Student avatar URL', nullable: true })
  @Expose()
  studentAvatar: string | null

  @ApiProperty({ description: 'Entry test submission ID' })
  @Expose()
  submissionId: string

  @ApiProperty({ description: 'Submission score (0-10)', nullable: true })
  @Expose()
  score: number | null

  @ApiProperty({ enum: AttemptStatus, description: 'Attempt status' })
  @Expose()
  attemptStatus: AttemptStatus

  @ApiProperty({ description: 'Submission date', nullable: true })
  @Expose()
  submittedAt: Date | null

  @ApiProperty({ description: 'Notes from lecturer', nullable: true })
  @Expose()
  note: string | null

  @ApiProperty({ description: 'Whether penalty was applied', nullable: true })
  @Expose()
  penalty: boolean | null
}

export class EntryTestStudentGradeListResponseDto {
  @ApiProperty({ description: 'Entry test ID' })
  @Expose()
  entryTestId: string

  @ApiProperty({ type: [EntryTestStudentGradeItemDto], description: 'List of student grades' })
  @Expose()
  @Type(() => EntryTestStudentGradeItemDto)
  students: EntryTestStudentGradeItemDto[]

  @ApiProperty({ type: OffsetPaginationDto, description: 'Pagination metadata' })
  @Expose()
  @Type(() => OffsetPaginationDto)
  pagination: OffsetPaginationDto
}

