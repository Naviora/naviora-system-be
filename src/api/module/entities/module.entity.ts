import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('module')
export class ModuleEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_module_id' })
  moduleId: string

  @Column({ type: 'varchar', nullable: false })
  moduleCode: string

  @Column({ type: 'varchar', nullable: false })
  moduleName: string

  @Column({ type: 'varchar', nullable: true })
  moduleDescription: string

  /**
   * TODO: Add classId as the ManyToOne relationship with Class
   */
}
