import { Injectable, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { MeetingEventEntity } from './entities/meeting-event.entity'
import { CreateMeetingEventDto } from './dto/create-meeting-event.dto'
import { GetWeeklyMeetingEventsQueryDto } from './dto/get-weekly-query.dto'
import { Class } from '@api/class/entities/class.entity'
import { TeachingAssignment } from '@api/class/entities/teaching-assignment.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { RoleInAccount } from '@common/enums/account-role.enum'

@Injectable()
export class MeetingEventsService {
  constructor(
    @InjectRepository(MeetingEventEntity)
    private readonly meetingEventsRepo: Repository<MeetingEventEntity>,
    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,
    @InjectRepository(TeachingAssignment)
    private readonly teachingAssignmentRepo: Repository<TeachingAssignment>,
    @InjectRepository(ClassEnrolment)
    private readonly enrolmentRepo: Repository<ClassEnrolment>
  ) {}

  async create(dto: CreateMeetingEventDto) {
    const { class_id, host_by, invitee = [], title, description, note, start_time, end_time } = dto

    const start = new Date(start_time)
    const end = new Date(end_time)
    if (!(start < end)) {
      throw new ValidationException(ErrorCode.MEETING001, 'Invalid time range')
    }

    const cls = await this.classRepo.findOne({ where: { classId: class_id } })
    if (!cls) {
      throw new ValidationException(ErrorCode.CLASS003, 'Class not found', [
        { property: 'class_id', code: ErrorCode.CLASS003 }
      ])
    }

    const assignment = await this.teachingAssignmentRepo.findOne({
      where: { class: { classId: class_id }, lecturer: { id: host_by }, isActive: true },
      relations: ['class', 'lecturer']
    })
    if (!assignment) {
      throw new ForbiddenException({
        error: ErrorCode.MEETING002,
        message: 'User not allowed to create meeting for this class'
      })
    }

    if (invitee.length > 0) {
      const enrolments = await this.enrolmentRepo.find({
        where: { class: { classId: class_id }, student: { id: In(invitee) } },
        relations: ['student', 'class']
      })
      const foundStudentIds = new Set(enrolments.map((e) => e.studentId))
      const invalid = invitee.filter((id) => !foundStudentIds.has(id))
      if (invalid.length > 0) {
        throw new ValidationException(ErrorCode.MEETING003, 'Some invitees are not in the class', [
          { property: 'invitee', code: ErrorCode.MEETING003, message: `Invalid: ${invalid.join(', ')}` }
        ])
      }
    }

    // generate a short unique meeting code (8-12 chars)
    const meetingCode = await this.generateUniqueMeetingCode()

    const entity = this.meetingEventsRepo.create({
      classId: class_id,
      hostBy: host_by,
      invitee: invitee.length ? invitee : null,
      title,
      description: description ?? null,
      note: note ?? null,
      startTime: start,
      endTime: end,
      code: meetingCode
    })

    const saved = await this.meetingEventsRepo.save(entity)

    return {
      id: saved.meetingEventsId,
      class_id: saved.classId,
      host_by: saved.hostBy,
      meeting_code: saved.code,
      invitee: saved.invitee ?? [],
      title: saved.title,
      description: saved.description,
      note: saved.note,
      start_time: saved.startTime,
      end_time: saved.endTime,
      created_at: saved.createdAt,
      updated_at: saved.updatedAt
    }
  }

  async getWeekly(userId: string, roleName: string | undefined, query: GetWeeklyMeetingEventsQueryDto) {
    const { start, end, class_id } = query
    if (!(start < end)) {
      throw new ValidationException(ErrorCode.MEETING001, 'Invalid time range')
    }

    const qb = this.meetingEventsRepo
      .createQueryBuilder('ev')
      .leftJoin('ev.class', 'class')
      .leftJoinAndSelect('ev.host', 'host')
      // overlap condition: event intersects [start, end]
      .where('ev.startTime < :end AND ev.endTime > :start', { start, end })

    if (roleName === RoleInAccount.Student) {
      qb.innerJoin(ClassEnrolment, 'en', 'en.class_id = ev.class_id AND en.student_id = :userId', { userId })
    } else if (roleName === RoleInAccount.Lecturer) {
      qb.innerJoin(
        TeachingAssignment,
        'ta',
        'ta.class_id = ev.class_id AND ta.lecturer_id = :userId AND ta.is_active = true',
        { userId }
      )
    } else {
      // Default: no results for unsupported roles for now
      qb.andWhere('1=0')
    }

    if (class_id) {
      qb.andWhere('ev.classId = :classId', { classId: class_id })
    }

    const events = await qb.orderBy('ev.startTime', 'ASC').getMany()

    return events.map((e) => ({
      id: e.meetingEventsId,
      class_id: e.classId,
      host_by: e.hostBy,
      meeting_code: e.code,
      host_detail: e.host
        ? {
            id: e.host.id,
            name: e.host.name,
            email: e.host.email,
            avatar: e.host.avatar
          }
        : null,
      invitee: e.invitee ?? [],
      title: e.title,
      description: e.description,
      note: e.note,
      start_time: e.startTime,
      end_time: e.endTime,
      created_at: e.createdAt,
      updated_at: e.updatedAt
    }))
  }

  private async generateUniqueMeetingCode(): Promise<string> {
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // exclude easily confused chars
    const minLen = 8
    const maxLen = 12

    const randomCode = (len: number) => {
      let out = ''
      for (let i = 0; i < len; i++) {
        out += charset[Math.floor(Math.random() * charset.length)]
      }
      return out
    }

    // Try a few times to avoid rare collisions
    for (let attempt = 0; attempt < 5; attempt++) {
      const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen
      const code = randomCode(len)
      const exists = await this.meetingEventsRepo.findOne({ where: { code } })
      if (!exists) return code
    }

    // Fallback to a timestamp-based suffix if collisions persist
    return `MTG${Date.now().toString(36).toUpperCase()}`.slice(0, 12)
  }
}
