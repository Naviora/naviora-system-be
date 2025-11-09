import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StreakController } from './streak.controller'
import { StreakService } from './streak.service'
import { Streak } from './entities/streak.entity'
import { User } from '@api/user/entities/user.entity'
import { AuthModule } from '@api/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Streak, User]), AuthModule],
  controllers: [StreakController],
  providers: [StreakService],
  exports: [StreakService]
})
export class StreakModule {}
