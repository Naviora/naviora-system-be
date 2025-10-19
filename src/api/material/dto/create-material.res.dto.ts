import { ApiProperty } from '@nestjs/swagger'
import { MaterialType } from '../entities/material.entity'
import { DateField, EnumField, StringField, UUIDField } from '@decorators/field.decorators'

export class CreateMaterialResDto {
  @ApiProperty({
    description: 'The ID of the material',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @UUIDField()
  materialId: string

  @ApiProperty({
    description: 'The name of the material',
    example: 'Material 1'
  })
  @StringField()
  materialName: string

  @ApiProperty({
    description: 'The type of the material',
    example: MaterialType.VIDEO
  })
  @EnumField(() => MaterialType)
  materialType: MaterialType

  @ApiProperty({
    description: 'The path of the material',
    example: 'https://example.com/material.pdf'
  })
  @StringField()
  materialPath: string

  @ApiProperty({
    description: 'The creation date of the material',
    example: '2025-01-01'
  })
  @DateField()
  createdAt: Date

  @ApiProperty({
    description: 'The last update date of the material',
    example: '2025-01-01'
  })
  @DateField()
  updatedAt: Date
}
