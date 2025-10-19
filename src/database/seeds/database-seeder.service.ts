import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { User } from '@api/user/entities/user.entity'
import { Role } from '@api/role/entities/role.entity'
import { Class } from '@api/class/entities/class.entity'
import { ModuleEntity } from '@api/module/entities/module.entity'
import { LessonEntity } from '@api/lesson/entities/lesson.entity'
import { QuestionEntity } from '@api/question/entities/question.entity'
import { AnswerEntity } from '@api/answer/entities/answer.entity'
import { QuestionSetEntity } from '@api/question-set/entities/question-set.entity'
import { RoleInAccounts } from './role-seed-data'
import { accountStatuses } from './account-seed-data'
import { classSeedData } from './class.seed'
import { moduleSeedData } from './module.seed'
import { lessonSeedData } from './lesson.seed'
import { questionSeedData } from './question.seed'
import { questionSetSeedData } from './question-set.seed'
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

      // Seed question sets
      await this.seedQuestionSets()

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

    // Get all created classes
    const classes = await this.dataSource.getRepository(Class).find()

    if (classes.length === 0) {
      this.logger.error('No classes found for module creation')
      return
    }

    for (const moduleData of moduleSeedData) {
      const existingModule = await this.dataSource.getRepository(ModuleEntity).findOne({
        where: { moduleCode: moduleData.moduleCode }
      })

      if (!existingModule) {
        // Find appropriate class based on module code
        let targetClass = classes.find((c) => c.classCode.includes('SINH12'))

        if (moduleData.moduleCode.includes('SINH11')) {
          targetClass = classes.find((c) => c.classCode.includes('SINH11'))
        } else if (moduleData.moduleCode.includes('SINH10')) {
          targetClass = classes.find((c) => c.classCode.includes('SINH10'))
        }

        if (!targetClass) {
          this.logger.warn(`No appropriate class found for module: ${moduleData.moduleCode}`)
          continue
        }

        const module = this.dataSource.getRepository(ModuleEntity).create({
          moduleCode: moduleData.moduleCode,
          moduleName: moduleData.moduleName,
          moduleDescription: moduleData.moduleDescription,
          banner: moduleData.banner,
          class: targetClass
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

    // Get all created modules
    const modules = await this.dataSource.getRepository(ModuleEntity).find()

    if (modules.length === 0) {
      this.logger.error('No modules found for lesson creation')
      return
    }

    for (const lessonData of lessonSeedData) {
      const existingLesson = await this.dataSource.getRepository(LessonEntity).findOne({
        where: { lessonName: lessonData.lessonName }
      })

      if (!existingLesson) {
        // Find appropriate module - default to SINH12-MODULE-01 for now
        // In a more complex system, you might want to map lessons to specific modules
        let targetModule = modules.find((m) => m.moduleCode === 'SINH12-MODULE-01')

        if (!targetModule) {
          // Fallback to any SINH12 module
          targetModule = modules.find((m) => m.moduleCode.includes('SINH12'))
        }

        if (!targetModule) {
          this.logger.warn(`No appropriate module found for lesson: ${lessonData.lessonName}`)
          continue
        }

        const lesson = this.dataSource.getRepository(LessonEntity).create({
          moduleId: targetModule.moduleId,
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

    // Get all created lessons
    const lessons = await this.dataSource.getRepository(LessonEntity).find()

    if (lessons.length === 0) {
      this.logger.error('No lessons found for question creation')
      return
    }

    for (const questionData of questionSeedData) {
      // Check if question already exists
      const existingQuestion = await this.dataSource.getRepository(QuestionEntity).findOne({
        where: { content: questionData.content }
      })

      if (!existingQuestion) {
        // Find appropriate lesson - default to 'Cơ chế di truyền và biến dị' for now
        // In a more complex system, you might want to map questions to specific lessons
        let targetLesson = lessons.find((l) => l.lessonName === 'Cơ chế di truyền và biến dị')

        if (!targetLesson) {
          // Fallback to any lesson
          targetLesson = lessons[0]
        }

        if (!targetLesson) {
          this.logger.warn(`No appropriate lesson found for question: ${questionData.content.substring(0, 50)}...`)
          continue
        }

        // Create question
        const question = this.dataSource.getRepository(QuestionEntity).create({
          lessonId: targetLesson.lessonId,
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

  private async seedQuestionSets(): Promise<void> {
    this.logger.log('Seeding question sets...')

    // Get a lecturer user (assuming there's at least one user with lecturer role)
    const lecturer = await this.dataSource.getRepository(User).findOne({
      where: { role: { name: 'Lecturer' } },
      relations: ['role']
    })

    if (!lecturer) {
      this.logger.error('No lecturer found for question set creation')
      return
    }

    // Get some questions to populate the question sets
    const questions = await this.dataSource.getRepository(QuestionEntity).find({
      take: 50 // Get up to 50 questions
    })

    if (questions.length === 0) {
      this.logger.error('No questions found for question set creation')
      return
    }

    for (const questionSetData of questionSetSeedData) {
      const existingQuestionSet = await this.dataSource.getRepository(QuestionSetEntity).findOne({
        where: { title: questionSetData.title }
      })

      if (!existingQuestionSet) {
        // Select random questions for this question set
        const totalQuestions = questionSetData.config.general.total_questions
        const selectedQuestions = questions
          .sort(() => 0.5 - Math.random()) // Shuffle questions
          .slice(0, Math.min(totalQuestions, questions.length))
          .map((q) => q.questionId)

        // Update the question set data with actual question IDs
        const questionSetToCreate = {
          ...questionSetData,
          questions: selectedQuestions
        }

        const questionSet = this.dataSource.getRepository(QuestionSetEntity).create({
          title: questionSetToCreate.title,
          description: questionSetToCreate.description,
          questions: questionSetToCreate.questions,
          config: questionSetToCreate.config,
          lecturer: lecturer
        })

        await this.dataSource.getRepository(QuestionSetEntity).save(questionSet)
        this.logger.log(`Created question set: ${questionSetData.title} with ${selectedQuestions.length} questions`)
      } else {
        this.logger.log(`Question set already exists: ${questionSetData.title}`)
      }
    }
  }
}
