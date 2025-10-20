import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntryTestController } from './entry-test.controller'
import { EntryTestService } from './entry-test.service'
import { EntryTestEntity } from './entities/entry-test.entity'
import { EntryTestSubmissionEntity } from './entities/entry-test-submission.entity'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'

@Module({
  imports: [TypeOrmModule.forFeature([EntryTestEntity, EntryTestSubmissionEntity, QuestionSetEntity])],
  controllers: [EntryTestController],
  providers: [EntryTestService],
  exports: [EntryTestService]
})
export class EntryTestModule {}
