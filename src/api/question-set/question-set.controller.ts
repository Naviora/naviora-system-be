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
@ApiBearerAuth('Authorization')
export class QuestionSetController {
  constructor(private readonly questionSetService: QuestionSetService) {}

  @Post()
  @Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
  @ApiOperation({ summary: 'Create a new question set (exam test set)' })
  @ApiBody({ description: 'Payload to create question set', type: CreateQuestionSetDto })
  @ResponseMessage('Tạo bộ câu hỏi thành công')
  async create(@Body() dto: CreateQuestionSetDto, @CurrentUser() currentUser: User) {
    return await this.questionSetService.create(dto, currentUser)
  }

  @Get()
  @Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
  @ApiOperation({ summary: 'Get paginated list of question sets' })
  @ResponseMessage('Lấy danh sách bộ câu hỏi thành công')
  async getQuestionSets(@Query() query: GetQuestionSetsQueryDto) {
    return await this.questionSetService.getQuestionSets(query)
  }

  @Get(':questionSetId')
  @Roles(RoleInAccount.Student, RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
  @ApiOperation({ summary: 'Get a single question set by ID with full details' })
  @ResponseMessage('Lấy bộ câu hỏi thành công')
  async getQuestionSetById(
    @Param('questionSetId', new ParseUUIDPipe({ version: '4' })) questionSetId: string
  ): Promise<QuestionSetDetailResponseDto> {
    return await this.questionSetService.getQuestionSetById(questionSetId)
  }

  @Patch(':questionSetId')
  @Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
  @ApiOperation({ summary: 'Update a question set' })
  @ApiBody({ description: 'Payload to update question set', type: UpdateQuestionSetDto })
  @ResponseMessage('Cập nhật bộ câu hỏi thành công')
  async update(
    @Param('questionSetId', new ParseUUIDPipe({ version: '4' })) questionSetId: string,
    @Body() dto: UpdateQuestionSetDto,
    @CurrentUser() currentUser: User
  ) {
    return await this.questionSetService.update(questionSetId, dto, currentUser)
  }

  @Delete(':questionSetId')
  @Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
  @ApiOperation({ summary: 'Soft delete a question set' })
  @ResponseMessage('Xóa bộ câu hỏi thành công')
  async delete(
    @Param('questionSetId', new ParseUUIDPipe({ version: '4' })) questionSetId: string,
    @CurrentUser() currentUser: User
  ) {
    return await this.questionSetService.softDelete(questionSetId, currentUser)
  }
}
