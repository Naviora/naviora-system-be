import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MeetingEventsService } from './meeting-events.service'
import { CreateMeetingEventDto } from './dto/create-meeting-event.dto'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { GetWeeklyMeetingEventsQueryDto } from './dto/get-weekly-query.dto'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'

@ApiTags('Meeting Events')
@Controller({ path: 'meeting-events', version: '1' })
@ApiBearerAuth('Authorization')
export class MeetingEventsController {
  constructor(private readonly meetingEventsService: MeetingEventsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create meeting event for a class' })
  @ResponseMessage('Meeting event created successfully')
  async create(@Body() dto: CreateMeetingEventDto) {
    return await this.meetingEventsService.create(dto)
  }

  @Get('weekly')
  @ApiOperation({ summary: 'Get weekly meeting events by role' })
  @ResponseMessage('Get weekly meeting events successfully')
  async getWeekly(@Query() query: GetWeeklyMeetingEventsQueryDto, @CurrentUser() currentUser) {
    return await this.meetingEventsService.getWeekly(currentUser.id, currentUser.role, query)
  }
}
