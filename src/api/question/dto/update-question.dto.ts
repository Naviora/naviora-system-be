import { QuestionDifficulty, QuestionType } from '@common/enums/question.enum'
import { BooleanField, EnumField, StringField, URLFieldOptional, UUIDField } from '@decorators/field.decorators'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsOptional, ValidateNested } from 'class-validator'

export class UpdateAnswerBodyDto {
  @ApiProperty({
    description: 'Answer ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @UUIDField()
  answer_id: string

  @ApiProperty({
    description: 'Answer content',
    example: 'Paris'
  })
  @StringField()
  content: string

  @ApiProperty({
    description: 'Whether this answer is correct',
    example: true
  })
  @BooleanField()
  is_correct: boolean
}

export class UpdateQuestionDto {
  @ApiProperty({
    description: 'Question content',
    example: 'What is the capital of France?'
  })
  @StringField()
  content: string

  @ApiProperty({
    description: 'Question type',
    enum: QuestionType,
    enumName: 'QuestionType',
    example: QuestionType.MULTI_CHOICE
  })
  @EnumField(() => QuestionType)
  type: QuestionType

  @ApiProperty({
    description: 'Question difficulty level',
    enum: QuestionDifficulty,
    enumName: 'QuestionDifficulty',
    example: QuestionDifficulty.MEDIUM
  })
  @EnumField(() => QuestionDifficulty)
  difficulty: QuestionDifficulty

  @ApiProperty({
    description: 'Lesson ID this question belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @UUIDField()
  lesson_id: string

  @ApiProperty({
    description: 'Additional image URL (optional)',
    example: 'https://example.com/image.jpg',
    required: false
  })
  @URLFieldOptional()
  additional_image?: string

  @ApiProperty({
    description: 'List of answers for this question',
    type: [UpdateAnswerBodyDto]
  })
  @IsArray({ message: 'Answers must be an array' })
  @ValidateNested({ each: true })
  @Type(() => UpdateAnswerBodyDto)
  @IsOptional()
  answers: UpdateAnswerBodyDto[]
}
