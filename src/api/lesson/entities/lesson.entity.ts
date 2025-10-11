import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { ModuleEntity } from '@api/module/entities/module.entity'

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
  @JoinColumn({ name: 'moduleId' })
  module: ModuleEntity
}
