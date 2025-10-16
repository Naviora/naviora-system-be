import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDate, IsOptional, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

export class QuestionSetResponseDto {
  @ApiProperty()
  @IsUUID()
  question_set_id: string

  @ApiProperty()
  @IsUUID()
  lecturer_id: string

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ type: [String] })
  @IsArray()
  content: string[]

  @ApiProperty({ type: Object })
  config: Record<string, any>

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  created_at: Date

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  updated_at: Date
}
