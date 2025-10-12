import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateModuleDto {
  @ApiProperty({
    description: 'The code of the module',
    example: 'CD1'
  })
  @IsNotEmpty()
  /**
   * TODO: should check the format of the moduleCode match with the specific regex
   */
  module_code: string

  @ApiProperty({
    description: 'The name of the module',
    example: 'Cơ bản về cơ thể người'
  })
  @IsNotEmpty()
  module_name: string

  @ApiProperty({
    description: 'The description of the module',
    example: 'Module 1 description',
    default: null
  })
  @IsOptional()
  module_description?: string

  @ApiProperty({
    description: 'The banner image URL of the module',
    example: 'https://res.cloudinary.com/example/image/upload/v1234567890/banner.jpg',
    required: false
  })
  @IsOptional()
  banner?: string

  @ApiProperty({
    description: 'The class ID of the module',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: true
  })
  @IsNotEmpty()
  class_id: string
}
