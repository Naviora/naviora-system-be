import { ApiProperty } from '@nestjs/swagger'
import { MaterialType } from '@common/enums/material.enum'
import { EnumField, StringField, URLField } from '@decorators/field.decorators'

export class CreateMaterialDto {
  @ApiProperty({
    description: 'The name of the material',
    example: 'Material 1'
  })
  @StringField()
  material_name: string

  @ApiProperty({
    description: 'The type of the material',
    example: MaterialType.VIDEO
  })
  @EnumField(() => MaterialType)
  material_type: MaterialType

  @ApiProperty({
    description: 'The path of the material',
    example: 'https://example.com/material.pdf'
  })
  @URLField()
  material_path: string
}
