import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, Index } from 'typeorm'
import { User } from '@api/user/entities/user.entity'

@Entity('streak')
@Unique('UQ_streak_student', ['studentId'])
@Index('IDX_streak_student_id', ['studentId'])
export class Streak extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_streak_id' })
  streakId: string

  @Column({ type: 'uuid', nullable: false, unique: true })
  studentId: string

  @Column({ type: 'integer', nullable: false, default: 0 })
  currentStreak: number

  @Column({ type: 'integer', nullable: false, default: 0 })
  longestStreak: number

  @Column({ type: 'timestamptz', nullable: false })
  lastActivityDate: Date

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student: User
}
