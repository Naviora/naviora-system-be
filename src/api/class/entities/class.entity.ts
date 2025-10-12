import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ClassType } from '@common/enums/class-types.enum'
import { TeachingAssignment } from './teaching-assignment.entity'
import { ModuleEntity } from '@api/module/entities/module.entity'

@Entity('class')
export class Class extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_class_id' })
  classId: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  classCode: string

  @Column({ type: 'varchar', nullable: false })
  className: string

  @Column({ type: 'enum', enum: ClassType, default: ClassType.CITY })
  classType: ClassType

  @Column({ type: 'date', nullable: false })
  startDate: Date

  @Column({ type: 'date', nullable: false })
  endDate: Date

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @OneToMany(() => TeachingAssignment, (teachingAssignment) => teachingAssignment.class)
  teachingAssignments: TeachingAssignment[]

  @OneToMany(() => ModuleEntity, (module) => module.class)
  modules: ModuleEntity[]

  /**
   * TODO: Add final_exam_id as the ManyToOne with the FinalExam entity
   *  */
}
