import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import { AnswerEntity } from '@api/answer/entities/answer.entity'

export class AnswerResponseDto {
  @ApiProperty({ description: 'Answer ID' })
  @Expose()
  @Transform(({ obj }) => obj.answerId)
  answerId: string

  @ApiProperty({ description: 'Answer content' })
  @Expose()
  content: string

  @ApiProperty({ description: 'Whether this answer is correct' })
  @Expose()
  @Transform(({ obj }) => obj.isCorrect)
  isCorrect: boolean

  @ApiProperty({ description: 'Additional image URL', required: false })
  @Expose()
  @Transform(({ obj }) => obj.additionalImage)
  additionalImage?: string

  @ApiProperty({ description: 'Creation date' })
  @Expose()
  @Transform(({ obj }) => obj.createdAt || obj.created_at)
  createdAt: Date

  @ApiProperty({ description: 'Last update date' })
  @Expose()
  @Transform(({ obj }) => obj.updatedAt || obj.updated_at)
  updatedAt: Date

  static fromEntity(entity: AnswerEntity): AnswerResponseDto {
    return {
      answerId: entity.answerId,
      content: entity.content,
      isCorrect: entity.isCorrect,
      additionalImage: entity.additionalImage,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    }
  }
}
