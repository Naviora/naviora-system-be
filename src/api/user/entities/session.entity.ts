import { Uuid } from '@common/types/common.type'
import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity('session')
export class SessionEntity extends AbstractEntity {
  constructor(data?: Partial<SessionEntity>) {
    super()
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_session_id'
  })
  id!: Uuid

  @Column({
    type: 'varchar',
    length: 255
  })
  hash!: string

  @Column({
    type: 'uuid'
  })
  userId: Uuid

  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_session_user'
  })
  @ManyToOne(() => User, (user) => user.sessions)
  user!: User
}
