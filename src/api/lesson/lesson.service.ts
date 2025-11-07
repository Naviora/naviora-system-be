import { Injectable } from '@nestjs/common'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { LessonResponseDto, MaterialResponseDto, ReviewedExerciseResponseDto } from './dto/lesson-response.dto'
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
import { User } from '@api/user/entities/user.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { LessonProgress } from '@api/lesson/entities/lesson-progress.entity'
import { extractUserRole } from '@utils/common.util'

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
    private readonly materialRepository: Repository<MaterialEntity>,

    @InjectRepository(ClassEnrolment)
    private readonly classEnrolmentRepository: Repository<ClassEnrolment>,
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepository: Repository<LessonProgress>
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
        lessonContent: createLessonDto.lesson_content,
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

  async findOne(id: string, currentUser?: User): Promise<LessonResponseDto> {
    try {
      // Check if lesson exists with module and class
      const lesson = await this.lessonRepository
        .createQueryBuilder('lesson')
        .leftJoinAndSelect('lesson.module', 'module')
        .leftJoinAndSelect('module.class', 'class')
        .leftJoinAndSelect('lesson.reviewedExercises', 'reviewedExercises')
        .where('lesson.lessonId = :id', { id })
        .getOne()
      if (!lesson) {
        throw new ValidationException(ErrorCode.L001, 'Lesson not found')
      }

      // Students can only access lessons belonging to their enrolled classes
      if (currentUser?.role?.name === RoleInAccount.Student && lesson.module?.class?.classId) {
        const isEnrolled = await this.classEnrolmentRepository.exists({
          where: { classId: lesson.module.class.classId, studentId: currentUser.id }
        })
        if (!isEnrolled) {
          throw new ValidationException(ErrorCode.V000, 'Student is not enrolled in this class', [
            { property: 'class_id', code: ErrorCode.V000 }
          ])
        }
      }

      // Check if teaching materials exists
      const teachingMaterials = await this.teachingMaterialRepository.find({
        where: { lesson: { lessonId: id } },
        relations: ['material']
      })
      // Just skip if no teaching materials

      // Get materials
      const materialByLessonId = teachingMaterials.map((teachingMaterial) => teachingMaterial.material.materialId)
      const materials = await this.materialRepository.find({ where: { materialId: In(materialByLessonId) } })

      const transformedMaterials = materials.map((material) =>
        plainToInstance(MaterialResponseDto, material, { excludeExtraneousValues: true })
      )

      const reviewedExercises = lesson.reviewedExercises?.map((reviewedExercise) =>
        plainToInstance(
          ReviewedExerciseResponseDto,
          {
            reviewedExerciseId: reviewedExercise.reviewedExerciseId,
            status: reviewedExercise.status,
            startTime: reviewedExercise.startTime,
            endTime: reviewedExercise.endTime,
            lecturerId: reviewedExercise.lecturerId
          },
          { excludeExtraneousValues: true }
        )
      )

      const result = plainToInstance(
        LessonResponseDto,
        {
          ...lesson,
          materials: transformedMaterials,
          reviewedExercises: reviewedExercises || []
        },
        { excludeExtraneousValues: true }
      )

      return result
    } catch (error) {
      throw error
    }
  }

  async toggleLessonCompletion(lessonId: string, currentUser: User) {
    const lesson = await this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.module', 'module')
      .leftJoinAndSelect('module.class', 'class')
      .where('lesson.lessonId = :id', { id: lessonId })
      .getOne()

    if (!lesson) {
      throw new ValidationException(ErrorCode.L001, 'Lesson not found')
    }

    const userRole = extractUserRole(currentUser)

    if (userRole !== RoleInAccount.Student) {
      throw new ValidationException(ErrorCode.V000, 'Only students can update lesson progress', [
        { property: 'role', code: ErrorCode.V000 }
      ])
    }

    if (lesson.module?.class?.classId) {
      const isEnrolled = await this.classEnrolmentRepository.exists({
        where: { classId: lesson.module.class.classId, studentId: currentUser.id }
      })
      if (!isEnrolled) {
        throw new ValidationException(ErrorCode.V000, 'Student is not enrolled in this class', [
          { property: 'class_id', code: ErrorCode.V000 }
        ])
      }
    }

    const existing = await this.lessonProgressRepository.findOne({ where: { lessonId, studentId: currentUser.id } })

    if (existing) {
      await this.lessonProgressRepository.delete({ lessonId, studentId: currentUser.id })
      return { lesson_id: lessonId, completed: false }
    }

    const created = this.lessonProgressRepository.create({
      lessonId,
      studentId: currentUser.id,
      completedAt: new Date()
    })
    const saved = await this.lessonProgressRepository.save(created)
    return { lesson_id: lessonId, completed: true, completed_at: saved.completedAt }
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    try {
      const lesson = await this.lessonRepository.findOne({ where: { lessonId: id } })
      if (!lesson) {
        throw new ValidationException(ErrorCode.L001, 'Lesson not found')
      }

      // Check if materials exist and create teaching materials
      if (updateLessonDto.materials && updateLessonDto.materials.length > 0) {
        const materials = await this.materialRepository.find({ where: { materialId: In(updateLessonDto.materials) } })

        if (materials.length !== updateLessonDto.materials.length) {
          const foundIds = materials.map((m) => m.materialId)
          const missingIds = updateLessonDto.materials.filter((id) => !foundIds.includes(id))
          console.log('Missing material IDs:', missingIds)
          throw new ValidationException(ErrorCode.M001, `Some materials not found: ${missingIds.join(', ')}`)
        }

        // Create teaching materials for each material
        for (const materialId of updateLessonDto.materials) {
          const existingTeachingMaterial = await this.teachingMaterialRepository.findOne({
            where: { lesson: { lessonId: id }, material: { materialId: materialId } }
          })

          if (!existingTeachingMaterial) {
            const teachingMaterial = this.teachingMaterialRepository.create({
              lesson: { lessonId: id },
              material: { materialId: materialId },
              content: `Material content for lesson ${lesson.lessonName}` // Default content
            })
            await this.teachingMaterialRepository.save(teachingMaterial)
          }
        }
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
