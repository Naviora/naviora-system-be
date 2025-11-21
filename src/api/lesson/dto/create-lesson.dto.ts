import { StringField, StringFieldOptional, UUIDField } from '@decorators/field.decorators'
import { ApiProperty } from '@nestjs/swagger'

export class CreateLessonDto {
  @ApiProperty()
  @UUIDField()
  module_id: string

  @ApiProperty()
  @StringField()
  lesson_name: string

  @ApiProperty()
  @StringField()
  lesson_description: string

  @ApiProperty()
  @StringFieldOptional()
  lesson_content?: string
}
