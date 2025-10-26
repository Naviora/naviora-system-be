import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class AnswerSubmissionDto {
  @ApiProperty({
    description: 'Question ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID('4')
  @IsNotEmpty()
  questionId: string

  @ApiProperty({
    description: 'Chosen answer ID',
    example: '123e4567-e89b-12d3-a456-426614174001'
  })
  @IsUUID('4')
  @IsNotEmpty()
  answerId: string
}

export class SubmitEntryTestDto {
  @ApiProperty({
    description: 'Array of answered questions with chosen answers',
    type: [AnswerSubmissionDto],
    example: [
      {
        questionId: '123e4567-e89b-12d3-a456-426614174000',
        answerId: '123e4567-e89b-12d3-a456-426614174001'
      },
      {
        questionId: '123e4567-e89b-12d3-a456-426614174002',
        answerId: '123e4567-e89b-12d3-a456-426614174003'
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerSubmissionDto)
  answered: AnswerSubmissionDto[]
}
