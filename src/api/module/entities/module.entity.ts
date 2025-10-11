import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Class } from '@api/class/entities/class.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'

@Entity('module')
export class ModuleEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_module_id' })
  moduleId: string

  @Column({ type: 'varchar', nullable: false })
  moduleCode: string

  @Column({ type: 'varchar', nullable: false })
  moduleName: string

  @Column({ type: 'varchar', nullable: true })
  moduleDescription: string

  @Column({ type: 'uuid', nullable: false })
  classId: string

  @ManyToOne(() => Class, (classEntity) => classEntity.modules)
  @JoinColumn({ name: 'classId' })
  class: Class

  @OneToMany(() => LessonEntity, (lesson) => lesson.module)
  lessons: LessonEntity[]
}
