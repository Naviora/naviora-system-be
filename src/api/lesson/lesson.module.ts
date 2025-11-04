import { Module } from '@nestjs/common'
import { LessonService } from './lesson.service'
import { LessonController } from './lesson.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { ModuleEntity } from '@api/module/entities/module.entity'
import { TeachingMaterial } from '@api/teaching-material/entities/teaching-material.entity'
import { MaterialEntity } from '@api/material/entities/material.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonEntity, ModuleEntity, TeachingMaterial, MaterialEntity, ClassEnrolment])
  ],
  controllers: [LessonController],
  providers: [LessonService]
})
export class LessonModule {}
