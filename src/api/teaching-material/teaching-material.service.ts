import { Injectable } from '@nestjs/common'
import { CreateTeachingMaterialDto } from './dto/create-teaching-material.dto'
import { UpdateTeachingMaterialDto } from './dto/update-teaching-material.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { TeachingMaterial } from '@api/teaching-material/entities/teaching-material.entity'
import { Repository } from 'typeorm'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { MaterialEntity } from '@api/material/entities/material.entity'
import { plainToInstance } from 'class-transformer'
import { TeachingMaterialResDto } from '@api/teaching-material/dto/teaching-material.res.dto'

@Injectable()
export class TeachingMaterialService {
  constructor(
    @InjectRepository(TeachingMaterial)
    private readonly teachingMaterialRepository: Repository<TeachingMaterial>,
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>
  ) {}

  async create(createTeachingMaterialDto: CreateTeachingMaterialDto): Promise<TeachingMaterialResDto> {
    try {
      // Check if lesson exists
      const lesson = await this.lessonRepository.findOne({ where: { lessonId: createTeachingMaterialDto.lesson_id } })
      if (!lesson) {
        throw new ValidationException(ErrorCode.L002, 'Lesson not found')
      }

      // Check if material exists
      const material = await this.materialRepository.findOne({
        where: { materialId: createTeachingMaterialDto.material_id }
      })
      if (!material) {
        throw new ValidationException(ErrorCode.M001, 'Material not found')
      }

      const teachingMaterial = this.teachingMaterialRepository.create({
        lesson: lesson,
        material: material,
        content: createTeachingMaterialDto.content
      })
      const savedTeachingMaterial = await this.teachingMaterialRepository.save(teachingMaterial)

      return plainToInstance(TeachingMaterialResDto, savedTeachingMaterial)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all teachingMaterial`
  }

  findOne(id: number) {
    return `This action returns a #${id} teachingMaterial`
  }

  update(id: number, updateTeachingMaterialDto: UpdateTeachingMaterialDto) {
    return `This action updates a #${id} teachingMaterial`
  }

  remove(id: number) {
    return `This action removes a #${id} teachingMaterial`
  }
}
