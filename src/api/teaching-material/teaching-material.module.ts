import { Module } from '@nestjs/common'
import { TeachingMaterialService } from './teaching-material.service'
import { TeachingMaterialController } from './teaching-material.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TeachingMaterial } from '@api/teaching-material/entities/teaching-material.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { MaterialEntity } from '@api/material/entities/material.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TeachingMaterial, LessonEntity, MaterialEntity])],
  controllers: [TeachingMaterialController],
  providers: [TeachingMaterialService]
})
export class TeachingMaterialModule {}
