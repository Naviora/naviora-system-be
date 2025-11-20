import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StudentDashboardController } from './student-dashboard.controller'
import { StudentDashboardService } from './student-dashboard.service'
import { User } from '@api/user/entities/user.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'
import { Class } from '@api/class/entities/class.entity'
import { ModuleEntity } from '@api/module/entities/module.entity'
import { LessonProgress } from '@api/lesson/entities/lesson-progress.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { Streak } from '@api/streak/entities/streak.entity'
import { AuthModule } from '@api/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ClassEnrolment, Class, ModuleEntity, LessonProgress, LessonEntity, Streak]),
    AuthModule
  ],
  controllers: [StudentDashboardController],
  providers: [StudentDashboardService],
  exports: [StudentDashboardService]
})
export class StudentDashboardModule {}
