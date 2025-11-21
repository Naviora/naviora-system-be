import { QuestionEntity } from '@api/question/entities/question.entity'
import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('answer')
export class AnswerEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_answer_id' })
  answerId: string

  @Column({ type: 'varchar', nullable: false })
  content: string

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean

  @Column({ type: 'varchar', nullable: true })
  additionalImage: string

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity
}
