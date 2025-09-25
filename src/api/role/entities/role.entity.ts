import { User } from '@api/user/entities/user.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean

  @Column({ type: 'text', default: '' }) // Lưu permissions dưới dạng chuỗi
  permissions: string

  @Column({ type: 'boolean', nullable: false, default: false })
  deleted: boolean

  @OneToMany(() => User, (user) => user.role)
  users: User[]

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0, // Loại bỏ phần thập phân của giây
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Bangkok'",
    nullable: false
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0, // Loại bỏ phần thập phân của giây
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Bangkok'",
    nullable: false,
    onUpdate: "CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Bangkok'"
  })
  updatedAt: Date
}
