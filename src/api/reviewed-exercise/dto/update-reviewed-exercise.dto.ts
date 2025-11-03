import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDateString, IsOptional, IsUUID } from 'class-validator'
import { ExamStatus } from '@common/enums/exam-status.enum'

export class UpdateReviewedExerciseDto {
  @ApiProperty({ enum: ExamStatus, required: false })
  @IsOptional()
  status?: ExamStatus

  @ApiProperty({
    description: 'Start time for the reviewed exercise',
    example: '2024-12-31T23:59:59.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  startTime?: string

  @ApiProperty({
    description: 'End time for the reviewed exercise',
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
