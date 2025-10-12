import { AbstractEntity } from '@database/entities/base.entity'
import { Entity, ManyToOne, JoinColumn, Column, Index, PrimaryGeneratedColumn } from 'typeorm'
import { ModuleEntity } from './module.entity'
import { User } from '@api/user/entities/user.entity'

@Entity('teaching_module')
@Index(['module', 'lecturer'], { unique: true })
export class TeachingModule extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_teaching_module_id' })
  id: string

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @Column({ type: 'date', nullable: true })
  endDate: Date

  @ManyToOne(() => ModuleEntity, (module) => module.teachingModules)
  @JoinColumn({ name: 'module_id' })
  module: ModuleEntity

  @ManyToOne(() => User, (user) => user.teachingModules)
  @JoinColumn({ name: 'lecturer_id' })
  lecturer: User
}
