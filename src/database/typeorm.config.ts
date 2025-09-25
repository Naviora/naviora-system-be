import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DatabaseConfig } from '@database/config/database-config.type'

config()

const configService = new ConfigService()
const databaseEnv = configService.get<DatabaseConfig>('database', { infer: true })

console.log(databaseEnv.host)

export default new DataSource({
  type: 'postgres',
  host: 'host.docker.internal',
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [`${__dirname}/../**/*.entities{.ts,.js}`],
  subscribers: [`${__dirname}/../middlewares/subscribers/*{.ts,.js}`],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations'
})
