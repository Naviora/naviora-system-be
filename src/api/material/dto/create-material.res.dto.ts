import { ApiProperty } from '@nestjs/swagger'
import { MaterialType } from '../entities/material.entity'
import { DateField, EnumField, StringField, UUIDField } from '@decorators/field.decorators'
import { Expose } from 'class-transformer'

export class CreateMaterialResDto {
  @ApiProperty({
    description: 'The ID of the material',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @UUIDField()
  @Expose()
  materialId: string

  @ApiProperty({
    description: 'The name of the material',
    example: 'Material 1'
  })
  @StringField()
  @Expose()
  materialName: string

  @ApiProperty({
    description: 'The type of the material',
    example: MaterialType.VIDEO
  })
  @Expose()
  @EnumField(() => MaterialType)
  materialType: MaterialType

  @ApiProperty({
    description: 'The path of the material',
    example: 'https://example.com/material.pdf'
  })
  @StringField()
  @Expose()
  materialPath: string

  @ApiProperty({
    description: 'The creation date of the material',
    example: '2025-01-01'
  })
  @DateField()
  @Expose()
  createdAt: Date

  @ApiProperty({
    description: 'The last update date of the material',
    example: '2025-01-01'
  })
  @DateField()
  @Expose()
  updatedAt: Date
}
