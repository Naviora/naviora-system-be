import { AbstractEntity } from '@database/entities/base.entity'
import { Column, PrimaryGeneratedColumn } from 'typeorm'

export class Lesson extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_lesson_id' })
  lesson_id: string

  @Column({ type: 'uuid', nullable: false })
  module_id: string

  @Column({ type: 'varchar', nullable: false })
  lesson_name: string

  @Column({ type: 'varchar', nullable: false })
  lesson_description: string
}
