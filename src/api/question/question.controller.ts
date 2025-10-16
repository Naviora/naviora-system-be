import { Controller, Post, Get, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe, Patch } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { QuestionService } from './question.service'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { QuestionResponseDto, CreateQuestionResponseDto } from './dto/question-response.dto'
import { ListQuestionReqDto } from '@api/question/dto/list-question.req.dto'
import { RolesGuard } from '@guards/roles.guard'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { Roles } from '@decorators/roles.decorator'
import { ResponseMessage } from '@decorators/response-message.decorator'

@ApiTags('Questions')
@Controller({
  path: 'questions',
  version: '1'
})
@UseGuards(RolesGuard)
@Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
@ApiBearerAuth('Authorization')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question with answers' })
  @ApiResponse({
    status: 201,
    description: 'Question created successfully',
    type: CreateQuestionResponseDto
  })
  @ResponseMessage('Question created successfully')
  async create(@Body() createQuestionDto: CreateQuestionDto): Promise<CreateQuestionResponseDto> {
    return this.questionService.create(createQuestionDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({
    status: 200,
    description: 'List of questions retrieved successfully',
    type: [QuestionResponseDto]
  })
  @ResponseMessage('Get all questions successfully')
  async findAll(@Query() reqDto: ListQuestionReqDto) {
    return await this.questionService.findAll(reqDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiResponse({
    status: 200,
    description: 'Question retrieved successfully',
    type: QuestionResponseDto
  })
  @ResponseMessage('Get question successfully')
  async findOne(@Param('id') id: string): Promise<QuestionResponseDto> {
    return this.questionService.findOne(id)
  }

  @Patch(':id')
  @ResponseMessage('Question updated successfully')
  @ApiResponse({
    status: 200,
    description: 'Question updated successfully',
    type: QuestionResponseDto
  })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ): Promise<QuestionResponseDto> {
    return await this.questionService.update(id, updateQuestionDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  @ApiResponse({
    status: 200,
    description: 'Question deleted successfully',
    type: QuestionResponseDto
  })
  @ResponseMessage('Question deleted successfully')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<QuestionResponseDto> {
    return await this.questionService.remove(id)
  }
}
