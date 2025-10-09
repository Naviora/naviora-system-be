import { QuestionDifficulty, QuestionType } from '@common/enums/question.enum'
import { EnumField, StringField, URLFieldOptional, UUIDField } from '@decorators/field.decorators'
import { ApiProperty } from '@nestjs/swagger'

export class CreateQuestionDto {
  @ApiProperty()
  @UUIDField()
  lesson_id: string

  @ApiProperty()
  @StringField()
  content: string

  @ApiProperty()
  @EnumField(() => QuestionType)
  type: QuestionType

  @ApiProperty()
  @EnumField(() => QuestionDifficulty)
  difficulty: QuestionDifficulty

  @ApiProperty()
  @URLFieldOptional()
  additional_image: string

  @ApiProperty()
  @UUIDField()
  correct_answer_id: string
}
