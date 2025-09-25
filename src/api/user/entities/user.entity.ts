import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { Role } from '@api/role/entities/role.entity'
import { Exclude } from 'class-transformer'
import { AccountStatus, Gender } from '@common/enums/account-role.enum'
import { AbstractEntity } from '@database/entities/base.entity'

@Entity('user')
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
  id: string

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  @Index()
  email: string

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  password: string

  @Column({
    type: 'varchar',
    nullable: true,
    default: process.env.DEFAULT_AVATAR
  })
  avatar: string

  @Column({ type: 'varchar', nullable: true, unique: true })
  phone: string

  @Column({ type: 'varchar', nullable: true })
  address: string

  @Column({ type: 'enum', enum: Gender, default: Gender.Other, nullable: true })
  gender: string

  @Column({ type: 'date', nullable: true, default: null })
  dateOfBirth: Date

  @ManyToOne(() => Role, (role) => role.users, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role | null

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.Unactive,
    nullable: false
  })
  status: AccountStatus

  @Column({ type: 'boolean', default: false })
  deleted: boolean

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0, // Remove decimal
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'"
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0, // Remove decimal
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'",
    onUpdate: "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'"
  })
  updatedAt: Date

  @Column({ type: 'varchar', nullable: true })
  title: string
}
