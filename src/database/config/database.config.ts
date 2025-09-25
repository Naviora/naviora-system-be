import validateConfig from '@utils/validate-config'
import { registerAs } from '@nestjs/config'
import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, Max, Min, ValidateIf } from 'class-validator'
import { DatabaseConfig } from './database-config.type'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.DATABASE_URL)
  @IsString()
  DATABASE_URL: string

  @ValidateIf((envValues) => !envValues.DATABASE_TYPE)
  @IsString()
  DATABASE_TYPE: string

  @ValidateIf((envValues) => !envValues.DATABASE_HOST)
  @IsString()
  DATABASE_HOST: string

  @ValidateIf((envValues) => !envValues.DATABASE_PORT)
  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number

  @ValidateIf((envValues) => !envValues.DATABASE_PASSWORD)
  @IsString()
  DATABASE_PASSWORD: string

  @ValidateIf((envValues) => !envValues.DATABASE_NAME)
  @IsString()
  DATABASE_NAME: string

  @ValidateIf((envValues) => !envValues.DATABASE_USERNAME)
  @IsString()
  DATABASE_USERNAME: string

  @IsBoolean()
  @IsOptional()
  DATABASE_LOGGING: boolean

  @IsBoolean()
  @IsOptional()
  DATABASE_SYNCHRONIZE: boolean

  @IsInt()
  @IsPositive()
  @IsOptional()
  DATABASE_MAX_CONNECTIONS: number

  @IsBoolean()
  @IsOptional()
  DATABASE_SSL_ENABLED: boolean

  @IsBoolean()
  @IsOptional()
  DATABASE_REJECT_UNAUTHORIZED: boolean

  @IsString()
  @IsOptional()
  DATABASE_CA: string

  @IsString()
  @IsOptional()
  DATABASE_KEY: string

  @IsString()
  @IsOptional()
  DATABASE_CERT: string
}

export default registerAs<DatabaseConfig>('database', () => {
  console.info(`Register DatabaseConfig from environment variables`)
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    type: process.env.DATABASE_TYPE,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    logging: process.env.DATABASE_LOGGING === 'true',
    // synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    synchronize: false,
    maxConnections: process.env.DATABASE_MAX_CONNECTIONS ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) : 100,
    sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
    namingStrategy: new SnakeNamingStrategy(),
    rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true'
  }
})
