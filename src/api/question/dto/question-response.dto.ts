import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform, Type } from 'class-transformer'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { AnswerResponseDto } from '@api/answer/dto/answer-response.dto'
import { QuestionDifficulty, QuestionType } from '@common/enums/question.enum'

export class QuestionResponseDto {
  @ApiProperty({ description: 'Question ID' })
  @Expose()
  @Transform(({ obj }) => obj.questionId)
  questionId: string

  @ApiProperty({ description: 'Lesson ID this question belongs to' })
  @Expose()
  @Transform(({ obj }) => obj.lessonId)
  lessonId: string

  @ApiProperty({ description: 'Question content' })
  @Expose()
  content: string

  @ApiProperty({
    description: 'Question type',
    enum: QuestionType,
    enumName: 'QuestionType'
  })
  @Expose()
  @Transform(({ obj }) => obj.type)
  type: QuestionType

  @ApiProperty({
    description: 'Question difficulty level',
    enum: QuestionDifficulty,
    enumName: 'QuestionDifficulty'
  })
  @Expose()
  @Transform(({ obj }) => obj.difficulty)
  difficulty: QuestionDifficulty

  @ApiProperty({ description: 'Additional image URL', required: false })
  @Expose()
  @Transform(({ obj }) => obj.additionalImage)
  additionalImage?: string

  @ApiProperty({ description: 'Correct answer ID' })
  @Expose()
  @Transform(({ obj }) => obj.correctAnswerId)
  correctAnswerId: string

  @ApiProperty({
    description: 'List of answers for this question',
    type: [AnswerResponseDto]
  })
  @Expose()
  @Type(() => AnswerResponseDto)
  @Transform(({ obj }) => obj.answers?.map((answer) => AnswerResponseDto.fromEntity(answer)))
  answers: AnswerResponseDto[]

  @ApiProperty({ description: 'Creation date' })
  @Expose()
  @Transform(({ obj }) => obj.createdAt || obj.created_at)
  createdAt: Date

  @ApiProperty({ description: 'Last update date' })
  @Expose()
  @Transform(({ obj }) => obj.updatedAt || obj.updated_at)
  updatedAt: Date

  static fromEntity(entity: QuestionEntity): QuestionResponseDto {
    return {
      questionId: entity.questionId,
      lessonId: entity.lessonId,
      content: entity.content,
      type: entity.type,
      difficulty: entity.difficulty,
      additionalImage: entity.additionalImage,
      correctAnswerId: entity.correctAnswerId,
      answers: entity.answers?.map((answer) => AnswerResponseDto.fromEntity(answer)),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    }
  }
}

export class CreateQuestionResponseDto {
  @ApiProperty({
    description: 'Created question',
    type: QuestionResponseDto
  })
  @Expose()
  @Type(() => QuestionResponseDto)
  @Transform(({ obj }) => QuestionResponseDto.fromEntity(obj.question))
  question: QuestionResponseDto

  @ApiProperty({
    description: 'Created answers',
    type: [AnswerResponseDto]
  })
  @Expose()
  @Type(() => AnswerResponseDto)
  @Transform(({ obj }) => obj.answers?.map((answer) => AnswerResponseDto.fromEntity(answer)))
  answers: AnswerResponseDto[]
}
