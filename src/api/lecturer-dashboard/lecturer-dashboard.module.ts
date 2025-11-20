import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LecturerDashboardController } from './lecturer-dashboard.controller'
import { LecturerDashboardService } from './lecturer-dashboard.service'
import { User } from '@api/user/entities/user.entity'
import { TeachingAssignment } from '@api/class/entities/teaching-assignment.entity'
import { Class } from '@api/class/entities/class.entity'
import { TeachingModule } from '@api/module/entities/teaching-module.entity'
import { ModuleEntity } from '@api/module/entities/module.entity'
import { MeetingEventEntity } from '@api/meeting-events/entities/meeting-event.entity'
import { EntryTestEntity } from '@api/entry-test/entities/entry-test.entity'
import { FinalExamEntity } from '@api/final-exam/entities/final-exam.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'
import { AuthModule } from '@api/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      TeachingAssignment,
      Class,
      TeachingModule,
      ModuleEntity,
      MeetingEventEntity,
      EntryTestEntity,
      FinalExamEntity,
      ClassEnrolment
    ]),
    AuthModule
  ],
  controllers: [LecturerDashboardController],
  providers: [LecturerDashboardService],
  exports: [LecturerDashboardService]
})
export class LecturerDashboardModule {}
