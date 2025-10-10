import { ApiProperty } from '@nestjs/swagger'

export class ModuleDTO {
  @ApiProperty()
  module_id: string
  @ApiProperty()
  module_code: string
  @ApiProperty()
  module_name: string
  @ApiProperty()
  module_description: string
  @ApiProperty()
  created_at: Date
  @ApiProperty()
  updated_at: Date
}
