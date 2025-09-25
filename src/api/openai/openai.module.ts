import { Module } from '@nestjs/common'
import { OpenaiService } from './openai.service'
import { OpenaiController } from './openai.controller'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@api/user/entities/user.entity'
import { UserContextModule } from '@api/user-context/user-context.module'

@Module({
  controllers: [OpenaiController],
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, UserContextModule],
  providers: [OpenaiService],
  exports: [OpenaiService]
})
export class OpenaiModule {}
