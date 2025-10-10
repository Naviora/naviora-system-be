import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

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
  module_description?: string
}
