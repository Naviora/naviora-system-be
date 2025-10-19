import { Module } from '@nestjs/common'
import { MaterialService } from './material.service'
import { MaterialController } from './material.controller'
import { MaterialEntity } from '@api/material/entities/material.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuleEntity } from '@api/module/entities/module.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MaterialEntity, ModuleEntity])],
  controllers: [MaterialController],
  providers: [MaterialService]
})
export class MaterialModule {}
