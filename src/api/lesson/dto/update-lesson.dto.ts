import { ApiProperty } from '@nestjs/swagger'
import { StringField } from '@decorators/field.decorators'

export class UpdateLessonDto {
  @ApiProperty()
  @StringField()
  lesson_content: string

  @ApiProperty()
  @StringField()
  lesson_description: string

  @ApiProperty()
  @StringField()
  lesson_name: string
}
