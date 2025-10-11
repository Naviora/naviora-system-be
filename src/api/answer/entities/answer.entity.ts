import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('answer')
export class Answer extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_answer_id' })
  answerId: string

  @Column({ type: 'varchar', nullable: false })
  content: string

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean

  @Column({ type: 'varchar', nullable: true })
  additionalImage: string

  // @ManyToOne(() => Question, (question) => question.answers)
  // @JoinColumn({ name: 'question_id' })
  // question: Question
}
