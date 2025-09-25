export type DatabaseConfig = {
  type: string
  host: string
  port: number
  password: string
  name: string
  username: string
  logging: boolean
  database: string
  synchronize: boolean
  maxConnections: number
  sslEnabled: boolean
  rejectUnauthorized: boolean
  // subscribers: string[]
  ca?: string
  key?: string
  cert?: string
  // migrations: string[]
  // migrationsTableName: string
}
