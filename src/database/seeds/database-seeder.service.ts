import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { User } from '@api/user/entities/user.entity'
import { Role } from '@api/role/entities/role.entity'
import { Class } from '@api/class/entities/class.entity'
import { ModuleEntity } from '@api/module/entities/module.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { AnswerEntity } from '@api/answer/entities/answer.entity'
import { RoleInAccounts } from './role-seed-data'
import { accountStatuses } from './account-seed-data'
import { classSeedData } from './class.seed'
import { moduleSeedData } from './module.seed'
import { lessonSeedData } from './lesson.seed'
import { questionSeedData } from './question.seed'
import { hashString } from '@utils/auth.util'

export class DatabaseSeederService {
  private readonly logger = new Logger(DatabaseSeederService.name)

  constructor(private readonly dataSource: DataSource) {}

  async seed(): Promise<void> {
    try {
      this.logger.log('Starting database seeding...')

      // Seed roles first
      await this.seedRoles()

      // Seed users
      await this.seedUsers()

      // Seed class
      await this.seedClass()

      // Seed module
      await this.seedModule()

      // Seed lesson
      await this.seedLesson()

      // Seed questions and answers
      await this.seedQuestionsAndAnswers()

      this.logger.log('Database seeding completed successfully!')
    } catch (error) {
      this.logger.error('Error during database seeding:', error)
      throw error
    }
  }

  private async seedRoles(): Promise<void> {
    this.logger.log('Seeding roles...')

    for (const roleData of RoleInAccounts) {
      const existingRole = await this.dataSource.getRepository(Role).findOne({
        where: { name: roleData.name }
      })

      if (!existingRole) {
        const role = this.dataSource.getRepository(Role).create({
          name: roleData.name,
          description: roleData.description,
          permissions: roleData.permissions,
          isActive: true
        })

        await this.dataSource.getRepository(Role).save(role)
        this.logger.log(`Created role: ${roleData.name}`)
      } else {
        this.logger.log(`Role already exists: ${roleData.name}`)
      }
    }
  }

  private async seedUsers(): Promise<void> {
    this.logger.log('Seeding users...')

    for (const userData of accountStatuses) {
      const existingUser = await this.dataSource.getRepository(User).findOne({
        where: { email: userData.email }
      })

      if (!existingUser) {
        // Find the role
        const role = await this.dataSource.getRepository(Role).findOne({
          where: { name: userData.role }
        })

        if (!role) {
          this.logger.warn(`Role not found: ${userData.role}`)
          continue
        }

        // Hash password if provided
        let hashedPassword = null
        if (userData.password) {
          hashedPassword = await hashString(userData.password)
        }

        const user = this.dataSource.getRepository(User).create({
          name: userData.name || 'Default User',
          email: userData.email,
          password: hashedPassword || 'defaultPassword',
          phone: userData.phone,
          address: userData.address,
          gender: userData.gender,
          dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null,
          role: role,
          status: userData.status
        })

        await this.dataSource.getRepository(User).save(user)
        this.logger.log(`Created user: ${userData.email}`)
      } else {
        this.logger.log(`User already exists: ${userData.email}`)
      }
    }
  }

  private async seedClass(): Promise<void> {
    this.logger.log('Seeding class...')

    for (const classData of classSeedData) {
      const existingClass = await this.dataSource.getRepository(Class).findOne({
        where: { classCode: classData.classCode }
      })

      if (!existingClass) {
        const classEntity = this.dataSource.getRepository(Class).create({
          classCode: classData.classCode,
          className: classData.className,
          classType: classData.classType,
          startDate: new Date(classData.startDate),
          endDate: new Date(classData.endDate),
          isActive: classData.isActive
        })

        await this.dataSource.getRepository(Class).save(classEntity)
        this.logger.log(`Created class: ${classData.className}`)
      } else {
        this.logger.log(`Class already exists: ${classData.className}`)
      }
    }
  }

