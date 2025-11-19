import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Streak } from './entities/streak.entity'
import { User } from '@api/user/entities/user.entity'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { plainToInstance } from 'class-transformer'
import { StreakResponseDto } from './dto/streak-response.dto'

@Injectable()
export class StreakService {
  constructor(
    @InjectRepository(Streak)
    private readonly streakRepository: Repository<Streak>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  /**
   * Update streak for a student when they complete an activity
   * @param studentId - The ID of the student
   * @param activityDate - The date of the activity (defaults to now)
   * @returns Updated streak information
   */
  async updateStreak(studentId: string, activityDate?: Date): Promise<StreakResponseDto> {
    const now = activityDate || new Date()
    const today = this.getStartOfDay(now)

    // Verify student exists and is a student
    const student = await this.userRepository.findOne({
      where: { id: studentId },
      relations: ['role']
    })

    if (!student) {
      throw new ValidationException(ErrorCode.USER001, 'Không tìm thấy sinh viên', [
        { property: 'student_id', code: ErrorCode.USER001 }
      ])
    }

    if (student.role?.name !== RoleInAccount.Student) {
      throw new ValidationException(ErrorCode.USER002, 'Người dùng không phải sinh viên', [
        { property: 'student_id', code: ErrorCode.USER002 }
      ])
    }

    // Find or create streak record
    let streak = await this.streakRepository.findOne({
      where: { studentId }
    })

    if (!streak) {
      // Create new streak record
      streak = this.streakRepository.create({
        studentId,
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: today
      })
    } else {
      const lastActivityDate = this.getStartOfDay(streak.lastActivityDate)
      const daysDifference = this.getDaysDifference(lastActivityDate, today)

      if (daysDifference === 0) {
        // Same day - no update needed, just return current streak
        return this.mapToDto(streak)
      } else if (daysDifference === 1) {
        // Consecutive day - increment streak
        streak.currentStreak += 1
        streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak)
        streak.lastActivityDate = today
      } else {
        // Gap of more than 1 day - reset streak
        streak.currentStreak = 1
        streak.lastActivityDate = today
      }
    }

    const savedStreak = await this.streakRepository.save(streak)
    return this.mapToDto(savedStreak)
  }

  /**
   * Get streak information for a student
   * @param studentId - The ID of the student
   * @returns Streak information
   */
  async getStreakByStudentId(studentId: string): Promise<StreakResponseDto> {
    const streak = await this.streakRepository.findOne({
      where: { studentId }
    })

    if (!streak) {
      // Return default streak if not found
      return {
        streak_id: '',
        student_id: studentId,
        current_streak: 0,
        longest_streak: 0,
        last_activity_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }

    return this.mapToDto(streak)
  }

  /**
   * Get streak information for the current authenticated student
   * @param currentUser - The current authenticated user
   * @returns Streak information
   */
  async getMyStreak(currentUser: User): Promise<StreakResponseDto> {
    // if (currentUser.role?.name !== RoleInAccount.Student) {
    //   throw new ValidationException(ErrorCode.USER002, 'Chỉ sinh viên mới xem được streak của mình', [
    //     { property: 'role', code: ErrorCode.USER002 }
    //   ])
    // }

    return this.getStreakByStudentId(currentUser.id)
  }

  /**
   * Helper method to get start of day (midnight) in UTC
   */
  private getStartOfDay(date: Date): Date {
    const d = new Date(date)
    d.setUTCHours(0, 0, 0, 0)
    return d
  }

  /**
   * Helper method to calculate days difference between two dates
   */
  private getDaysDifference(date1: Date, date2: Date): number {
    const diffTime = date2.getTime() - date1.getTime()
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
  }

  /**
   * Map entity to DTO
   */
  private mapToDto(streak: Streak): StreakResponseDto {
    return plainToInstance(StreakResponseDto, {
      streak_id: streak.streakId,
      student_id: streak.studentId,
      current_streak: streak.currentStreak,
      longest_streak: streak.longestStreak,
      last_activity_date: streak.lastActivityDate.toISOString(),
      updated_at: streak.updatedAt.toISOString()
    })
  }
}
