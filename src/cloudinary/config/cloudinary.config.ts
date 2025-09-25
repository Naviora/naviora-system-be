import { CloudinaryConfig } from '@cloudinary/config/cloudinary-config.type'
import { registerAs } from '@nestjs/config'
import validateConfig from '@utils/validate-config'
import { IsNotEmpty, IsString } from 'class-validator'

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  CLD_CLOUD_NAME: string

  @IsString()
  @IsNotEmpty()
  CLD_API_KEY: string

  @IsString()
  @IsNotEmpty()
  CLD_API_SECRET: string

  @IsString()
  @IsNotEmpty()
  DEFAULT_AVATAR: string
}

export default registerAs<CloudinaryConfig>('cloudinary', () => {
  console.info(`Register CloudinaryConfig from environment variables`)
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    cloudName: process.env.CLD_CLOUD_NAME,
    apiKey: process.env.CLD_API_KEY,
    apiSecret: process.env.CLD_API_SECRET,
    defaultAvatar: process.env.DEFAULT_AVATAR
  }
})
