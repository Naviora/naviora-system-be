import { AbstractEntity } from '@database/entities/base.entity'
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, Index } from 'typeorm'
import { Class } from './class.entity'
import { User } from '@api/user/entities/user.entity'

@Entity('teaching_assignment')
@Index(['lecturer', 'class'], { unique: true })
export class TeachingAssignment extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'teaching_assignment_id' })
  id: string

  @ManyToOne(() => User, (user) => user.teachingAssignments, { nullable: false })
  @JoinColumn({ name: 'lecturer_id' })
  lecturer: User

  @ManyToOne(() => Class, (classEntity) => classEntity.teachingAssignments, { nullable: false })
  @JoinColumn({ name: 'class_id' })
  class: Class

  @Column({ type: 'boolean', default: true })
  isActive: boolean
}
