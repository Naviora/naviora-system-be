import { Module } from '@nestjs/common'
import { HealthzController } from './healthz.controller'
import { TerminusModule } from '@nestjs/terminus'
import { RedisModule } from '@nestjs-modules/ioredis'

@Module({
  imports: [TerminusModule, RedisModule],
  controllers: [HealthzController]
})
export class HealthzModule {}
