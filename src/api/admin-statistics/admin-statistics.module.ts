import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminStatisticsController } from './admin-statistics.controller'
import { AdminStatisticsService } from './admin-statistics.service'
import { User } from '@api/user/entities/user.entity'
import { Role } from '@api/role/entities/role.entity'
import { AuthModule } from '@api/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), AuthModule],
  controllers: [AdminStatisticsController],
  providers: [AdminStatisticsService],
  exports: [AdminStatisticsService]
})
export class AdminStatisticsModule {}
