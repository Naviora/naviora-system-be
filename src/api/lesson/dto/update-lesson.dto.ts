import { ApiProperty } from '@nestjs/swagger'
import { StringField, UUIDFieldOptional } from '@decorators/field.decorators'

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

  @ApiProperty({ required: false })
  @UUIDFieldOptional({ each: true })
  materials?: string[]
}
