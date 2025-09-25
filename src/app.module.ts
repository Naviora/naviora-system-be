import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CacheModule } from '@nestjs/cache-manager'
import { createKeyv } from '@keyv/redis'
import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { APP_GUARD } from '@nestjs/core'
import { NotificationModule } from './api/notification/notification.module'
import { OpenaiModule } from './api/openai/openai.module'
import { UserContextModule } from './api/user-context/user-context.module'
import { BullModule } from '@nestjs/bullmq'
import { AuthModule } from '@api/auth/auth.module'
import { UserModule } from '@api/user/user.module'
import { RolesModule } from '@api/role/roles.module'
import { RedisModule } from '@nestjs-modules/ioredis'
import { MailModule } from '@mail/mail.module'
import databaseConfig from '@database/config/database.config'
import { DatabaseConfig } from '@database/config/database-config.type'
import redisConfig from '@redis/config/redis.config'
import { RedisConfig } from '@redis/config/redis-config.type'
import appConfig from '@config/app.config'
import { CloudinaryModule } from '@cloudinary/cloudinary.module'
import cloudinaryConfig from '@cloudinary/config/cloudinary.config'
import openaiConfig from '@api/openai/config/openai.config'
import { User } from '@api/user/entities/user.entity'
import { Role } from '@api/role/entities/role.entity'
import { HealthzModule } from '@api/heathz/healthz.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV?.trim() === 'development' ? '.env.dev' : '.env',
      load: [databaseConfig, redisConfig, appConfig, openaiConfig, cloudinaryConfig],
      cache: true,
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseEnv = configService.get<DatabaseConfig>('database', { infer: true })
        return {
          ...databaseEnv,
          autoLoadEntities: true,
          entities: [User, Role]
        }
      },
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    RolesModule,
    MailModule,
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const redisEnv = configService.get<RedisConfig>('redis', { infer: true })
        return {
          ttl: 30000,
          stores: createKeyv(`redis://${redisEnv.host}:${redisEnv.port}`)
        }
      }
    }),
    NotificationModule,
    OpenaiModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const redisEnv = configService.get<RedisConfig>('redis', { infer: true })
        return {
          type: 'single',
          url: `redis://${redisEnv.host}:${redisEnv.port}`
        }
      },
      inject: [ConfigService]
    }),
    UserContextModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const redisEnv = configService.get<RedisConfig>('redis')
        return {
          connection: {
            host: redisEnv.host,
            port: redisEnv.port
          }
        }
      },
      inject: [ConfigService]
    }),
    CloudinaryModule,
    HealthzModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      }
    ])
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
