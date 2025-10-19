import { Module } from '@nestjs/common'
import { MaterialService } from './material.service'
import { MaterialController } from './material.controller'
import { MaterialEntity } from '@api/material/entities/material.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MaterialUploadService } from './material-upload.service'
import { CloudinaryModule } from '@cloudinary/cloudinary.module'
import { TeachingMaterial } from '@api/teaching-material/entities/teaching-material.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MaterialEntity, TeachingMaterial]), CloudinaryModule],
  controllers: [MaterialController],
  providers: [MaterialService, MaterialUploadService],
  exports: [MaterialService, MaterialUploadService]
})
export class MaterialModule {}
