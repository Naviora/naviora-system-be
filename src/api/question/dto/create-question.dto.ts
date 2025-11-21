import { CreateAnswerDto } from '@api/answer/dto/create-answer.dto'
import { QuestionDifficulty, QuestionType } from '@common/enums/question.enum'
import { EnumField, StringField, URLFieldOptional, UUIDFieldOptional } from '@decorators/field.decorators'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested, IsNotEmpty, ArrayMinSize } from 'class-validator'

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Lesson ID this question belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @UUIDFieldOptional()
  lesson_id: string

  @ApiProperty({
    description: 'Question content',
    example: 'What is the capital of France?'
  })
  @StringField()
  @IsNotEmpty({ message: 'Question content is required' })
  content: string

  @ApiProperty({
    description: 'Question type',
    enum: QuestionType,
    enumName: 'QuestionType',
    example: QuestionType.MULTI_CHOICE
  })
  @EnumField(() => QuestionType)
  @IsNotEmpty({ message: 'Question type is required' })
  type: QuestionType

  @ApiProperty({
    description: 'Question difficulty level',
    enum: QuestionDifficulty,
    enumName: 'QuestionDifficulty',
    example: QuestionDifficulty.MEDIUM
  })
  @EnumField(() => QuestionDifficulty)
  @IsNotEmpty({ message: 'Question difficulty is required' })
  difficulty: QuestionDifficulty

  @ApiProperty({
    description: 'Additional image URL (optional)',
    example: 'https://example.com/image.jpg',
    required: false
  })
  @URLFieldOptional()
  additional_image?: string

  @ApiProperty({
    description: 'List of answers for this question',
    type: [CreateAnswerDto],
    minItems: 2
  })
  @IsArray({ message: 'Answers must be an array' })
  @ArrayMinSize(2, { message: 'At least 2 answers are required' })
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[]
}
