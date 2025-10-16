import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuestionSetEntity } from './entities/question-set.entity'
import { QuestionSetService } from './question-set.service'
import { QuestionSetController } from './question-set.controller'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { User } from '@api/user/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([QuestionSetEntity, QuestionEntity, User])],
  controllers: [QuestionSetController],
  providers: [QuestionSetService]
})
export class QuestionSetModule {}
