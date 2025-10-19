import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { ModuleEntity } from '@api/module/entities/module.entity'
import { TeachingMaterial } from '@api/teaching-material/entities/teaching-material.entity'

@Entity('lesson')
export class LessonEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_lesson_id' })
  lessonId: string

  @Column({ type: 'uuid', nullable: false })
  moduleId: string

  @Column({ type: 'varchar', nullable: false })
  lessonName: string

  @Column({ type: 'varchar', nullable: false })
  lessonDescription: string

  @ManyToOne(() => ModuleEntity, (module) => module.lessons)
  @JoinColumn({ name: 'module_id' })
  module: ModuleEntity

  @OneToMany(() => TeachingMaterial, (teachingMaterial) => teachingMaterial.lesson, { nullable: true })
  teachingMaterials: TeachingMaterial[]
}
