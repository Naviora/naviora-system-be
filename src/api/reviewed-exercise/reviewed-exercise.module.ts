import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewedExerciseController } from './reviewed-exercise.controller'
import { ReviewedExerciseService } from './reviewed-exercise.service'
import { ReviewedExerciseEntity } from './entities/reviewed-exercise.entity'
import { ReviewedExerciseSubmissionEntity } from './entities/reviewed-exercise-submission.entity'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { AnswerEntity } from '@api/answer/entities/answer.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { User } from '@api/user/entities/user.entity'
import { TeachingModule } from '@api/module/entities/teaching-module.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      LessonEntity,
      ReviewedExerciseEntity,
      ReviewedExerciseSubmissionEntity,
      QuestionSetEntity,
      QuestionEntity,
      AnswerEntity,
      TeachingModule,
      ClassEnrolment
    ])
  ],
  controllers: [ReviewedExerciseController],
  providers: [ReviewedExerciseService],
  exports: [ReviewedExerciseService]
})
export class ReviewedExerciseModule {}
