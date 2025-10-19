import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { EntryTestEntity } from './entry-test.entity'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { User } from '@api/user/entities/user.entity'
import { AttemptStatus } from '@common/enums/attempt-status.enum'

@Entity('entry_test_submission')
export class EntryTestSubmissionEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_entry_test_submission_id' })
  entryTestSubmissionId: string

  @Column({ type: 'uuid', nullable: false })
  studentId: string

  @Column({ type: 'uuid', nullable: false })
  entryTestId: string

  @Column({ type: 'uuid', nullable: false })
  questionSetId: string

  @Column({
    type: 'enum',
    enum: AttemptStatus,
    default: AttemptStatus.IN_PROGRESS,
    nullable: false
  })
  attemptStatus: AttemptStatus

  @Column({ type: 'integer', nullable: true })
  score: number | null

  @Column({ type: 'jsonb', nullable: true })
  answered: any

  @Column({ type: 'boolean', nullable: true })
  penalty: boolean | null

  @Column({ type: 'text', nullable: true })
  note: string | null

  @Column({ type: 'timestamptz', nullable: true })
  submittedAt: Date | null

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student: User

  @ManyToOne(() => EntryTestEntity, { nullable: false })
  @JoinColumn({ name: 'entry_test_id' })
  entryTest: EntryTestEntity

  @ManyToOne(() => QuestionSetEntity, { nullable: false })
  @JoinColumn({ name: 'question_set_id' })
  questionSet: QuestionSetEntity
}
