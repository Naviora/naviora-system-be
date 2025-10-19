import { StringField, UUIDField } from '@decorators/field.decorators'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTeachingMaterialDto {
  @ApiProperty({
    description: 'The ID of the lesson',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @UUIDField()
  lesson_id: string

  @ApiProperty({
    description: 'The content of the teaching material',
    example: 'This is the content of the teaching material'
  })
  @StringField()
  content: string

  @ApiProperty({
    description: 'The ID of the material',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @UUIDField()
  material_id: string
}
