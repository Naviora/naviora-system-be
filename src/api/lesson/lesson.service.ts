import { Injectable } from '@nestjs/common'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { LessonResponseDto, MaterialResponseDto } from './dto/lesson-response.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { In, Repository } from 'typeorm'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { ModuleEntity } from '@api/module/entities/module.entity'
import { paginate } from '@utils/offset-pagination'
import { ListLessonReqDto } from './dto/list-lesson.req.dto'
import { TeachingMaterial } from '@api/teaching-material/entities/teaching-material.entity'
import { MaterialEntity } from '@api/material/entities/material.entity'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,

    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,

    @InjectRepository(TeachingMaterial)
    private readonly teachingMaterialRepository: Repository<TeachingMaterial>,

    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>
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

      const lesson = this.lessonRepository.create({
        lessonName: createLessonDto.lesson_name,
        lessonDescription: createLessonDto.lesson_description,
        moduleId: module.moduleId
      })
      return this.lessonRepository.save(lesson)
    } catch (error) {
      throw error
    }
  }

  async findAll(reqDto: ListLessonReqDto) {
    try {
      const query = this.lessonRepository.createQueryBuilder('lessons').orderBy('lessons.createdAt', 'DESC')

      const [lessons, metaDto] = await paginate<LessonEntity>(query, reqDto, {
        skipCount: false,
        takeAll: false
      })

      return {
        lessons,
        pagination: metaDto
      }
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string): Promise<LessonResponseDto> {
    try {
      // Check if lesson exists
      const lesson = await this.lessonRepository.findOne({ where: { lessonId: id } })
      if (!lesson) {
        throw new ValidationException(ErrorCode.L001, 'Lesson not found')
      }

      // Check if teaching materials exists
      const teachingMaterials = await this.teachingMaterialRepository.find({
        where: { lesson: { lessonId: id } },
        relations: ['material']
      })
      if (teachingMaterials.length === 0) {
        throw new ValidationException(ErrorCode.T001, 'Teaching material not found')
      }

      // Get materials
      const materialByLessonId = teachingMaterials.map((teachingMaterial) => teachingMaterial.material.materialId)
      const materials = await this.materialRepository.find({ where: { materialId: In(materialByLessonId) } })

      const transformedMaterials = materials.map((material) =>
        plainToInstance(MaterialResponseDto, material, { excludeExtraneousValues: true })
      )

      const result = plainToInstance(
        LessonResponseDto,
        {
          ...lesson,
          materials: transformedMaterials
        },
        { excludeExtraneousValues: true }
      )

      return result
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    try {
      const lesson = await this.lessonRepository.findOne({ where: { lessonId: id } })
      if (!lesson) {
        throw new ValidationException(ErrorCode.L001, 'Lesson not found')
      }

      await this.lessonRepository.update(id, {
        lessonName: updateLessonDto.lesson_name,
        lessonDescription: updateLessonDto.lesson_description,
        lessonContent: updateLessonDto.lesson_content
      })

      // Fetch the updated lesson
      const updatedLesson = await this.lessonRepository.findOne({ where: { lessonId: id } })
      if (!updatedLesson) {
        throw new ValidationException(ErrorCode.L001, 'Lesson not found after update')
      }

      // Get teaching materials with their related materials
      const teachingMaterials = await this.teachingMaterialRepository.find({
        where: { lesson: { lessonId: id } },
        relations: ['material']
      })

      // Extract materials from teaching materials
      const materials = teachingMaterials.map((tm) => tm.material)

      const transformedMaterials = materials.map((material) =>
        plainToInstance(MaterialResponseDto, material, { excludeExtraneousValues: true })
      )

      return plainToInstance(
        LessonResponseDto,
        {
          ...updatedLesson,
          materials: transformedMaterials
        },
        { excludeExtraneousValues: true }
      )
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const lesson = await this.lessonRepository.findOne({ where: { lessonId: id } })
      if (!lesson) {
        throw new ValidationException(ErrorCode.L001, 'Lesson not found')
      }
      return this.lessonRepository.delete(id)
    } catch (error) {
      throw error
    }
  }
}
