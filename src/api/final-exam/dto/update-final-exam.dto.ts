import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDateString, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'
import { ExamStatus } from '@common/enums/exam-status.enum'

export class UpdateFinalExamDto {
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

  @ApiProperty({
    description: 'End time for the final exam',
    example: '2024-12-31T23:59:59.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  endTime?: string

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  questionSets?: string[]
}
