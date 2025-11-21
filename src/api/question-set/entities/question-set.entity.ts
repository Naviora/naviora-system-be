import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '@api/user/entities/user.entity'

@Entity('question_set')
export class QuestionSetEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_question_set_id' })
  questionSetId: string

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'lecturer_id' })
  lecturer: User

  @Column({ type: 'varchar', nullable: false })
  title: string

  @Column({ type: 'text', nullable: true })
  description: string | null

  @Column({ type: 'jsonb', nullable: false })
  questions: string[]

  @Column({ type: 'jsonb', nullable: false })
  config: Record<string, any>

  @Column({ type: 'boolean', nullable: false, default: false })
  isInUse: boolean

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User | null
}
