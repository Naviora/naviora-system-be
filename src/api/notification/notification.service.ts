import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { NotificationGateway } from './notification-gateway'
import { NotificationSystem } from '@api/notification/entities/notification-system.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@api/user/entities/user.entity'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { ListNotificationReqDto } from '@api/notification/dto/list-notification.req.dto'
import { paginate } from '@utils/offset-pagination'

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationSystem)
    private readonly notificationRepository: Repository<NotificationSystem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(userId: string, reqDto: ListNotificationReqDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId }
      })

      if (!user) {
        throw new ValidationException(ErrorCode.S001)
      }

      const query = this.notificationRepository
        .createQueryBuilder('notifications')
        .where('notifications.targetId = :userId', { userId })
        .orderBy('notifications.createdAt', 'DESC')

      const [notifications, metaDto] = await paginate<NotificationSystem>(query, reqDto, {
        skipCount: false,
        takeAll: false
      })

      return {
        notifications,
        meta: metaDto
      }
    } catch (error) {
      if (error instanceof ValidationException) {
        throw error
      }
      throw new InternalServerErrorException(`Error fetching user's notifications.`)
    }
  }

  async remove(id: string) {
    const targetRemove = await this.notificationRepository.findOne({ where: { id: id } })

    if (!targetRemove) {
      throw new ValidationException(ErrorCode.NF001)
    }

    await this.notificationRepository.delete({ id: targetRemove.id })
  }

  async update(id: string) {
    const targetUpdate = await this.notificationRepository.findOne({ where: { id: id } })

    if (!targetUpdate) {
      throw new ValidationException(ErrorCode.NF001)
    }

    targetUpdate.status = true

    await this.notificationRepository.save(targetUpdate)
  }
}
