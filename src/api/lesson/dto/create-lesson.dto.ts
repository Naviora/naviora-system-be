import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateLessonDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  module_id: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lesson_name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lesson_description: string
}