  private async seedModule(): Promise<void> {
    this.logger.log('Seeding module...')

    // Get the created class
    const classEntity = await this.dataSource.getRepository(Class).findOne({
      where: { classCode: 'SINH12-2024' }
    })

    if (!classEntity) {
      this.logger.error('Class not found for module creation')
      return
    }

    for (const moduleData of moduleSeedData) {
      const existingModule = await this.dataSource.getRepository(ModuleEntity).findOne({
        where: { moduleCode: moduleData.moduleCode }
      })

      if (!existingModule) {
        const module = this.dataSource.getRepository(ModuleEntity).create({
          moduleCode: moduleData.moduleCode,
          moduleName: moduleData.moduleName,
          moduleDescription: moduleData.moduleDescription,
          banner: moduleData.banner,
          class: classEntity
        })

        await this.dataSource.getRepository(ModuleEntity).save(module)
        this.logger.log(`Created module: ${moduleData.moduleName}`)
      } else {
        this.logger.log(`Module already exists: ${moduleData.moduleName}`)
      }
    }
  }

  private async seedLesson(): Promise<void> {
    this.logger.log('Seeding lesson...')

    // Get the created module
    const moduleEntity = await this.dataSource.getRepository(ModuleEntity).findOne({
      where: { moduleCode: 'SINH12-MODULE-01' }
    })

    if (!moduleEntity) {
      this.logger.error('Module not found for lesson creation')
      return
    }

    for (const lessonData of lessonSeedData) {
      const existingLesson = await this.dataSource.getRepository(LessonEntity).findOne({
        where: { lessonName: lessonData.lessonName }
      })

      if (!existingLesson) {
        const lesson = this.dataSource.getRepository(LessonEntity).create({
          moduleId: moduleEntity.moduleId,
          lessonName: lessonData.lessonName,
          lessonDescription: lessonData.lessonDescription
        })

        await this.dataSource.getRepository(LessonEntity).save(lesson)
        this.logger.log(`Created lesson: ${lessonData.lessonName}`)
      } else {
        this.logger.log(`Lesson already exists: ${lessonData.lessonName}`)
      }
    }
  }

  private async seedQuestionsAndAnswers(): Promise<void> {
    this.logger.log('Seeding questions and answers...')

    // Get the created lesson
    const lessonEntity = await this.dataSource.getRepository(LessonEntity).findOne({
      where: { lessonName: 'Cơ chế di truyền và biến dị' }
    })

    if (!lessonEntity) {
      this.logger.error('Lesson not found for question creation')
      return
    }

    for (const questionData of questionSeedData) {
      // Check if question already exists
      const existingQuestion = await this.dataSource.getRepository(QuestionEntity).findOne({
        where: { content: questionData.content }
      })

      if (!existingQuestion) {
        // Create question
        const question = this.dataSource.getRepository(QuestionEntity).create({
          lessonId: lessonEntity.lessonId,
          content: questionData.content,
          type: questionData.type,
          difficulty: questionData.difficulty,
          additionalImage: questionData.additionalImage
        })

        const savedQuestion = await this.dataSource.getRepository(QuestionEntity).save(question)

        // Create answers
        const answers = []
        for (const answerData of questionData.answers) {
          const answer = this.dataSource.getRepository(AnswerEntity).create({
            question: savedQuestion,
            content: answerData.content,
            isCorrect: answerData.isCorrect,
            additionalImage: answerData.additionalImage
          })
          answers.push(await this.dataSource.getRepository(AnswerEntity).save(answer))
        }

        // Update correct answer ID in question
        const correctAnswer = answers.find((answer) => answer.isCorrect)
        if (correctAnswer) {
          savedQuestion.correctAnswerId = correctAnswer.answerId
          await this.dataSource.getRepository(QuestionEntity).save(savedQuestion)
        }

        this.logger.log(`Created question with ${answers.length} answers: ${questionData.content.substring(0, 50)}...`)
      } else {
        this.logger.log(`Question already exists: ${questionData.content.substring(0, 50)}...`)
      }
    }
  }
}
