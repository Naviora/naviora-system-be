import { Module } from '@nestjs/common'
import { LessonService } from './lesson.service'
import { LessonController } from './lesson.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { ModuleEntity } from '@api/module/entities/module.entity'
import { TeachingMaterial } from '@api/teaching-material/entities/teaching-material.entity'

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity, ModuleEntity, TeachingMaterial])],
  controllers: [LessonController],
  providers: [LessonService]
})
export class LessonModule {}
