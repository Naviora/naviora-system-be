import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, OneToMany } from 'typeorm'
import { Role } from '@api/role/entities/role.entity'
import { Exclude } from 'class-transformer'
import { AccountStatus, Gender } from '@common/enums/account-role.enum'
import { AbstractEntity } from '@database/entities/base.entity'
import { SessionEntity } from '@api/user/entities/session.entity'
import { TeachingAssignment } from '@api/class/entities/teaching-assignment.entity'
import { TeachingModule } from '@api/module/entities/teaching-module.entity'

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

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions?: SessionEntity[]

  @OneToMany(() => TeachingAssignment, (teachingAssignment) => teachingAssignment.lecturer)
  teachingAssignments?: TeachingAssignment[]

  @OneToMany(() => TeachingModule, (teachingModule) => teachingModule.lecturer)
  teachingModules?: TeachingModule[]

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.Unactive,
    nullable: false
  })
  status: AccountStatus

  @Column({ type: 'varchar', nullable: true, unique: true })
  officePhoneNumber: string

  @Column({ type: 'int', nullable: true })
  point: number

  @Column({ type: 'varchar', nullable: true, unique: true })
  username: string

  @Column({ type: 'boolean', nullable: false, default: false })
  hasParticipatedEntryTest: boolean
}
