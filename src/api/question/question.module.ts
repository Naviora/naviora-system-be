import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnswerEntity } from '@api/answer/entities/answer.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, AnswerEntity, LessonEntity])],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
