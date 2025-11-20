import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@api/user/entities/user.entity'
import { Role } from '@api/role/entities/role.entity'
import { UserStatisticsResponseDto, UserCountByRoleDto, UserCountByMonthDto } from './dto/user-statistics-response.dto'

@Injectable()
export class AdminStatisticsService {
  private readonly logger = new Logger(AdminStatisticsService.name)

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  /**
   * Get total number of users in the system (including deleted)
   */
  async getTotalUsers(): Promise<number> {
    return await this.userRepository.count({
      withDeleted: true
    })
  }

  /**
   * Get total number of active users (not deleted)
   */
  async getActiveUsers(): Promise<number> {
    return await this.userRepository.createQueryBuilder('user').where('user.deletedAt IS NULL').getCount()
  }

  /**
   * Get total number of inactive users (deleted)
   */
  async getInactiveUsers(): Promise<number> {
    return await this.userRepository
      .createQueryBuilder('user')
      .withDeleted()
      .where('user.deletedAt IS NOT NULL')
      .getCount()
  }

  /**
   * Calculate the ratio between active and inactive users
   */
  async getActiveToInactiveRatio(): Promise<number> {
    const activeUsers = await this.getActiveUsers()
    const inactiveUsers = await this.getInactiveUsers()

    if (inactiveUsers === 0) {
      return activeUsers > 0 ? Infinity : 0
    }

    if (activeUsers === 0) {
      return 0
    }

    return Number((activeUsers / inactiveUsers).toFixed(2))
  }

  /**
   * Get user count by month in the current year
   */
  async getUsersByMonth(): Promise<UserCountByMonthDto[]> {
    const currentYear = new Date().getFullYear()
    const startOfYear = new Date(currentYear, 0, 1)
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999)

    const results = await this.userRepository
      .createQueryBuilder('user')
      .select('EXTRACT(MONTH FROM user.createdAt)', 'month')
      .addSelect('COUNT(user.id)', 'count')
      .where('user.createdAt >= :startOfYear', { startOfYear })
      .andWhere('user.createdAt <= :endOfYear', { endOfYear })
      .groupBy('EXTRACT(MONTH FROM user.createdAt)')
      .orderBy('EXTRACT(MONTH FROM user.createdAt)', 'ASC')
      .getRawMany()

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    // Initialize all months with 0 count
    const usersByMonth: UserCountByMonthDto[] = monthNames.map((name, index) => ({
      month: index + 1,
      monthName: name,
      count: 0
    }))

    // Fill in the actual counts from the query results
    results.forEach((result) => {
      const month = parseInt(result.month)
      if (month >= 1 && month <= 12) {
        usersByMonth[month - 1].count = parseInt(result.count)
      }
    })

    return usersByMonth
  }

  /**
   * Get user count by role
   */
  async getUsersByRole(): Promise<UserCountByRoleDto[]> {
    // Get users with roles
    const resultsWithRoles = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .select('role.name', 'roleName')
      .addSelect('COUNT(user.id)', 'count')
      .where('user.deletedAt IS NULL')
      .andWhere('role.name IS NOT NULL')
      .groupBy('role.name')
      .orderBy('COUNT(user.id)', 'DESC')
      .getRawMany()

    // Get users without roles
    const usersWithoutRole = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .where('user.deletedAt IS NULL')
      .andWhere('role.id IS NULL')
      .getCount()

    const usersByRole: UserCountByRoleDto[] = resultsWithRoles.map((result) => ({
      roleName: result.roleName,
      count: parseInt(result.count)
    }))

    // Add users without roles if any
    if (usersWithoutRole > 0) {
      usersByRole.push({
        roleName: 'No Role',
        count: usersWithoutRole
      })
    }

    return usersByRole
  }

  /**
   * Get all user statistics
   */
  async getAllUserStatistics(): Promise<UserStatisticsResponseDto> {
    const [totalUsers, activeUsers, inactiveUsers, activeToInactiveRatio, usersByMonth, usersByRole] =
      await Promise.all([
        this.getTotalUsers(),
        this.getActiveUsers(),
        this.getInactiveUsers(),
        this.getActiveToInactiveRatio(),
        this.getUsersByMonth(),
        this.getUsersByRole()
      ])

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      activeToInactiveRatio,
      usersByMonth,
      usersByRole
    }
  }
}
