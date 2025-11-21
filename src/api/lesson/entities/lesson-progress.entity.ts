import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { User } from '@api/user/entities/user.entity'

@Entity('lesson_progress')
@Unique('UQ_lesson_progress_student_lesson', ['studentId', 'lessonId'])
export class LessonProgress extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_lesson_progress_id' })
  lessonProgressId: string

  @Column({ type: 'uuid', nullable: false })
  studentId: string

  @Column({ type: 'uuid', nullable: false })
  lessonId: string

  @Column({ type: 'timestamptz', nullable: true })
  completedAt: Date | null

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student: User

  @ManyToOne(() => LessonEntity, { nullable: false })
  @JoinColumn({ name: 'lesson_id' })
  lesson: LessonEntity
}
