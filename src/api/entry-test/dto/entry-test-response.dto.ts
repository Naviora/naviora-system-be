import { User } from '@api/user/entities/user.entity'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

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

  @ApiProperty({ type: [String] })
  @Expose()
  questionSets: string[]

  @ApiProperty()
  @Expose()
  createdBy: User

  @ApiProperty()
  @Expose()
  createdAt: Date

  @ApiProperty()
  @Expose()
  updatedAt: Date
}
