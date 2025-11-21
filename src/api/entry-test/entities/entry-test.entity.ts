import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { User } from '@api/user/entities/user.entity'

@Entity('entry_test')
export class EntryTestEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_entry_test_id' })
  entryTestId: string

  @Column({ type: 'varchar', nullable: false })
  title: string

  @Column({ type: 'text', nullable: true })
  description: string | null

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

  @ManyToMany(() => QuestionSetEntity, { cascade: false })
  @JoinTable({
    name: 'entry_test_question_set',
    joinColumn: {
      name: 'entry_test_id',
      referencedColumnName: 'entryTestId'
    },
    inverseJoinColumn: {
      name: 'question_set_id',
      referencedColumnName: 'questionSetId'
    }
  })
  questionSets: QuestionSetEntity[]

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User | null
}
