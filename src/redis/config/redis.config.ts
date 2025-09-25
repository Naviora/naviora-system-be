import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator'
import validateConfig from '../../utils/validate-config'
import { RedisConfig } from './redis-config.type'
import { registerAs } from '@nestjs/config'

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  REDIS_HOST: string

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  REDIS_PORT: number
}

export default registerAs<RedisConfig>('redis', () => {
  console.info(`Register RedisConfig from environment variables`)
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379
  }
})
