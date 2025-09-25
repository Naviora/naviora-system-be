import { CloudinaryConfig } from '@cloudinary/config/cloudinary-config.type'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { v2 as cloudinary } from 'cloudinary'

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    console.info(`Register CloudinaryProvider from environment variables`)
    const cloudinaryEnv = configService.get<CloudinaryConfig>('cloudinary')
    return cloudinary.config({
      cloud_name: cloudinaryEnv.cloudName,
      api_key: cloudinaryEnv.apiKey,
      api_secret: cloudinaryEnv.apiSecret
    })
  },
  inject: [ConfigService]
}
