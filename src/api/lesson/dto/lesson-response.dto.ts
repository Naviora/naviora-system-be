import { ApiProperty } from '@nestjs/swagger'
import { MaterialType } from '@common/enums/material.enum'
import { Exclude, Expose } from 'class-transformer'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { AttemptStatus } from '@common/enums/attempt-status.enum'

@Expose()
export class MaterialResponseDto {
  @ApiProperty()
  @Expose()
  materialId: string

  @ApiProperty()
  @Expose()
  lecturerId: string

  @ApiProperty()
  @Expose()
  materialName: string

  @ApiProperty({ enum: MaterialType })
  @Expose()
  materialType: MaterialType

  @ApiProperty()
  @Expose()
  materialPath: string

  @ApiProperty()
  @Exclude()
  createdAt: Date

  @ApiProperty()
  @Exclude()
  updatedAt: Date
}

@Expose()
export class QuestionSetSummaryDto {
  @ApiProperty()
  @Expose()
  questionSetId: string

  @ApiProperty()
  @Expose()
  title: string

  @ApiProperty({ nullable: true })
  @Expose()
  description: string | null
}

@Expose()
export class ReviewedExerciseSubmissionResponseDto {
  @ApiProperty()
  @Expose()
  reviewedExerciseSubmissionId: string

  @ApiProperty()
  @Expose()
  reviewedExerciseId: string

  @ApiProperty()
  @Expose()
  studentId: string

  @ApiProperty()
  @Expose()
  questionSetId: string

  @ApiProperty({ enum: AttemptStatus })
  @Expose()
  attemptStatus: AttemptStatus

  @ApiProperty({ nullable: true })
  @Expose()
  score: number | null

  @ApiProperty({ nullable: true })
  @Expose()
  submittedAt: Date | null

  @ApiProperty()
  @Expose()
  createdAt: Date

  @ApiProperty()
  @Expose()
  updatedAt: Date

  @ApiProperty({ type: () => QuestionSetSummaryDto, nullable: true })
  @Expose()
  questionSet?: QuestionSetSummaryDto | null
}

@Expose()
export class LessonResponseDto {
  @ApiProperty()
  @Expose()
  lessonId: string

  @ApiProperty()
  @Expose()
  moduleId: string

  @ApiProperty()
  @Expose()
  lessonName: string

  @ApiProperty()
  @Expose()
  lessonDescription: string

  @ApiProperty({ nullable: true })
  @Expose()
  lessonContent: string

  @ApiProperty({ nullable: true })
  @Expose()
  isCompleted: boolean | null

  @ApiProperty()
  @Expose()
  createdAt: Date

  @ApiProperty()
  @Expose()
  updatedAt: Date

  @ApiProperty({ type: [MaterialResponseDto] })
  @Expose()
  materials: MaterialResponseDto[]

  @ApiProperty({ type: () => [ReviewedExerciseResponseDto], required: false })
  @Expose()
  reviewedExercises?: ReviewedExerciseResponseDto[]
}

@Expose()
export class ReviewedExerciseResponseDto {
  @ApiProperty()
  @Expose()
  reviewedExerciseId: string

  @ApiProperty({ enum: ExamStatus })
  @Expose()
  status: ExamStatus

  @ApiProperty()
  @Expose()
  startTime: Date

  @ApiProperty()
  @Expose()
  endTime: Date

  @ApiProperty()
  @Expose()
  lecturerId: string

  @ApiProperty({ type: () => [QuestionSetSummaryDto], required: false })
  @Expose()
  questionSets?: QuestionSetSummaryDto[]

  @ApiProperty()
  @Expose()
  isSubmitted: boolean

  @ApiProperty({ type: () => [ReviewedExerciseSubmissionResponseDto], required: false })
  @Expose()
  studentSubmissions?: ReviewedExerciseSubmissionResponseDto[]
}
