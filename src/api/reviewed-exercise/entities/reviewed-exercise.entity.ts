import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { User } from '@api/user/entities/user.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'

@Entity('reviewed_exercise')
export class ReviewedExerciseEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_reviewed_exercise_id' })
  reviewedExerciseId: string

  @Column({ type: 'uuid', nullable: false })
  lessonId: string

  @Column({
    type: 'enum',
    enum: ExamStatus,
    default: ExamStatus.DRAFT,
    nullable: false
  })
  status: ExamStatus

  @Column({ type: 'timestamptz', nullable: false })
  startTime: Date

  @Column({ type: 'timestamptz', nullable: false })
  endTime: Date

  @Column({ type: 'uuid', nullable: false })
  lecturerId: string

  @ManyToOne(() => LessonEntity, { nullable: false })
  @JoinColumn({ name: 'lesson_id' })
  lesson: LessonEntity

  @ManyToMany(() => QuestionSetEntity, { cascade: false })
  @JoinTable({
    name: 'reviewed_exercise_question_set',
    joinColumn: {
      name: 'reviewed_exercise_id',
      referencedColumnName: 'reviewedExerciseId'
    },
    inverseJoinColumn: {
      name: 'question_set_id',
      referencedColumnName: 'questionSetId'
    }
  })
  questionSets: QuestionSetEntity[]

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'lecturer_id' })
  lecturer: User

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: User

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User | null
}
