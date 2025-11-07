import { ApiProperty } from '@nestjs/swagger'
import { MaterialType } from '@common/enums/material.enum'
import { Exclude, Expose } from 'class-transformer'
import { ExamStatus } from '@common/enums/exam-status.enum'

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
}
