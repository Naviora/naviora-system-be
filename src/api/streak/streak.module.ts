import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { StreakController } from './streak.controller'
import { StreakService } from './streak.service'
import { Streak } from './entities/streak.entity'
import { User } from '@api/user/entities/user.entity'
import { AuthModule } from '@api/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Streak, User]), JwtModule.register({}), forwardRef(() => AuthModule)],
  controllers: [StreakController],
  providers: [StreakService],
  exports: [StreakService]
})
export class StreakModule {}
