import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class QuestionSetBasicInfoDto {
  @ApiProperty()
  @Expose()
  questionSetId: string

  @ApiProperty()
  @Expose()
  title: string

  @ApiProperty({ required: false, nullable: true })
  @Expose()
  description: string | null

  @ApiProperty()
  @Expose()
  totalQuestions: number

  @ApiProperty()
  @Expose()
  durationMinutes: number
}
