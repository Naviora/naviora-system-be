import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { LessonService } from './lesson.service'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ListLessonReqDto } from './dto/list-lesson.req.dto'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { RolesGuard } from '@guards/roles.guard'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { Roles } from '@decorators/roles.decorator'
import { Public } from '@decorators/auth.decorator'

@Controller({
  path: 'lessons',
  version: '1'
})
@ApiTags('Lessons')
// @UseGuards(RolesGuard)
// @Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
@Public()
@ApiBearerAuth('Authorization')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiBody({
    description: 'Data create lesson',
    type: CreateLessonDto,
    examples: {
      example1: {
        summary: 'Create a new lesson',
        value: {
          module_id: '123e4567-e89b-12d3-a456-426614174000',
          lesson_name: 'Lesson 1',
          lesson_description: 'Lesson 1 description'
        }
      }
    }
  })
  @ResponseMessage('Lesson created successfully')
  async create(@Body() createLessonDto: CreateLessonDto) {
    return await this.lessonService.create(createLessonDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  @ResponseMessage('Get all lessons successfully')
  async findAll(@Query() reqDto: ListLessonReqDto) {
    return await this.lessonService.findAll(reqDto)
  }

  @Get(':id')
  @ResponseMessage('Get lesson successfully')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.lessonService.findOne(id)
  }

  @Patch(':id')
  @ResponseMessage('Lesson updated successfully')
  async update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return await this.lessonService.update(id, updateLessonDto)
  }

  @Delete(':id')
  @ResponseMessage('Lesson deleted successfully')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.lessonService.remove(id)
  }
}
