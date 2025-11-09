import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsUUID, IsDate, IsArray } from 'class-validator'
import { Type } from 'class-transformer'

export class ModuleDTO {
  @ApiProperty()
  @IsUUID()
  module_id: string
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  module_code: string
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  module_name: string
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  module_description: string
  @ApiProperty()
  @IsString()
  banner: string
  @ApiProperty({ type: [String], description: 'Array of lecturer IDs assigned to this module' })
  @IsArray()
  @IsUUID('4', { each: true })
  lecturer_ids: string[]
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  created_at: Date
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  updated_at: Date
}
