import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ReviewedExerciseEntity } from './reviewed-exercise.entity'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { User } from '@api/user/entities/user.entity'
import { AttemptStatus } from '@common/enums/attempt-status.enum'

@Entity('reviewed_exercise_submission')
export class ReviewedExerciseSubmissionEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_reviewed_exercise_submission_id' })
  reviewedExerciseSubmissionId: string

  @Column({ type: 'uuid', nullable: false })
  studentId: string

  @Column({ type: 'uuid', nullable: false })
  reviewedExerciseId: string

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
  answered: Record<string, any> | null

  @Column({ type: 'boolean', nullable: true })
  penalty: boolean | null

  @Column({ type: 'text', nullable: true })
  note: string | null

  @Column({ type: 'timestamptz', nullable: true })
  submittedAt: Date | null

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student: User

  @ManyToOne(() => ReviewedExerciseEntity, { nullable: false })
  @JoinColumn({ name: 'reviewed_exercise_id' })
  reviewedExercise: ReviewedExerciseEntity

  @ManyToOne(() => QuestionSetEntity, { nullable: false })
  @JoinColumn({ name: 'question_set_id' })
  questionSet: QuestionSetEntity
}
