import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MeetingEventsController } from './meeting-events.controller'
import { MeetingEventsService } from './meeting-events.service'
import { MeetingEventEntity } from './entities/meeting-event.entity'
import { Class } from '@api/class/entities/class.entity'
import { TeachingAssignment } from '@api/class/entities/teaching-assignment.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MeetingEventEntity, Class, TeachingAssignment, ClassEnrolment])],
  controllers: [MeetingEventsController],
  providers: [MeetingEventsService],
  exports: []
})
export class MeetingEventsModule {}
