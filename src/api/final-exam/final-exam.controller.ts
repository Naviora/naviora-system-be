import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FinalExamService } from './final-exam.service'
import { CreateFinalExamDto } from './dto/create-final-exam.dto'
import { UpdateFinalExamDto } from './dto/update-final-exam.dto'
import { SubmitFinalExamDto } from './dto/submit-final-exam.dto'
import { FinalExamResponseDto } from './dto/final-exam-response.dto'
import { FinalExamSubmissionResponseDto } from './dto/final-exam-submission-response.dto'
import { FinalExamScoreSpectrumDto } from './dto/final-exam-score-spectrum.dto'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'
import { Roles } from '@decorators/roles.decorator'
import { RolesGuard } from '@guards/roles.guard'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { GetFinalExamsQueryDto } from './dto/get-final-exams-query.dto'
import { GetFinalExamStudentGradesQueryDto } from './dto/get-student-grades-query.dto'
import { FinalExamStudentGradeListResponseDto } from './dto/final-exam-student-grade-list-response.dto'

@ApiTags('Final Exam')
@Controller({ path: 'final-exam', version: '1' })
@ApiBearerAuth('Authorization')
@UseGuards(RolesGuard)
export class FinalExamController {
  constructor(private readonly finalExamService: FinalExamService) {}

  @Post()
  @Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
  @ApiOperation({ summary: 'Create a new final exam' })
  @ApiBody({
    description: 'Payload to create final exam',
    type: CreateFinalExamDto,
    examples: {
      example1: {
        summary: 'Create a new final exam',
        value: {
          title: 'Final Exam 1',
          description: 'Final Exam 1 description',
          status: ExamStatus.DRAFT,
          startTime: new Date().toISOString(),
          endTime: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
          questionSets: ['uuid1', 'uuid2', 'uuid3']
        }
      }
    }
  })
  @ResponseMessage('Tạo bài thi cuối kỳ thành công')
  async create(@Body() createDto: CreateFinalExamDto, @CurrentUser() currentUser: User): Promise<FinalExamResponseDto> {
    return await this.finalExamService.create(createDto, currentUser)
  }

  @Post('start')
  @Roles(RoleInAccount.Student)
  @ApiOperation({ summary: 'Start a new final exam' })
  @ApiBody({
    description: 'Payload to start final exam',
    schema: {
      type: 'object',
      properties: {
        finalExamId: {
          type: 'string',
          format: 'uuid',
          description: 'Final exam ID to start'
        }
      },
      required: ['finalExamId']
    },
    examples: {
      example1: {
        summary: 'Start a final exam',
        value: {
          finalExamId: 'uuid'
        }
      }
    }
  })
  @ResponseMessage('Bắt đầu bài thi cuối kỳ thành công')
  async startFinalExam(
    @Body('finalExamId', new ParseUUIDPipe({ version: '4' })) finalExamId: string,
    @CurrentUser() currentUser: User
  ): Promise<FinalExamSubmissionResponseDto> {
    return await this.finalExamService.startFinalExam(finalExamId, currentUser)
  }

