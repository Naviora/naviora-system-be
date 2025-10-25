import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, MaxLength, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { NumberField } from '@decorators/field.decorators'

class GeneralConfigDto {
  @ApiProperty({ default: 60 })
  @NumberField({
    min: 1,
    max: 150,
    int: true
  })
  duration_minutes: number

  @ApiProperty({ default: 50 })
  @NumberField({
    min: 10,
    max: 120,
    int: true
  })
  total_questions: number

  @ApiProperty({ default: false })
  @IsBoolean()
  allow_review: boolean

  @ApiProperty({ default: true })
  @IsBoolean()
  shuffle_questions: boolean

  @ApiProperty({ default: true })
  @IsBoolean()
  shuffle_answers: boolean
}

class ScoringConfigDto {
  @ApiProperty({ default: true })
  @IsBoolean()
  per_question: boolean

  @ApiProperty({ default: 7 })
  @NumberField({
    min: 1,
    max: 10,
    int: true
  })
  passing_score: number
}

class BehaviorConfigDto {
  @ApiProperty({ default: false })
  @IsBoolean()
  show_correct_after_submit: boolean

  @ApiProperty({ default: 1 })
  @NumberField({
    min: 0,
    max: 10,
    int: true
  })
  max_attempts: number
}

class CompositionConfigDto {
  @ApiProperty({ type: [String], default: ['question'] })
  @IsArray()
  @IsString({ each: true })
  question_sources: string[]

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @IsString({ each: true })
  topics: string[]
}

class ProctoringConfigDto {
  @ApiProperty({ default: false })
  @IsBoolean()
  enable_tab_tracking: boolean

  @ApiProperty({ default: false })
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

export class UpdateQuestionSetDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  questions?: string[]

  @ApiProperty({ type: ConfigDto, required: false })
  @ValidateNested()
  @Type(() => ConfigDto)
  @IsOptional()
  config?: ConfigDto
}
