import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { QuestionSetService } from './question-set.service'
import { CreateQuestionSetDto } from './dto/create-question-set.dto'
import { UpdateQuestionSetDto } from './dto/update-question-set.dto'
import { GetQuestionSetsQueryDto } from './dto/get-question-sets-query.dto'
import { QuestionSetDetailResponseDto } from './dto/question-set-detail-response.dto'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'
import { Roles } from '@decorators/roles.decorator'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { RolesGuard } from '@guards/roles.guard'

@ApiTags('Question Sets')
@Controller({ path: 'question-set', version: '1' })
@UseGuards(RolesGuard)
@Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
@ApiBearerAuth('Authorization')
export class QuestionSetController {
  constructor(private readonly questionSetService: QuestionSetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question set (exam test set)' })
  @ApiBody({ description: 'Payload to create question set', type: CreateQuestionSetDto })
  @ResponseMessage('Question set created successfully')
  async create(@Body() dto: CreateQuestionSetDto, @CurrentUser() currentUser: User) {
    return await this.questionSetService.create(dto, currentUser)
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated list of question sets' })
  @ResponseMessage('Question sets retrieved successfully')
  async getQuestionSets(@Query() query: GetQuestionSetsQueryDto) {
    return await this.questionSetService.getQuestionSets(query)
  }

  @Get(':questionSetId')
  @ApiOperation({ summary: 'Get a single question set by ID with full details' })
  @ResponseMessage('Question set retrieved successfully')
  async getQuestionSetById(
    @Param('questionSetId', new ParseUUIDPipe({ version: '4' })) questionSetId: string
  ): Promise<QuestionSetDetailResponseDto> {
    return await this.questionSetService.getQuestionSetById(questionSetId)
  }

  @Patch(':questionSetId')
  @ApiOperation({ summary: 'Update a question set' })
  @ApiBody({ description: 'Payload to update question set', type: UpdateQuestionSetDto })
  @ResponseMessage('Question set updated successfully')
  async update(
    @Param('questionSetId', new ParseUUIDPipe({ version: '4' })) questionSetId: string,
    @Body() dto: UpdateQuestionSetDto,
    @CurrentUser() currentUser: User
  ) {
    return await this.questionSetService.update(questionSetId, dto, currentUser)
  }

  @Delete(':questionSetId')
  @ApiOperation({ summary: 'Soft delete a question set' })
  @ResponseMessage('Question set deleted successfully')
  async delete(
    @Param('questionSetId', new ParseUUIDPipe({ version: '4' })) questionSetId: string,
    @CurrentUser() currentUser: User
  ) {
    return await this.questionSetService.softDelete(questionSetId, currentUser)
  }
}
