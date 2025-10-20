import { AttemptStatus } from '@common/enums/attempt-status.enum'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class EntryTestSubmissionResponseDto {
  @ApiProperty()
  @Expose()
  entryTestSubmissionId: string

  @ApiProperty()
  @Expose()
  studentId: string

  @ApiProperty()
  @Expose()
  entryTestId: string

  @ApiProperty()
  @Expose()
  questionSetId: string

  @ApiProperty({ enum: AttemptStatus })
  @Expose()
  attemptStatus: AttemptStatus

  @ApiProperty()
  @Expose()
  score: number | null

  @ApiProperty()
  @Expose()
  answered: Record<string, any> | null

  @ApiProperty()
  @Expose()
  penalty: boolean | null

  @ApiProperty()
  @Expose()
  note: string | null

  @ApiProperty()
  @Expose()
  submittedAt: Date | null

  @ApiProperty()
  @Expose()
  createdAt: Date

  @ApiProperty()
  @Expose()
  updatedAt: Date
}
