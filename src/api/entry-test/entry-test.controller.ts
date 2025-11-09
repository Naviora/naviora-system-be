import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { EntryTestService } from './entry-test.service'
import { CreateEntryTestDto } from './dto/create-entry-test.dto'
import { UpdateEntryTestDto } from './dto/update-entry-test.dto'
import { SubmitEntryTestDto } from './dto/submit-entry-test.dto'
import { EntryTestResponseDto } from './dto/entry-test-response.dto'
import { EntryTestSubmissionResponseDto } from './dto/entry-test-submission-response.dto'
import { EntryTestScoreSpectrumDto } from './dto/entry-test-score-spectrum.dto'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'
import { Roles } from '@decorators/roles.decorator'
import { RolesGuard } from '@guards/roles.guard'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { GetEntryTestsQueryDto } from './dto/get-entry-tests-query.dto'
import { GetEntryTestStudentGradesQueryDto } from './dto/get-student-grades-query.dto'
import { EntryTestStudentGradeListResponseDto } from './dto/entry-test-student-grade-list-response.dto'

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

  @Post('submit/:entryTestId&:questionSetId')
  @Roles(RoleInAccount.Student)
  @ApiOperation({ summary: 'Submit entry test answers' })
  @ApiBody({
    description: 'Payload to submit entry test answers',
    type: SubmitEntryTestDto,
    examples: {
      example1: {
        summary: 'Submit entry test answers',
        value: {
          answered: [
            {
              questionId: 'question1id',
              answerId: 'answer1id'
            },
            {
              questionId: 'question2id',
              answerId: 'answer2id'
            },
            {
              questionId: 'question3id',
              answerId: 'answer3id'
            },
            {
              questionId: 'question4id',
              answerId: 'answer4id'
            },
            {
              questionId: 'question5id',
              answerId: 'answer5id'
            },
            {
              questionId: 'question6id',
              answerId: 'answer6id'
            },
            {
              questionId: 'question7id',
              answerId: 'answer7id'
            },
            {
              questionId: 'question8id',
              answerId: 'answer8id'
            },
            {
              questionId: 'question9id',
              answerId: 'answer9id'
            },
            {
              questionId: 'question10id',
              answerId: 'answer10id'
            }
          ]
        }
      }
    }
  })
  @ResponseMessage('Entry test submitted successfully')
  async submitEntryTest(
    @Param('entryTestId', new ParseUUIDPipe({ version: '4' })) entryTestId: string,
    @Param('questionSetId', new ParseUUIDPipe({ version: '4' })) questionSetId: string,
    @Body() submitDto: SubmitEntryTestDto,
    @CurrentUser() currentUser: User
  ): Promise<EntryTestSubmissionResponseDto> {
    return await this.entryTestService.submitEntryTest(entryTestId, questionSetId, submitDto, currentUser)
  }

  @Patch(':entryTestId')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({ summary: 'Update an entry test' })
  @ApiBody({
    description: 'Payload to update entry test',
    type: UpdateEntryTestDto,
    examples: {
      example: {
        summary: 'Update entry test',
        value: {
          title: 'Updated Entry Test Title',
          status: 'ACTIVE',
          endTime: '2024-12-31T23:59:59.000Z',
          questionSets: ['uuid1', 'uuid2', 'uuid3']
        }
      },
      example1: {
        summary: 'Update entry test title and status',
        value: {
          title: 'Updated Entry Test Title',
          status: 'ACTIVE'
        }
      },
      example2: {
        summary: 'Update entry test question sets',
        value: {
          questionSets: ['uuid1', 'uuid2', 'uuid3']
        }
      },
      example3: {
        summary: 'Update entry test end time',
        value: {
          endTime: '2024-12-31T23:59:59.000Z'
        }
      }
    }
  })
  @ResponseMessage('Entry test updated successfully')
  async updateEntryTest(
    @Param('entryTestId', new ParseUUIDPipe({ version: '4' })) entryTestId: string,
    @Body() updateDto: UpdateEntryTestDto,
    @CurrentUser() currentUser: User
  ): Promise<EntryTestResponseDto> {
    return await this.entryTestService.updateEntryTest(entryTestId, updateDto, currentUser)
  }

  @Get()
  @Roles(RoleInAccount.Lecturer, RoleInAccount.Principal, RoleInAccount.Admin, RoleInAccount.Student)
  @ApiOperation({ summary: 'Get paginated list of entry tests' })
  @ResponseMessage('Entry tests retrieved successfully')
  async getEntryTests(@Query() query: GetEntryTestsQueryDto) {
    return await this.entryTestService.getEntryTests(query)
  }

  @Get('latest/active')
  @Roles(RoleInAccount.Student)
  @ApiOperation({ summary: 'Get the latest active entry test for student' })
  @ResponseMessage('Latest active entry test retrieved successfully')
  async getLatestActiveEntryTest(): Promise<EntryTestResponseDto | null> {
    return await this.entryTestService.getLatestActiveEntryTestForStudent()
  }

  @Get(':entryTestId/score-spectrum')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({ summary: 'Get score spectrum analysis for an entry test' })
  @ResponseMessage('Score spectrum retrieved successfully')
  async getEntryTestScoreSpectrum(
    @Param('entryTestId', new ParseUUIDPipe({ version: '4' })) entryTestId: string
  ): Promise<EntryTestScoreSpectrumDto> {
    return await this.entryTestService.getEntryTestScoreSpectrum(entryTestId)
  }

  @Get(':entryTestId/student-grades')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({
    summary: 'Get paginated list of students and their grades for an entry test',
    description: `
      Get a paginated list of all students who have submitted (or started) an entry test along with their grades.
      
      **Authorization:**
      - **Admin/Principal/Lecturer**: Can view all students who have taken the entry test
      
      **Query Parameters:**
      - \`page\`: Page number (default: 1)
      - \`limit\`: Number of items per page (default: 10)
      - \`q\`: Search by student name or email (optional)
      - \`order\`: Sort order - ASC or DESC (default: ASC)
      
      **Response includes:**
      - Student information (ID, name, email, avatar)
      - Submission details (score, status, submission date)
      - Notes and penalty information
      - Pagination metadata
    `
  })
  @ResponseMessage('Student grades retrieved successfully')
  async getStudentGradeList(
    @Param('entryTestId', new ParseUUIDPipe({ version: '4' })) entryTestId: string,
    @Query() query: GetEntryTestStudentGradesQueryDto,
    @CurrentUser() currentUser: User
  ): Promise<EntryTestStudentGradeListResponseDto> {
    return await this.entryTestService.getStudentGradeList(entryTestId, query, currentUser)
  }

  @Get(':entryTestId')
  @Roles(RoleInAccount.Lecturer, RoleInAccount.Principal, RoleInAccount.Admin, RoleInAccount.Student)
  @ApiOperation({ summary: 'Get a single entry test by ID' })
  @ResponseMessage('Entry test retrieved successfully')
  async getEntryTestById(
    @Param('entryTestId', new ParseUUIDPipe({ version: '4' })) entryTestId: string
  ): Promise<EntryTestResponseDto> {
    return await this.entryTestService.getEntryTestById(entryTestId)
  }

  @Delete(':entryTestId')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({ summary: 'Soft delete an entry test' })
  @ResponseMessage('Entry test deleted successfully')
  async deleteEntryTest(
    @Param('entryTestId', new ParseUUIDPipe({ version: '4' })) entryTestId: string,
    @CurrentUser() currentUser: User
  ) {
    return await this.entryTestService.softDeleteEntryTest(entryTestId, currentUser)
  }
}
