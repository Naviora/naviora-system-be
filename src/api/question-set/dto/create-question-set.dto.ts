import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'

class GeneralConfigDto {
  @ApiProperty()
  @IsInt()
  duration_minutes: number

  @ApiProperty()
  @IsInt()
  total_questions: number

  @ApiProperty()
  @IsBoolean()
  allow_review: boolean

  @ApiProperty()
  @IsBoolean()
  shuffle_questions: boolean

  @ApiProperty()
  @IsBoolean()
  shuffle_answers: boolean
}

class ScoringConfigDto {
  @ApiProperty()
  @IsBoolean()
  per_question: boolean

  @ApiProperty()
  @IsInt()
  passing_score: number
}

class BehaviorConfigDto {
  @ApiProperty()
  @IsBoolean()
  show_correct_after_submit: boolean

  @ApiProperty()
  @IsInt()
  max_attempts: number
}

class CompositionConfigDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  question_sources: string[]

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  topics: string[]
}

class ProctoringConfigDto {
  @ApiProperty()
  @IsBoolean()
  enable_tab_tracking: boolean

  @ApiProperty()
  @IsBoolean()
  enable_copy_paste_restriction: boolean
}

class ConfigDto {
  @ApiProperty({ type: GeneralConfigDto })
  @ValidateNested()
  @Type(() => GeneralConfigDto)
  general: GeneralConfigDto

  @ApiProperty({ type: ScoringConfigDto })
  @ValidateNested()
  @Type(() => ScoringConfigDto)
  scoring: ScoringConfigDto

  @ApiProperty({ type: BehaviorConfigDto })
  @ValidateNested()
  @Type(() => BehaviorConfigDto)
  behavior: BehaviorConfigDto

  @ApiProperty({ type: CompositionConfigDto })
  @ValidateNested()
  @Type(() => CompositionConfigDto)
  composition: CompositionConfigDto

  @ApiProperty({ type: ProctoringConfigDto })
  @ValidateNested()
  @Type(() => ProctoringConfigDto)
  proctoring: ProctoringConfigDto
}

export class CreateQuestionSetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  content: string[]

  @ApiProperty({ type: ConfigDto })
  @ValidateNested()
  @Type(() => ConfigDto)
  config: ConfigDto
}
