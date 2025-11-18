import { DataSource } from 'typeorm'
import { DatabaseSeederService } from '../src/database/seeds/database-seeder.service'
import { AppDataSource } from '../src/database/data-source'

async function runSeeder() {
  let dataSource: DataSource | null = null

  try {
    console.log('Initializing database connection...')
    dataSource = AppDataSource
    await dataSource.initialize()

    console.log('Database connection established successfully!')
    console.log('Starting database seeding...\n')

    const seederService = new DatabaseSeederService(dataSource)
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