  @Post('submit/:finalExamId&:questionSetId')
  @Roles(RoleInAccount.Student)
  @ApiOperation({ summary: 'Submit final exam answers' })
  @ApiBody({
    description: 'Payload to submit final exam answers',
    type: SubmitFinalExamDto,
    examples: {
      example1: {
        summary: 'Submit final exam answers',
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
  @ResponseMessage('Nộp bài thi cuối kỳ thành công')
  async submitFinalExam(
    @Param('finalExamId', new ParseUUIDPipe({ version: '4' })) finalExamId: string,
    @Param('questionSetId', new ParseUUIDPipe({ version: '4' })) questionSetId: string,
    @Body() submitDto: SubmitFinalExamDto,
    @CurrentUser() currentUser: User
  ): Promise<FinalExamSubmissionResponseDto> {
    return await this.finalExamService.submitFinalExam(finalExamId, questionSetId, submitDto, currentUser)
  }

  @Patch(':finalExamId')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({ summary: 'Update a final exam' })
  @ApiBody({
    description: 'Payload to update final exam',
    type: UpdateFinalExamDto,
    examples: {
      example: {
        summary: 'Update final exam',
        value: {
          title: 'Updated Final Exam Title',
          status: 'ACTIVE',
          endTime: '2024-12-31T23:59:59.000Z',
          questionSets: ['uuid1', 'uuid2', 'uuid3']
        }
      },
      example1: {
        summary: 'Update final exam title and status',
        value: {
          title: 'Updated Final Exam Title',
          status: 'ACTIVE'
        }
      },
      example2: {
        summary: 'Update final exam question sets',
        value: {
          questionSets: ['uuid1', 'uuid2', 'uuid3']
        }
      },
      example3: {
        summary: 'Update final exam end time',
        value: {
          endTime: '2024-12-31T23:59:59.000Z'
        }
      }
    }
  })
  @ResponseMessage('Cập nhật bài thi cuối kỳ thành công')
  async updateFinalExam(
    @Param('finalExamId', new ParseUUIDPipe({ version: '4' })) finalExamId: string,
    @Body() updateDto: UpdateFinalExamDto,
    @CurrentUser() currentUser: User
  ): Promise<FinalExamResponseDto> {
    return await this.finalExamService.updateFinalExam(finalExamId, updateDto, currentUser)
  }

  @Get()
  @Roles(RoleInAccount.Lecturer, RoleInAccount.Principal, RoleInAccount.Admin, RoleInAccount.Student)
  @ApiOperation({ summary: 'Get paginated list of final exams' })
  @ResponseMessage('Lấy danh sách bài thi cuối kỳ thành công')
  async getFinalExams(@Query() query: GetFinalExamsQueryDto) {
    return await this.finalExamService.getFinalExams(query)
  }

  @Get('latest/active')
  @Roles(RoleInAccount.Student)
  @ApiOperation({ summary: 'Get the latest active final exam for student' })
  @ResponseMessage('Lấy bài thi cuối kỳ đang hoạt động mới nhất thành công')
  async getLatestActiveFinalExam(): Promise<FinalExamResponseDto | null> {
    return await this.finalExamService.getLatestActiveFinalExamForStudent()
  }

  @Get(':finalExamId/score-spectrum')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({ summary: 'Get score spectrum analysis for a final exam' })
  @ResponseMessage('Lấy phổ điểm thành công')
  async getFinalExamScoreSpectrum(
    @Param('finalExamId', new ParseUUIDPipe({ version: '4' })) finalExamId: string
  ): Promise<FinalExamScoreSpectrumDto> {
    return await this.finalExamService.getFinalExamScoreSpectrum(finalExamId)
  }

  @Get(':finalExamId/student-grades')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({
    summary: 'Get paginated list of students and their grades for a final exam',
    description: `
      Get a paginated list of all students who have submitted (or started) a final exam along with their grades.
      
      **Authorization:**
      - **Admin/Principal/Lecturer**: Can view all students who have taken the final exam
      
      **Query Parameters:**
      - \`page\`: Page number (default: 1)
      - \`limit\`: Number of items per page (default: 10)
      - \`q\`: Search by student name or email (optional)
      - \`order\`: Sort order - ASC or DESC (default: ASC)
      - \`attemptStatus\`: Filter by attempt status - IN_PROGRESS, SUBMITTED, GRADED, or CANCELLED (optional)
      
      **Response includes:**
      - Student information (ID, name, email, avatar)
      - Submission details (score, status, submission date)
      - Notes and penalty information
      - Pagination metadata
    `
  })
  @ResponseMessage('Lấy điểm học sinh thành công')
  async getStudentGradeList(
    @Param('finalExamId', new ParseUUIDPipe({ version: '4' })) finalExamId: string,
    @Query() query: GetFinalExamStudentGradesQueryDto,
    @CurrentUser() currentUser: User
  ): Promise<FinalExamStudentGradeListResponseDto> {
    return await this.finalExamService.getStudentGradeList(finalExamId, query, currentUser)
  }

  @Get(':finalExamId')
  @Roles(RoleInAccount.Lecturer, RoleInAccount.Principal, RoleInAccount.Admin, RoleInAccount.Student)
  @ApiOperation({ summary: 'Get a single final exam by ID' })
  @ResponseMessage('Lấy bài thi cuối kỳ thành công')
  async getFinalExamById(
    @Param('finalExamId', new ParseUUIDPipe({ version: '4' })) finalExamId: string
  ): Promise<FinalExamResponseDto> {
    return await this.finalExamService.getFinalExamById(finalExamId)
  }

  @Delete(':finalExamId')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({ summary: 'Soft delete a final exam' })
  @ResponseMessage('Xóa bài thi cuối kỳ thành công')
  async deleteFinalExam(
    @Param('finalExamId', new ParseUUIDPipe({ version: '4' })) finalExamId: string,
    @CurrentUser() currentUser: User
  ) {
    return await this.finalExamService.softDeleteFinalExam(finalExamId, currentUser)
  }
}
