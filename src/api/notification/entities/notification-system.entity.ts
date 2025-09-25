import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsDateString } from 'class-validator'
import { Notifications } from '@common/enums/notifications-types.enum'
import { NotifyBody } from '@api/notification/dto/notifications-response.dto'

@Entity({ name: 'notifications' })
export class NotificationSystem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: Notifications })
  type: string

  @Column({ type: 'json', nullable: false })
  body: NotifyBody

  @Column({ default: false })
  status: boolean

  @IsDateString()
  @Column({ nullable: false })
  createdAt: string

  getBodyId(): string {
    return this.body?.id
  }

  getBodyMessage(): string {
    return this.body?.message
  }

  setBody(id: string, message: string): void {
    this.body = { id, message }
  }
}
