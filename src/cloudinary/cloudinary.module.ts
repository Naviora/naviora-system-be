import { Module } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { CloudinaryController } from './cloudinary.controller'
import { CloudinaryProvider } from './cloudinary.provider'

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryController, CloudinaryProvider],
  exports: [CloudinaryService, CloudinaryController, CloudinaryProvider]
})
export class CloudinaryModule {}
