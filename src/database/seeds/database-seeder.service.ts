import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { User } from '@api/user/entities/user.entity'
import { Role } from '@api/role/entities/role.entity'
import { RoleInAccounts } from './role-seed-data'
import { accountStatuses } from './account-seed-data'
import * as bcrypt from 'bcrypt'
import { hashString } from '@utils/auth.util'

export class DatabaseSeederService {
  private readonly logger = new Logger(DatabaseSeederService.name)

  constructor(private readonly dataSource: DataSource) {}

  async seed(): Promise<void> {
    try {
      this.logger.log('Starting database seeding...')

      // Seed roles first
      await this.seedRoles()

      // Seed users
      await this.seedUsers()

      this.logger.log('Database seeding completed successfully!')
    } catch (error) {
      this.logger.error('Error during database seeding:', error)
      throw error
    }
  }

  private async seedRoles(): Promise<void> {
    this.logger.log('Seeding roles...')

    for (const roleData of RoleInAccounts) {
      const existingRole = await this.dataSource.getRepository(Role).findOne({
        where: { name: roleData.name }
      })

      if (!existingRole) {
        const role = this.dataSource.getRepository(Role).create({
          name: roleData.name,
          description: roleData.description,
          permissions: roleData.permissions,
          isActive: true,
          deleted: false
        })

        await this.dataSource.getRepository(Role).save(role)
        this.logger.log(`Created role: ${roleData.name}`)
      } else {
        this.logger.log(`Role already exists: ${roleData.name}`)
      }
    }
  }

  private async seedUsers(): Promise<void> {
    this.logger.log('Seeding users...')

    for (const userData of accountStatuses) {
      const existingUser = await this.dataSource.getRepository(User).findOne({
        where: { email: userData.email }
      })

      if (!existingUser) {
        // Find the role
        const role = await this.dataSource.getRepository(Role).findOne({
          where: { name: userData.role }
        })

        if (!role) {
          this.logger.warn(`Role not found: ${userData.role}`)
          continue
        }

        // Hash password if provided
        let hashedPassword = null
        if (userData.password) {
          hashedPassword = await hashString(userData.password)
        }

        const user = this.dataSource.getRepository(User).create({
          name: userData.name || 'Default User',
          email: userData.email,
          password: hashedPassword || 'defaultPassword',
          phone: userData.phone,
          address: userData.address,
          gender: userData.gender,
          dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null,
          role: role,
          status: userData.status
        })

        await this.dataSource.getRepository(User).save(user)
        this.logger.log(`Created user: ${userData.email}`)
      } else {
        this.logger.log(`User already exists: ${userData.email}`)
      }
    }
  }
}
