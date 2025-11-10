import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ReviewedExerciseService } from './reviewed-exercise.service'
import { CreateReviewedExerciseDto } from './dto/create-reviewed-exercise.dto'
import { UpdateReviewedExerciseDto } from './dto/update-reviewed-exercise.dto'
import { SubmitReviewedExerciseDto } from './dto/submit-reviewed-exercise.dto'
import { ReviewedExerciseResponseDto } from './dto/reviewed-exercise-response.dto'
import { ReviewedExerciseSubmissionResponseDto } from './dto/reviewed-exercise-submission-response.dto'
import { ReviewedExerciseScoreSpectrumDto } from './dto/reviewed-exercise-score-spectrum.dto'
import { StudentGradeListResponseDto } from './dto/student-grade-list-response.dto'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'
import { Roles } from '@decorators/roles.decorator'
import { RolesGuard } from '@guards/roles.guard'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { ExamStatus } from '@common/enums/exam-status.enum'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { GetReviewedExercisesQueryDto } from './dto/get-reviewed-exercises-query.dto'
import { GetStudentGradesQueryDto } from './dto/get-student-grades-query.dto'

@ApiTags('Reviewed Exercise')
@Controller({ path: 'reviewed-exercise', version: '1' })
@ApiBearerAuth('Authorization')
@UseGuards(RolesGuard)
export class ReviewedExerciseController {
  constructor(private readonly reviewedExerciseService: ReviewedExerciseService) {}

  @Post()
  @Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
  @ApiOperation({ summary: 'Create a new reviewed exercise' })
  @ApiBody({
    description: 'Payload to create reviewed exercise',
    type: CreateReviewedExerciseDto,
    examples: {
      example1: {
        summary: 'Create a new reviewed exercise',
        value: {
          lessonId: 'uuid',
          status: ExamStatus.DRAFT,
          startTime: new Date().toISOString(),
          endTime: new Date(new Date().setHours(new Date().getHours() + 1)).toISOString(),
          questionSets: ['uuid1', 'uuid2', 'uuid3']
        }
      }
    }
  })
  @ResponseMessage('Reviewed exercise created successfully')
  async create(
    @Body() createDto: CreateReviewedExerciseDto,
    @CurrentUser() currentUser: User
  ): Promise<ReviewedExerciseResponseDto> {
    return await this.reviewedExerciseService.create(createDto, currentUser)
  }

  @Post('start')
  @Roles(RoleInAccount.Student)
  @ApiOperation({ summary: 'Start a new reviewed exercise' })
  @ApiBody({
    description: 'Payload to start reviewed exercise',
    schema: {
      type: 'object',
      properties: {
        reviewedExerciseId: {
          type: 'string',
          format: 'uuid',
          description: 'Reviewed exercise ID to start'
        }
      },
      required: ['reviewedExerciseId']
    },
    examples: {
      example1: {
        summary: 'Start a reviewed exercise',
        value: {
          reviewedExerciseId: 'uuid'
        }
      }
    }
  })
  @ResponseMessage('Reviewed exercise started successfully')
  async startReviewedExercise(
    @Body('reviewedExerciseId', new ParseUUIDPipe({ version: '4' })) reviewedExerciseId: string,
    @CurrentUser() currentUser: User
  ): Promise<ReviewedExerciseSubmissionResponseDto> {
    return await this.reviewedExerciseService.startReviewedExercise(reviewedExerciseId, currentUser)
  }

  @Post('submit/:reviewedExerciseId&:questionSetId')
  @Roles(RoleInAccount.Student)
  @ApiOperation({ summary: 'Submit reviewed exercise answers' })
  @ApiBody({
    description: 'Payload to submit reviewed exercise answers',
    type: SubmitReviewedExerciseDto,
    examples: {
      example1: {
        summary: 'Submit reviewed exercise answers',
        value: {
          answered: [
            {
              questionId: 'question1id',
              answerId: 'answer1id'
            },
            {
              questionId: 'question2id',
              answerId: 'answer2id'
            }
          ]
        }
      }
    }
  })
  @ResponseMessage('Reviewed exercise submitted successfully')
  async submitReviewedExercise(
    @Param('reviewedExerciseId', new ParseUUIDPipe({ version: '4' })) reviewedExerciseId: string,
    @Param('questionSetId', new ParseUUIDPipe({ version: '4' })) questionSetId: string,
    @Body() submitDto: SubmitReviewedExerciseDto,
    @CurrentUser() currentUser: User
  ): Promise<ReviewedExerciseSubmissionResponseDto> {
    return await this.reviewedExerciseService.submitReviewedExercise(
      reviewedExerciseId,
      questionSetId,
      submitDto,
      currentUser
    )
  }

