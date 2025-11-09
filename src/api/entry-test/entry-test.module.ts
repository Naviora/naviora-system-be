import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntryTestController } from './entry-test.controller'
import { EntryTestService } from './entry-test.service'
import { EntryTestEntity } from './entities/entry-test.entity'
import { EntryTestSubmissionEntity } from './entities/entry-test-submission.entity'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { AnswerEntity } from '@api/answer/entities/answer.entity'
import { User } from '@api/user/entities/user.entity'
import { StreakModule } from '@api/streak/streak.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      EntryTestEntity,
      EntryTestSubmissionEntity,
      QuestionSetEntity,
      QuestionEntity,
      AnswerEntity
    ]),
    StreakModule
  ],
  controllers: [EntryTestController],
  providers: [EntryTestService],
  exports: [EntryTestService]
})
export class EntryTestModule {}
