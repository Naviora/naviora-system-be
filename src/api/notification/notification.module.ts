import { NotificationGateway } from '@api/notification/notification-gateway'
import { forwardRef, Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '@api/user/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { OpenaiModule } from '@api/openai/openai.module'
import { UserContextModule } from '@api/user-context/user-context.module'
import { NotificationSystem } from '@api/notification/entities/notification-system.entity'
import { NotificationController } from '@api/notification/notification.controller'
import { AuthModule } from '@api/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, NotificationSystem]),
    forwardRef(() => OpenaiModule),
    UserContextModule,
    AuthModule
  ],
  providers: [NotificationGateway, NotificationService, JwtService, ConfigService],
  exports: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
