import { ExamStatus } from '@common/enums/exam-status.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateReviewedExerciseDto {
  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  lessonId: string

  @ApiProperty({ enum: ExamStatus, default: ExamStatus.DRAFT })
  @IsOptional()
  status?: ExamStatus

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startTime: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  endTime: string

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  questionSets: string[]
}
