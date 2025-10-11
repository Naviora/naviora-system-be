import { Module } from '@nestjs/common'
import { LessonService } from './lesson.service'
import { LessonController } from './lesson.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { ModuleEntity } from '@api/module/entities/module.entity'

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity, ModuleEntity])],
  controllers: [LessonController],
  providers: [LessonService]
})
export class LessonModule {}
