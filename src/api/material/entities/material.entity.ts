import { AbstractEntity } from '@database/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum MaterialType {
  VIDEO = 'video',
  PDF = 'pdf',
  DOCUMENT = 'document',
  IMAGE = 'image',
  AUDIO = 'audio',
  OTHER = 'other'
}

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
}
