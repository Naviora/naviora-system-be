import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
