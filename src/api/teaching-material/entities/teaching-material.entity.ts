import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { MaterialEntity } from '@api/material/entities/material.entity'
import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('teaching_material')
export class TeachingMaterial extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_teaching_material_id' })
  teachingMaterialId: string

  @ManyToOne(() => MaterialEntity, (material) => material.teachingMaterials, { nullable: false })
  @JoinColumn({ name: 'material_id' })
  material: MaterialEntity

  @ManyToOne(() => LessonEntity, (lesson) => lesson.teachingMaterials, { nullable: false })
  @JoinColumn({ name: 'lesson_id' })
  lesson: LessonEntity

  lessonId: string

  @Column({ type: 'text', nullable: false })
  content: string
}
