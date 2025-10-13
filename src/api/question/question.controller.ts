import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { QuestionService } from './question.service'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { QuestionResponseDto, CreateQuestionResponseDto } from './dto/question-response.dto'
import { Public } from '@decorators/auth.decorator'

@ApiTags('Questions')
@Controller('questions')
@UseInterceptors(ClassSerializerInterceptor)
@Public()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question with answers' })
  @ApiResponse({
    status: 201,
    description: 'Question created successfully',
    type: CreateQuestionResponseDto
  })
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
  async findAll(): Promise<QuestionResponseDto[]> {
    return this.questionService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiResponse({
    status: 200,
    description: 'Question retrieved successfully',
    type: QuestionResponseDto
  })
  async findOne(@Param('id') id: string): Promise<QuestionResponseDto> {
    return this.questionService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a question' })
  @ApiResponse({
    status: 200,
    description: 'Question updated successfully',
    type: QuestionResponseDto
  })
  async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto): Promise<QuestionResponseDto> {
    return this.questionService.update(id, updateQuestionDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  @ApiResponse({
    status: 200,
    description: 'Question deleted successfully',
    type: QuestionResponseDto
  })
  async remove(@Param('id') id: string): Promise<QuestionResponseDto> {
    return this.questionService.remove(id)
  }
}
