import { DateField, StringField, UUIDField } from '@decorators/field.decorators'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class TeachingMaterialResDto {
  @ApiProperty({
    description: 'The ID of the teaching material',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @UUIDField()
  @Expose()
  teachingMaterialId: string

  @ApiProperty({
    description: 'The ID of the material',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @UUIDField()
  @Expose()
  materialId: string

  @ApiProperty({
    description: 'The ID of the lesson',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @UUIDField()
  @Expose()
  lessonId: string

  @ApiProperty({
    description: 'The content of the teaching material',
    example: 'This is the content of the teaching material'
  })
  @StringField()
  @Expose()
  content: string

  @ApiProperty({
    description: 'The creation date of the teaching material',
    example: '2025-01-01'
  })
  @DateField()
  @Expose()
  createdAt: Date

  @ApiProperty({
    description: 'The last update date of the teaching material',
    example: '2025-01-01'
  })
  @DateField()
  @Expose()
  updatedAt: Date
}
