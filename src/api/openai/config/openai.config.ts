import { registerAs } from '@nestjs/config'
import { OpenaiConfig } from '@api/openai/config/openai-config.type'
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import validateConfig from '@utils/validate-config'

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.OPEN_API_KEY)
  @IsString()
  @IsNotEmpty()
  OPEN_API_KEY: string
}

export default registerAs<OpenaiConfig>('openai', () => {
  console.info(`Register OpenaiConfig from environment variables`)
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    apiKey: process.env.OPEN_API_KEY
  }
})
