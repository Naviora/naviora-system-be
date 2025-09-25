import { AppConfig } from '@config/app-config.type'
import { registerAs } from '@nestjs/config'
import validateConfig from '@utils/validate-config'
import { IsInt, IsString, ValidateIf } from 'class-validator'

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.NODE_ENV)
  @IsString()
  NODE_ENV: string

  @ValidateIf((envValues) => !envValues.APP_PORT)
  @IsInt()
  APP_PORT: number

  @ValidateIf((envValues) => !envValues.API_PREFIX)
  @IsString()
  API_PREFIX: string

  @ValidateIf((envValues) => !envValues.APP_DEBUG)
  @IsString()
  APP_DEBUG: boolean

  @ValidateIf((envValues) => !envValues.API_DOCS_USERNAME)
  @IsString()
  API_DOCS_USERNAME: string

  @ValidateIf((envValues) => !envValues.API_DOCS_PASSWORD)
  @IsString()
  API_DOCS_PASSWORD: string

  @ValidateIf((envValues) => !envValues.SOCKET_PORT)
  @IsInt()
  SOCKET_PORT: number

  @ValidateIf((envValues) => !envValues.APP_CORS_ORIGIN)
  @IsString()
  APP_CORS_ORIGIN: string
}

export default registerAs<AppConfig>('app', () => {
  console.info(`Register AppConfig from environment variables`)
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    environment: process.env.NODE_ENV,
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000,
    debug: false,
    apiPrefix: process.env.API_PREFIX,
    apiDocsUsername: process.env.API_DOCS_USERNAME,
    apiDocsPassword: process.env.API_DOCS_PASSWORD,
    socketPort: process.env.SOCKET_PORT ? parseInt(process.env.SOCKET_PORT, 10) : 3332,
    corsOrigin: process.env.APP_CORS_ORIGIN
  }
})
