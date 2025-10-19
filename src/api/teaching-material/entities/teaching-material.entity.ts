import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('teaching_material')
export class TeachingMaterial extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_teaching_material_id' })
  teachingMaterialId: string

  @Column({ type: 'uuid', nullable: false })
  materialId: string

  @Column({ type: 'uuid', nullable: false })
  lessonId: string

  @Column({ type: 'text', nullable: false })
  content: string
}
