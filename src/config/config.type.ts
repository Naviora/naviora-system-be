import { OpenaiConfig } from '@api/openai/config/openai-config.type'
import { AppConfig } from '@config/app-config.type'
import { DatabaseConfig } from '@database/config/database-config.type'
import { MailConfig } from '@mail/config/mail-config.type'
import { RedisConfig } from '@redis/config/redis-config.type'

export type AllConfigType = {
  app: AppConfig
  database: DatabaseConfig
  redis: RedisConfig
  mail: MailConfig
  openai: OpenaiConfig
}
