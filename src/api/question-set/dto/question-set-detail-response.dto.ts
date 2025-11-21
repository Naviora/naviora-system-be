import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { QuestionResponseDto } from '@api/question/dto/question-response.dto'

export class LecturerDetailDto {
  @ApiProperty()
  @Expose()
  userId: string

  @ApiProperty()
  @Expose()
  name: string

  @ApiProperty()
  @Expose()
  email: string

  @ApiProperty()
  @Expose()
  avatar: string
}

export class GeneralConfigDetailDto {
  @ApiProperty()
  @Expose()
  duration_minutes: number

  @ApiProperty()
  @Expose()
  total_questions: number

  @ApiProperty()
  @Expose()
  allow_review: boolean

  @ApiProperty()
  @Expose()
  shuffle_questions: boolean

  @ApiProperty()
  @Expose()
  shuffle_answers: boolean
}

export class ScoringConfigDetailDto {
  @ApiProperty()
  @Expose()
  per_question: boolean

  @ApiProperty()
  @Expose()
  passing_score: number
}

export class BehaviorConfigDetailDto {
  @ApiProperty()
  @Expose()
  show_correct_after_submit: boolean

  @ApiProperty()
  @Expose()
  max_attempts: number
}

export class CompositionConfigDetailDto {
  @ApiProperty()
  @Expose()
  question_sources: string[]

  @ApiProperty()
  @Expose()
  topics: string[]
}

export class ProctoringConfigDetailDto {
  @ApiProperty()
  @Expose()
  enable_tab_tracking: boolean

  @ApiProperty()
  @Expose()
  enable_copy_paste_restriction: boolean
}

export class ConfigDetailDto {
  @ApiProperty({ type: GeneralConfigDetailDto })
  @Expose()
  general: GeneralConfigDetailDto

  @ApiProperty({ type: ScoringConfigDetailDto })
  @Expose()
  scoring: ScoringConfigDetailDto

  @ApiProperty({ type: BehaviorConfigDetailDto })
  @Expose()
  behavior: BehaviorConfigDetailDto

  @ApiProperty({ type: CompositionConfigDetailDto })
  @Expose()
  composition: CompositionConfigDetailDto

  @ApiProperty({ type: ProctoringConfigDetailDto })
  @Expose()
  proctoring: ProctoringConfigDetailDto
}

export class QuestionSetDetailResponseDto {
  @ApiProperty()
  @Expose()
  questionSetId: string

  @ApiProperty()
  @Expose()
  title: string

  @ApiProperty()
  @Expose()
  description: string | null

  @ApiProperty({ type: [QuestionResponseDto] })
  @Expose()
  questions: QuestionResponseDto[]

  @ApiProperty({ type: ConfigDetailDto })
  @Expose()
  config: ConfigDetailDto

  @ApiProperty()
  @Expose()
  isInUse: boolean

  @ApiProperty({ type: LecturerDetailDto })
  @Expose()
  lecturer: LecturerDetailDto

  @ApiProperty()
  @Expose()
  createdAt: Date

  @ApiProperty()
  @Expose()
  updatedAt: Date
}
