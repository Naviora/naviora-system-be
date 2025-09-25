import { Controller, Get, Header } from '@nestjs/common'
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator
} from '@nestjs/terminus'
import { InjectRedis } from '@nestjs-modules/ioredis'
import Redis from 'ioredis'
import { ApiTags } from '@nestjs/swagger'
import { Public } from '@decorators/auth.decorator'
import { SkipTransform } from '@decorators/skip-transform.decorator'
import { SkipThrottle } from '@nestjs/throttler'

@Controller('healthz')
@ApiTags('Health Check')
@Public()
@SkipTransform()
@SkipThrottle()
export class HealthzController {
  constructor(
    private health: HealthCheckService,
    private typeorm: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    @InjectRedis() private readonly redis: Redis
  ) {}

  @Get()
  @HealthCheck()
  @Header('Content-Type', 'text/plain; version=0.0.4')
  check() {
    return this.health.check([
      () => this.typeorm.pingCheck('postgres'),
      async () => {
        try {
          await this.redis.ping()
          return { redis: { status: 'up' } }
        } catch (error) {
          return { redis: { status: 'down', error: error.message } }
        }
      },
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      () => this.disk.checkStorage('disk C', { thresholdPercent: 0.8, path: 'C:' })
    ])
  }
}
