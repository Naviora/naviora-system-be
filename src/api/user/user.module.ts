import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { User } from '@api/user/entities/user.entity'
import { CloudinaryModule } from '@cloudinary/cloudinary.module'
import { SessionEntity } from '@api/user/entities/session.entity'
import { AuthModule } from '@api/auth/auth.module'
import { Role } from '@api/role/entities/role.entity'
import { MailModule } from '@mail/mail.module'
import { EmailQueueModule } from '@background/queues/email-queue/email-queue.module'
import { BullModule } from '@nestjs/bullmq'
import { QueueName, QueuePrefix } from '@constants/job.constant'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SessionEntity, Role]),
    JwtModule,
    CloudinaryModule,
    forwardRef(() => AuthModule),
    MailModule,
    EmailQueueModule,
    BullModule.registerQueue({
      name: QueueName.EMAIL,
      prefix: QueuePrefix.AUTH,
      streams: {
        events: {
          maxLen: 1000
        }
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
