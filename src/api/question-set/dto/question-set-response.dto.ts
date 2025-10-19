import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class LecturerInfoDto {
  @ApiProperty()
  @Expose()
  userId: string

  @ApiProperty()
  @Expose()
  name: string

  @ApiProperty()
  @Expose()
  email: string
}

export class QuestionSetResponseDto {
  @ApiProperty()
  @Expose()
  questionSetId: string

  @ApiProperty()
  @Expose()
  title: string

  @ApiProperty()
  @Expose()
  description: string | null

  @ApiProperty()
  @Expose()
  totalQuestions: number

  @ApiProperty()
  @Expose()
  durationMinutes: number

  @ApiProperty()
  @Expose()
  passingScore: number

  @ApiProperty()
  @Expose()
  maxAttempts: number

  @ApiProperty()
  @Expose()
  lecturer: LecturerInfoDto

  @ApiProperty()
  @Expose()
  createdAt: Date

  @ApiProperty()
  @Expose()
  updatedAt: Date
}
