import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { LessonService } from './lesson.service'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller({
  path: 'lessons',
  version: '1'
})
@ApiTags('Lessons')
@ApiBearerAuth('Authorization')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto)
  }

  @Get()
  findAll() {
    return this.lessonService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(id, updateLessonDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id)
  }
}
