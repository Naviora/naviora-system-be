import { Injectable } from '@nestjs/common'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { Repository } from 'typeorm'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { ModuleEntity } from '@api/module/entities/module.entity'

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,

    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    try {
      const existingLesson = await this.lessonRepository.findOne({ where: { lessonName: createLessonDto.lesson_name } })
      if (existingLesson) {
        throw new ValidationException(ErrorCode.L001, 'Lesson name is already existed')
      }

      const module = await this.moduleRepository.findOne({ where: { moduleId: createLessonDto.module_id } })
      if (!module) {
        throw new ValidationException(ErrorCode.MODULE001, 'Module not found')
      }

      const lesson = this.lessonRepository.create({ ...createLessonDto, moduleId: module.moduleId })
      return this.lessonRepository.save(lesson)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.lessonRepository.find()
  }

  findOne(id: string) {
    return this.lessonRepository.findOne({ where: { lessonId: id } })
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    try {
      const lesson = await this.lessonRepository.findOne({ where: { lessonId: id } })
      if (!lesson) {
        throw new ValidationException(ErrorCode.L001, 'Lesson not found')
      }
      const module = await this.moduleRepository.findOne({ where: { moduleId: updateLessonDto.module_id } })
      if (!module) {
        throw new ValidationException(ErrorCode.MODULE001, 'Module not found')
      }

      return this.lessonRepository.update(id, {
        lessonName: updateLessonDto.lesson_name,
        lessonDescription: updateLessonDto.lesson_description,
        moduleId: updateLessonDto.module_id
      })
    } catch (error) {
      throw error
    }
  }

  remove(id: string) {
    return this.lessonRepository.delete(id)
  }
}
