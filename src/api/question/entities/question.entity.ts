import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { QuestionDifficulty, QuestionType } from '@common/enums/question.enum'
import { AnswerEntity } from '@api/answer/entities/answer.entity'

@Entity('question')
export class QuestionEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_question_id' })
  questionId: string

  @Column({ type: 'uuid', nullable: false, name: 'lesson_id' })
  lessonId: string

  @Column({ type: 'text', nullable: false })
  content: string

  @Column({ type: 'enum', enum: QuestionType, nullable: false })
  type: QuestionType

  @Column({ type: 'enum', enum: QuestionDifficulty, nullable: false })
  difficulty: QuestionDifficulty

  @Column({ type: 'text', nullable: true, name: 'additional_image' })
  additionalImage: string | null

  @Column({ type: 'uuid', nullable: false, name: 'correct_answer_id' })
  correctAnswerId: string

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[]
}
