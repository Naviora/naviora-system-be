import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Class } from '@api/class/entities/class.entity'
import { User } from '@api/user/entities/user.entity'

@Entity('meeting_events')
export class MeetingEventEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_meeting_events_id' })
  meetingEventsId: string

  @Column({ type: 'uuid', nullable: false })
  classId: string

  @Column({ type: 'uuid', nullable: false })
  hostBy: string

  @Column({ type: 'jsonb', nullable: true })
  invitee: string[] | null

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string

  @Column({ type: 'text', nullable: true })
  description: string | null

  @Column({ type: 'text', nullable: true })
  note: string | null

  @Column({ type: 'timestamptz', nullable: false })
  startTime: Date

  @Column({ type: 'timestamptz', nullable: false })
  endTime: Date

  @ManyToOne(() => Class, { nullable: false })
  @JoinColumn({ name: 'class_id' })
  class: Class

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'host_by' })
  host: User
}
