import { getOrder, Order } from '@database/decorators/order.decorator'
import { plainToInstance } from 'class-transformer'
import { BaseEntity, CreateDateColumn, DataSource, DeleteDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

export abstract class AbstractEntity extends BaseEntity {
  @Order(9999)
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false
  })
  createdAt: Date

  // @Order(9999)
  // @Column({
  //   type: 'varchar',
  //   nullable: false
  // })
  // createdBy: string

  @Order(9999)
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false
  })
  updatedAt: Date

  @Order(9999)
  @DeleteDateColumn({
    type: 'timestamptz'
  })
  deletedAt: Date

  // @Order(9999)
  // @Column({
  //   type: 'varchar',
  //   nullable: false
  // })
  // deletedBy: string

  @Order(9999)
  @VersionColumn({
    type: 'int',
    default: 1
  })
  version: number

  toDto<Dto>(dtoClass: new () => Dto): Dto {
    return plainToInstance(dtoClass, this)
  }

  static useDataSource(dataSource: DataSource) {
    BaseEntity.useDataSource.call(this, dataSource)
    const meta = dataSource.entityMetadatasMap.get(this)
    if (meta != null) {
      // reorder columns here
      meta.columns = [...meta.columns].sort((x, y) => {
        const orderX = getOrder((x.target as any)?.prototype, x.propertyName)
        const orderY = getOrder((y.target as any)?.prototype, y.propertyName)
        return orderX - orderY
      })
    }
  }
}
