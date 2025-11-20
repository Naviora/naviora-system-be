import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PrincipalDashboardController } from './principal-dashboard.controller'
import { PrincipalDashboardService } from './principal-dashboard.service'
import { User } from '@api/user/entities/user.entity'
import { Class } from '@api/class/entities/class.entity'
import { ModuleEntity } from '@api/module/entities/module.entity'
import { EntryTestEntity } from '@api/entry-test/entities/entry-test.entity'
import { FinalExamEntity } from '@api/final-exam/entities/final-exam.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'
import { TeachingAssignment } from '@api/class/entities/teaching-assignment.entity'
import { AuthModule } from '@api/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Class,
      ModuleEntity,
      EntryTestEntity,
      FinalExamEntity,
      ClassEnrolment,
      TeachingAssignment
    ]),
    AuthModule
  ],
  controllers: [PrincipalDashboardController],
  providers: [PrincipalDashboardService],
  exports: [PrincipalDashboardService]
})
export class PrincipalDashboardModule {}
