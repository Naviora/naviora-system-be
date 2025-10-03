import { User } from '@api/user/entities/user.entity'
import { AbstractEntity } from '@database/entities/base.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity({ name: 'role' })
export class Role extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean

  @Column({ type: 'text', default: '' })
  permissions: string

  // TODO: Disscussion about the relationship between role and user (one user can have multiple roles)
  @OneToMany(() => User, (user) => user.role)
  users: User[]
}
