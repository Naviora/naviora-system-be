import { DataSource } from 'typeorm'
import { AppDataSource } from '../src/database/data-source'

type SeederServiceConstructor = new (dataSource: DataSource) => { seed(): Promise<void> }

async function resolveSeeder(nodeEnv: string): Promise<SeederServiceConstructor> {
  if (nodeEnv === 'production') {
    const { DatabaseSeederService } = await import('@database-prod/database-seeder.service')
    return DatabaseSeederService
  }

  const { DatabaseSeederService } = await import('@database/seeds/database-seeder.service')
  return DatabaseSeederService
}

async function runSeeder() {
  let dataSource: DataSource | null = null

  try {
    const nodeEnv = process.env.NODE_ENV ?? 'development'
    console.log(`Seeder running with NODE_ENV=${nodeEnv}`)
    console.log(`Initializing database connection...`)
    dataSource = AppDataSource
    await dataSource.initialize()

    console.log('Database connection established successfully!')
    console.log('Starting database seeding...\n')

    const SeederService = await resolveSeeder(nodeEnv)
    const seederService = new SeederService(dataSource)
    await seederService.seed()

    console.log('\n✅ Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error during database seeding:', error)
    process.exit(1)
  } finally {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy()
      console.log('Database connection closed.')
    }
  }
}

// Run the seeder
runSeeder()
