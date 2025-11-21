import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CloudinaryModule } from '@cloudinary/cloudinary.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from '@api/auth/auth.module'
import { ModuleEntity } from './entities/module.entity'
import { ModulesService } from './module.service'
import { ModulesController } from './module.controller'
import { TeachingModule } from './entities/teaching-module.entity'
import { Class } from '@api/class/entities/class.entity'
import { User } from '@api/user/entities/user.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'
import { EntryTestSubmissionEntity } from '@api/entry-test/entities/entry-test-submission.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { LessonProgress } from '@api/lesson/entities/lesson-progress.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ModuleEntity,
      TeachingModule,
      Class,
      User,
      ClassEnrolment,
      EntryTestSubmissionEntity,
      LessonEntity,
      LessonProgress
    ]),
    CloudinaryModule,
    JwtModule,
    AuthModule
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService]
})
export class ModulesModule {}
