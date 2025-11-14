import { User } from '@api/user/entities/user.entity'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { QuestionSetBasicInfoDto } from './question-set-basic-info.dto'

export class EntryTestResponseDto {
  @ApiProperty()
  @Expose()
  entryTestId: string

  @ApiProperty()
  @Expose()
  title: string

  @ApiProperty()
  @Expose()
  description: string | null

  @ApiProperty({ enum: ExamStatus })
  @Expose()
  status: ExamStatus

  @ApiProperty()
  @Expose()
  startTime: Date

  @ApiProperty()
  @Expose()
  endTime: Date

  @ApiProperty({ type: [QuestionSetBasicInfoDto] })
  @Expose()
  questionSets: QuestionSetBasicInfoDto[]

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

  @ApiProperty({
    description: 'Whether the current student has already submitted/attempted this entry test',
    required: false
  })
  @Expose()
  isSubmitted?: boolean
}
