import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Class } from '@api/class/entities/class.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { TeachingModule } from './teaching-module.entity'

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

  @Column({ type: 'varchar', nullable: true })
  banner: string

  @Column({ type: 'uuid', nullable: false })
  classId: string

  @ManyToOne(() => Class, (classEntity) => classEntity.modules, { nullable: true })
  @JoinColumn({ name: 'class_id' })
  class: Class

  @OneToMany(() => LessonEntity, (lesson) => lesson.module, { nullable: true })
  lessons: LessonEntity[]

  @OneToMany(() => TeachingModule, (teachingModule) => teachingModule.module)
  teachingModules: TeachingModule[]
}