  @Patch(':reviewedExerciseId')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({ summary: 'Update a reviewed exercise' })
  @ApiBody({
    description: 'Payload to update reviewed exercise',
    type: UpdateReviewedExerciseDto,
    examples: {
      example: {
        summary: 'Update reviewed exercise',
        value: {
          status: 'ACTIVE',
          endTime: '2024-12-31T23:59:59.000Z',
          questionSets: ['uuid1', 'uuid2', 'uuid3']
        }
      },
      example1: {
        summary: 'Update reviewed exercise status',
        value: {
          status: 'ACTIVE'
        }
      },
      example2: {
        summary: 'Update reviewed exercise question sets',
        value: {
          questionSets: ['uuid1', 'uuid2', 'uuid3']
        }
      },
      example3: {
        summary: 'Update reviewed exercise end time',
        value: {
          endTime: '2024-12-31T23:59:59.000Z'
        }
      }
    }
  })
  @ResponseMessage('Reviewed exercise updated successfully')
  async updateReviewedExercise(
    @Param('reviewedExerciseId', new ParseUUIDPipe({ version: '4' })) reviewedExerciseId: string,
    @Body() updateDto: UpdateReviewedExerciseDto,
    @CurrentUser() currentUser: User
  ): Promise<ReviewedExerciseResponseDto> {
    return await this.reviewedExerciseService.updateReviewedExercise(reviewedExerciseId, updateDto, currentUser)
  }

  @Get()
  @Roles(RoleInAccount.Lecturer, RoleInAccount.Principal, RoleInAccount.Admin, RoleInAccount.Student)
  @ApiOperation({ summary: 'Get paginated list of reviewed exercises' })
  @ResponseMessage('Reviewed exercises retrieved successfully')
  async getReviewedExercises(@Query() query: GetReviewedExercisesQueryDto) {
    return await this.reviewedExerciseService.getReviewedExercises(query)
  }

  @Get('latest/active/:lessonId')
  @Roles(RoleInAccount.Student)
  @ApiOperation({ summary: 'Get the latest active reviewed exercise for a lesson' })
  @ResponseMessage('Latest active reviewed exercise retrieved successfully')
  async getLatestActiveReviewedExercise(
    @Param('lessonId', new ParseUUIDPipe({ version: '4' })) lessonId: string
  ): Promise<ReviewedExerciseResponseDto | null> {
    return await this.reviewedExerciseService.getLatestActiveReviewedExerciseForStudent(lessonId)
  }

  @Get(':reviewedExerciseId/score-spectrum')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({ summary: 'Get score spectrum analysis for a reviewed exercise' })
  @ResponseMessage('Score spectrum retrieved successfully')
  async getReviewedExerciseScoreSpectrum(
    @Param('reviewedExerciseId', new ParseUUIDPipe({ version: '4' })) reviewedExerciseId: string
  ): Promise<ReviewedExerciseScoreSpectrumDto> {
    return await this.reviewedExerciseService.getReviewedExerciseScoreSpectrum(reviewedExerciseId)
  }

  @Get(':reviewedExerciseId/student-grades')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({
    summary: 'Get paginated list of students and their grades for a reviewed exercise',
    description: `
      Get a paginated list of all students who have submitted (or started) a reviewed exercise along with their grades.
      
      **Authorization:**
      - **Lecturer**: Can only view students enrolled in classes where they are assigned to teach the module
      - **Principal/Admin**: Can view all students regardless of class/module assignment
      
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
  @ResponseMessage('Student grades retrieved successfully')
  async getStudentGradeList(
    @Param('reviewedExerciseId', new ParseUUIDPipe({ version: '4' })) reviewedExerciseId: string,
    @Query() query: GetStudentGradesQueryDto,
    @CurrentUser() currentUser: User
  ): Promise<StudentGradeListResponseDto> {
    return await this.reviewedExerciseService.getStudentGradeList(reviewedExerciseId, query, currentUser)
  }

  @Get(':reviewedExerciseId')
  @Roles(RoleInAccount.Lecturer, RoleInAccount.Principal, RoleInAccount.Admin, RoleInAccount.Student)
  @ApiOperation({ summary: 'Get a single reviewed exercise by ID' })
  @ResponseMessage('Reviewed exercise retrieved successfully')
  async getReviewedExerciseById(
    @Param('reviewedExerciseId', new ParseUUIDPipe({ version: '4' })) reviewedExerciseId: string
  ): Promise<ReviewedExerciseResponseDto> {
    return await this.reviewedExerciseService.getReviewedExerciseById(reviewedExerciseId)
  }

  @Delete(':reviewedExerciseId')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({ summary: 'Soft delete a reviewed exercise' })
  @ResponseMessage('Reviewed exercise deleted successfully')
  async deleteReviewedExercise(
    @Param('reviewedExerciseId', new ParseUUIDPipe({ version: '4' })) reviewedExerciseId: string,
    @CurrentUser() currentUser: User
  ) {
    return await this.reviewedExerciseService.softDeleteReviewedExercise(reviewedExerciseId, currentUser)
  }
}
