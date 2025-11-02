import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FinalExamController } from './final-exam.controller'
import { FinalExamService } from './final-exam.service'
import { FinalExamEntity } from './entities/final-exam.entity'
import { FinalExamSubmissionEntity } from './entities/final-exam-submission.entity'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { AnswerEntity } from '@api/answer/entities/answer.entity'
import { User } from '@api/user/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      FinalExamEntity,
      FinalExamSubmissionEntity,
      QuestionSetEntity,
      QuestionEntity,
      AnswerEntity
    ])
  ],
  controllers: [FinalExamController],
  providers: [FinalExamService],
  exports: [FinalExamService]
})
export class FinalExamModule {}
