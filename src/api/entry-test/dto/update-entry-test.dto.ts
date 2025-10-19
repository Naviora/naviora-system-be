import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'
import { ExamStatus } from '@common/enums/exam-status.enum'

export class UpdateEntryTestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ enum: ExamStatus, required: false })
  @IsOptional()
  status?: ExamStatus

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  questionSets?: string[]
}
