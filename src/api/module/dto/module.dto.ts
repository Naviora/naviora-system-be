import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsUUID, IsDate } from 'class-validator'
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
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  created_at: Date
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  updated_at: Date
}
