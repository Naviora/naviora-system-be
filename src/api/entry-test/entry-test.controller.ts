import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { EntryTestService } from './entry-test.service'
import { CreateEntryTestDto } from './dto/create-entry-test.dto'
import { EntryTestResponseDto } from './dto/entry-test-response.dto'
import { EntryTestSubmissionResponseDto } from './dto/entry-test-submission-response.dto'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'
import { Roles } from '@decorators/roles.decorator'
import { RolesGuard } from '@guards/roles.guard'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { GetEntryTestsQueryDto } from './dto/get-entry-tests-query.dto'

@ApiTags('Entry Test')
@Controller({ path: 'entry-test', version: '1' })
@ApiBearerAuth('Authorization')
@UseGuards(RolesGuard)
export class EntryTestController {
  constructor(private readonly entryTestService: EntryTestService) {}

  @Post()
  @Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
  @ApiOperation({ summary: 'Create a new entry test' })
  @ApiBody({
    description: 'Payload to create entry test',
    type: CreateEntryTestDto,
    examples: {
      example1: {
        summary: 'Create a new entry test',
        value: {
          title: 'Entry Test 1',
          description: 'Entry Test 1 description',
          status: ExamStatus.DRAFT,
          startTime: new Date().toISOString(),
          endTime: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
          questionSets: ['uuid1', 'uuid2', 'uuid3']
        }
      }
    }
  })
  @ResponseMessage('Entry test created successfully')
  async create(@Body() createDto: CreateEntryTestDto, @CurrentUser() currentUser: User): Promise<EntryTestResponseDto> {
    return await this.entryTestService.create(createDto, currentUser)
  }

  @Post('start')
  @Roles(RoleInAccount.Student)
  @ApiOperation({ summary: 'Start a new entry test' })
  @ApiBody({
    description: 'Payload to start entry test',
    schema: {
      type: 'object',
      properties: {
        entryTestId: {
          type: 'string',
          format: 'uuid',
          description: 'Entry test ID to start'
        }
      },
      required: ['entryTestId']
    },
    examples: {
      example1: {
        summary: 'Start an entry test',
        value: {
          entryTestId: 'uuid'
        }
      }
    }
  })
  @ResponseMessage('Entry test started successfully')
  async startEntryTest(
    @Body('entryTestId', new ParseUUIDPipe({ version: '4' })) entryTestId: string,
    @CurrentUser() currentUser: User
  ): Promise<EntryTestSubmissionResponseDto> {
    return await this.entryTestService.startEntryTest(entryTestId, currentUser)
  }

  @Get()
  @Roles('Lecturer', 'Principal', 'Admin', 'Student')
  @ApiOperation({ summary: 'Get paginated list of entry tests' })
  @ResponseMessage('Entry tests retrieved successfully')
  async getEntryTests(@Query() query: GetEntryTestsQueryDto) {
    return await this.entryTestService.getEntryTests(query)
  }

  @Get(':entryTestId')
  @Roles('Lecturer', 'Principal', 'Admin', 'Student')
  @ApiOperation({ summary: 'Get a single entry test by ID' })
  @ResponseMessage('Entry test retrieved successfully')
  async getEntryTestById(
    @Param('entryTestId', new ParseUUIDPipe({ version: '4' })) entryTestId: string
  ): Promise<EntryTestResponseDto> {
    return await this.entryTestService.getEntryTestById(entryTestId)
  }
}
