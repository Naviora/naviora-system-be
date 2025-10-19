import { TeachingMaterial } from '@api/teaching-material/entities/teaching-material.entity'
import { MaterialType } from '@common/enums/material.enum'
import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('material')
export class MaterialEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_material_id' })
  materialId: string

  @Column({ type: 'uuid', nullable: false })
  lecturerId: string

  @Column({ type: 'varchar', nullable: false })
  materialName: string

  @Column({ type: 'enum', enum: MaterialType, nullable: false })
  materialType: MaterialType

  @Column({ type: 'varchar', nullable: false })
  materialPath: string

  @OneToMany(() => TeachingMaterial, (teachingMaterial) => teachingMaterial.material, { nullable: true })
  teachingMaterials: TeachingMaterial[]
}
