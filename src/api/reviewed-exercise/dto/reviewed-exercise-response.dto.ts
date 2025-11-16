import { User } from '@api/user/entities/user.entity'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class ReviewedExerciseResponseDto {
  @ApiProperty()
  @Expose()
  reviewedExerciseId: string

  @ApiProperty()
  @Expose()
  lessonId: string

  @ApiProperty({ enum: ExamStatus })
  @Expose()
  status: ExamStatus

  @ApiProperty()
  @Expose()
  startTime: Date

  @ApiProperty()
  @Expose()
  endTime: Date

  @ApiProperty()
  @Expose()
  lecturerId: string

  @ApiProperty({ type: [String] })
  @Expose()
  questionSets: string[]

  @ApiProperty()
  @Expose()
  lecturer: User

  @ApiProperty()
  @Expose()
  createdBy: User

  @ApiProperty()
  @Expose()
  updatedBy: User | null

  @ApiProperty()
  @Expose()
  createdAt: Date

  @ApiProperty()
  @Expose()
  updatedAt: Date

  @ApiProperty({ description: 'Whether the current student has attempted/submitted this exercise', required: false })
  @Expose()
  isSubmitted?: boolean
}
