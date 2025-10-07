import { Injectable } from '@nestjs/common'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from '@api/lesson/entities/lesson.entity'
import { Repository } from 'typeorm'

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>
  ) {}

  create(createLessonDto: CreateLessonDto) {
    const lesson = this.lessonRepository.create(createLessonDto)
    return this.lessonRepository.save(lesson)
  }

  findAll() {
    return this.lessonRepository.find()
  }

  findOne(id: string) {
    return this.lessonRepository.findOne({ where: { lesson_id: id } })
  }

  update(id: string, updateLessonDto: UpdateLessonDto) {
    return this.lessonRepository.update(id, updateLessonDto)
  }

  remove(id: string) {
    return this.lessonRepository.delete(id)
  }
}
