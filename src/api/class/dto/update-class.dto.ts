import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsOptional, IsBoolean } from 'class-validator'
import { CreateClassDto } from './create-class.dto'

export class UpdateClassDto extends PartialType(CreateClassDto) {
  @ApiProperty({
    description: 'Whether the class is active',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean
}
