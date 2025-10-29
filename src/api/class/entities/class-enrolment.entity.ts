import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Class } from './class.entity'
import { User } from '@api/user/entities/user.entity'

@Entity('class_enrolment')
export class ClassEnrolment extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_class_enrolment_id' })
  classEnrolmentId: string

  @Column({ type: 'uuid', nullable: false })
  studentId: string

  @Column({ type: 'uuid', nullable: false })
  classId: string

  @Column({ type: 'timestamptz', nullable: false })
  enrolmentDate: Date

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student: User

  @ManyToOne(() => Class, { nullable: false })
  @JoinColumn({ name: 'class_id' })
  class: Class
}
