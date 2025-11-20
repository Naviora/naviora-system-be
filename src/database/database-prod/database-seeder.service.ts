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
import { teachingModuleSeedData } from './teaching-module.seed'
import { classEnrolmentSeedData } from './class-enrolment.seed'
import { reviewedExerciseSeedData } from './reviewed-exercise.seed'
import { reviewedExerciseSubmissionSeedData } from './reviewed-exercise-submission.seed'
import { entryTestSeedData } from './entry-test.seed'
import { entryTestSubmissionSeedData } from './entry-test-submission.seed'
import { finalExamSeedData } from './final-exam.seed'
import { finalExamSubmissionSeedData } from './final-exam-submission.seed'
import { materialSeedData } from './material.seed'
import { teachingMaterialSeedData } from './teaching-material.seed'
import { streakSeedData } from './streak.seed'
import { meetingEventSeedData } from './meeting-event.seed'
import { lessonProgressSeedData } from './lesson-progress.seed'
import { hashString } from '@utils/auth.util'
import { TeachingModule } from '@api/module/entities/teaching-module.entity'
import { ClassEnrolment } from '@api/class/entities/class-enrolment.entity'
import { ReviewedExerciseEntity } from '@api/reviewed-exercise/entities/reviewed-exercise.entity'
import { ReviewedExerciseSubmissionEntity } from '@api/reviewed-exercise/entities/reviewed-exercise-submission.entity'
import { EntryTestEntity } from '@api/entry-test/entities/entry-test.entity'
import { EntryTestSubmissionEntity } from '@api/entry-test/entities/entry-test-submission.entity'
import { FinalExamEntity } from '@api/final-exam/entities/final-exam.entity'
import { FinalExamSubmissionEntity } from '@api/final-exam/entities/final-exam-submission.entity'
import { MaterialEntity } from '@api/material/entities/material.entity'
import { TeachingMaterial } from '@api/teaching-material/entities/teaching-material.entity'
import { Streak } from '@api/streak/entities/streak.entity'
import { MeetingEventEntity } from '@api/meeting-events/entities/meeting-event.entity'
import { LessonProgress } from '@api/lesson/entities/lesson-progress.entity'
import { ExamStatus } from '@common/enums/exam-status.enum'

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

      // Seed teaching modules (assign lecturers to modules)
      await this.seedTeachingModules()

      // Seed class enrolments (enroll students in classes)
      await this.seedClassEnrolments()

      // Seed reviewed exercises
      await this.seedReviewedExercises()

      // Seed reviewed exercise submissions
      await this.seedReviewedExerciseSubmissions()

      // Seed materials (must be before teaching materials)
      await this.seedMaterials()

      // Seed teaching materials (links materials to lessons)
      await this.seedTeachingMaterials()

      // Seed entry tests
      await this.seedEntryTests()

      // Seed entry test submissions
      await this.seedEntryTestSubmissions()

      // Seed final exams
      await this.seedFinalExams()

      // Seed final exam submissions
      await this.seedFinalExamSubmissions()

      // Seed streaks (student activity tracking)
      await this.seedStreaks()

      // Seed meeting events
      await this.seedMeetingEvents()

      // Seed lesson progress (student lesson completion)
      await this.seedLessonProgress()

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
        // Find appropriate module by moduleCode from seed data
        let targetModule = modules.find((m) => m.moduleCode === lessonData.moduleCode)

        if (!targetModule) {
          // Fallback: try to find module by grade (SINH10, SINH11, SINH12)
          if (lessonData.moduleCode.includes('SINH10')) {
            targetModule = modules.find((m) => m.moduleCode.includes('SINH10'))
          } else if (lessonData.moduleCode.includes('SINH11')) {
            targetModule = modules.find((m) => m.moduleCode.includes('SINH11'))
          } else if (lessonData.moduleCode.includes('SINH12')) {
            targetModule = modules.find((m) => m.moduleCode.includes('SINH12'))
          }
        }

        if (!targetModule) {
          this.logger.warn(
            `No appropriate module found for lesson: ${lessonData.lessonName} (moduleCode: ${lessonData.moduleCode})`
          )
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
        // Find appropriate lesson by lessonName or use fallback
        let targetLesson: LessonEntity | undefined

        if ((questionData as any).lessonName) {
          // Match by lesson name if provided
          targetLesson = lessons.find((l) => l.lessonName === (questionData as any).lessonName)
        }

        if (!targetLesson) {
          // Fallback: try to find lesson based on question content keywords
          // For Biology questions, try to match with relevant lessons
          const content = questionData.content.toLowerCase()
          if (content.includes('adn') || content.includes('dna') || content.includes('nhân đôi')) {
            targetLesson = lessons.find((l) => l.lessonName.includes('ADN') || l.lessonName.includes('Nhân đôi'))
          } else if (content.includes('đột biến')) {
            targetLesson = lessons.find((l) => l.lessonName.includes('Đột biến'))
          } else if (content.includes('di truyền') || content.includes('mendel')) {
            targetLesson = lessons.find((l) => l.lessonName.includes('Di truyền') || l.lessonName.includes('Mendel'))
          } else if (content.includes('tiến hóa')) {
            targetLesson = lessons.find((l) => l.lessonName.includes('Tiến hóa'))
          } else if (content.includes('quần thể') || content.includes('sinh thái')) {
            targetLesson = lessons.find((l) => l.lessonName.includes('Quần thể') || l.lessonName.includes('Sinh thái'))
          } else if (content.includes('tế bào')) {
            targetLesson = lessons.find((l) => l.lessonName.includes('Tế bào'))
          } else if (content.includes('quang hợp')) {
            targetLesson = lessons.find((l) => l.lessonName.includes('Quang hợp'))
          } else if (content.includes('tuần hoàn') || content.includes('hô hấp')) {
            targetLesson = lessons.find((l) => l.lessonName.includes('Tuần hoàn') || l.lessonName.includes('Hô hấp'))
          } else if (content.includes('miễn dịch')) {
            targetLesson = lessons.find((l) => l.lessonName.includes('Miễn dịch'))
          }
        }

        if (!targetLesson) {
          // Final fallback: use first available lesson
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

  private async seedTeachingModules(): Promise<void> {
    this.logger.log('Seeding teaching modules...')

    // Get all lecturers
    const lecturers = await this.dataSource.getRepository(User).find({
      where: { role: { name: 'Lecturer' } },
      relations: ['role']
    })

    if (lecturers.length === 0) {
      this.logger.warn('No lecturers found for teaching module creation')
      return
    }

    // Get all modules
    const modules = await this.dataSource.getRepository(ModuleEntity).find()

    if (modules.length === 0) {
      this.logger.warn('No modules found for teaching module creation')
      return
    }

    for (const teachingModuleData of teachingModuleSeedData) {
      // Find lecturer by email
      const lecturer = lecturers.find((l) => l.email === teachingModuleData.lecturerEmail)

      if (!lecturer) {
        this.logger.warn(`Lecturer not found: ${teachingModuleData.lecturerEmail}`)
        continue
      }

      // Find module by code
      const module = modules.find((m) => m.moduleCode === teachingModuleData.moduleCode)

      if (!module) {
        this.logger.warn(`Module not found: ${teachingModuleData.moduleCode}`)
        continue
      }

      // Check if teaching module already exists
      const existingTeachingModule = await this.dataSource.getRepository(TeachingModule).findOne({
        where: {
          module: { moduleId: module.moduleId },
          lecturer: { id: lecturer.id }
        }
      })

      if (!existingTeachingModule) {
        const teachingModule = this.dataSource.getRepository(TeachingModule).create({
          module,
          lecturer,
          isActive: teachingModuleData.isActive
        })

        await this.dataSource.getRepository(TeachingModule).save(teachingModule)
        this.logger.log(`Created teaching module assignment: ${lecturer.name} -> ${module.moduleName}`)
      } else {
        this.logger.log(`Teaching module assignment already exists: ${lecturer.name} -> ${module.moduleName}`)
      }
    }
  }

  private async seedClassEnrolments(): Promise<void> {
    this.logger.log('Seeding class enrolments...')

    // Get all students
    const students = await this.dataSource.getRepository(User).find({
      where: { role: { name: 'Student' } },
      relations: ['role']
    })

    if (students.length === 0) {
      this.logger.warn('No students found for class enrolment creation')
      return
    }

    // Get all classes
    const classes = await this.dataSource.getRepository(Class).find()

    if (classes.length === 0) {
      this.logger.warn('No classes found for class enrolment creation')
      return
    }

    for (const enrolmentData of classEnrolmentSeedData) {
      // Find student by email
      const student = students.find((s) => s.email === enrolmentData.studentEmail)

      if (!student) {
        this.logger.warn(`Student not found: ${enrolmentData.studentEmail}`)
        continue
      }

      // Find class by code
      const classEntity = classes.find((c) => c.classCode === enrolmentData.classCode)

      if (!classEntity) {
        this.logger.warn(`Class not found: ${enrolmentData.classCode}`)
        continue
      }

      // Check if enrolment already exists
      const existingEnrolment = await this.dataSource.getRepository(ClassEnrolment).findOne({
        where: {
          student: { id: student.id },
          class: { classId: classEntity.classId }
        }
      })

      if (!existingEnrolment) {
        const enrolment = this.dataSource.getRepository(ClassEnrolment).create({
          student,
          class: classEntity,
          enrolmentDate: new Date(enrolmentData.enrolmentDate)
        })

        await this.dataSource.getRepository(ClassEnrolment).save(enrolment)
        this.logger.log(`Created class enrolment: ${student.name} -> ${classEntity.className}`)
      } else {
        this.logger.log(`Class enrolment already exists: ${student.name} -> ${classEntity.className}`)
      }
    }
  }

  private async seedReviewedExercises(): Promise<void> {
    this.logger.log('Seeding reviewed exercises...')

    // Get all lecturers
    const lecturers = await this.dataSource.getRepository(User).find({
      where: { role: { name: 'Lecturer' } },
      relations: ['role']
    })

    if (lecturers.length === 0) {
      this.logger.warn('No lecturers found for reviewed exercise creation')
      return
    }

    // Get all lessons
    const lessons = await this.dataSource.getRepository(LessonEntity).find()

    if (lessons.length === 0) {
      this.logger.warn('No lessons found for reviewed exercise creation')
      return
    }

    // Get all question sets
    const questionSets = await this.dataSource.getRepository(QuestionSetEntity).find()

    if (questionSets.length === 0) {
      this.logger.warn('No question sets found for reviewed exercise creation')
      return
    }

    for (const exerciseData of reviewedExerciseSeedData) {
      // Find lecturer by email
      const lecturer = lecturers.find((l) => l.email === exerciseData.lecturerEmail)

      if (!lecturer) {
        this.logger.warn(`Lecturer not found: ${exerciseData.lecturerEmail}`)
        continue
      }

      // Find lesson by name
      const lesson = lessons.find((l) => l.lessonName === exerciseData.lessonName)

      if (!lesson) {
        this.logger.warn(`Lesson not found: ${exerciseData.lessonName}`)
        continue
      }

      // Find question sets by titles
      const exerciseQuestionSets = questionSets.filter((qs) => exerciseData.questionSetTitles.includes(qs.title))

      if (exerciseQuestionSets.length === 0) {
        this.logger.warn(`No question sets found for reviewed exercise: ${exerciseData.questionSetTitles.join(', ')}`)
        continue
      }

      // Check if reviewed exercise already exists (by lesson and status)
      const existingExercise = await this.dataSource.getRepository(ReviewedExerciseEntity).findOne({
        where: {
          lessonId: lesson.lessonId,
          lecturerId: lecturer.id,
          status: exerciseData.status
        }
      })

      if (!existingExercise) {
        const reviewedExercise = this.dataSource.getRepository(ReviewedExerciseEntity).create({
          lessonId: lesson.lessonId,
          lecturerId: lecturer.id,
          status: exerciseData.status,
          startTime: new Date(exerciseData.startTime),
          endTime: new Date(exerciseData.endTime),
          lecturer,
          createdBy: lecturer,
          questionSets: exerciseQuestionSets
        })

        await this.dataSource.getRepository(ReviewedExerciseEntity).save(reviewedExercise)
        this.logger.log(`Created reviewed exercise: ${exerciseData.lessonName} (${exerciseData.status})`)
      } else {
        this.logger.log(`Reviewed exercise already exists: ${exerciseData.lessonName} (${exerciseData.status})`)
      }
    }
  }

  private async seedReviewedExerciseSubmissions(): Promise<void> {
    this.logger.log('Seeding reviewed exercise submissions...')

    // Get all students
    const students = await this.dataSource.getRepository(User).find({
      where: { role: { name: 'Student' } },
      relations: ['role']
    })

    if (students.length === 0) {
      this.logger.warn('No students found for reviewed exercise submission creation')
      return
    }

    // Get all reviewed exercises with their question sets and lesson
    const reviewedExercises = await this.dataSource
      .getRepository(ReviewedExerciseEntity)
      .createQueryBuilder('reviewedExercise')
      .leftJoinAndSelect('reviewedExercise.questionSets', 'questionSets')
      .leftJoinAndSelect('reviewedExercise.lesson', 'lesson')
      .getMany()

    if (reviewedExercises.length === 0) {
      this.logger.warn('No reviewed exercises found for submission creation')
      return
    }

    for (const submissionData of reviewedExerciseSubmissionSeedData) {
      // Find student by email
      const student = students.find((s) => s.email === submissionData.studentEmail)

      if (!student) {
        this.logger.warn(`Student not found: ${submissionData.studentEmail}`)
        continue
      }

      // Find reviewed exercise by matching title pattern or lesson name
      let targetExercise: ReviewedExerciseEntity | undefined

      // Safely check for reviewedExerciseTitle property
      const submissionAny = submissionData as any
      const reviewedExerciseTitle = submissionAny.reviewedExerciseTitle
      const lessonName = submissionAny.lessonName
      const hasReviewedExerciseTitle = reviewedExerciseTitle && typeof reviewedExerciseTitle === 'string'
      const hasLessonName = lessonName && typeof lessonName === 'string'

      if (hasReviewedExerciseTitle) {
        // Match by title pattern (e.g., "Lesson Name - Status")
        const exerciseTitleParts = reviewedExerciseTitle.split(' - ')
        const extractedLessonName = exerciseTitleParts[0]
        const statusText = exerciseTitleParts[1] || ''

        if (statusText.includes('Completed')) {
          targetExercise = reviewedExercises.find(
            (re) => re.lesson.lessonName === extractedLessonName && re.status === ExamStatus.COMPLETED
          )
        } else if (statusText.includes('Active')) {
          targetExercise = reviewedExercises.find(
            (re) => re.lesson.lessonName === extractedLessonName && re.status === ExamStatus.ACTIVE
          )
        } else {
          // Try to find by lesson name with any status
          targetExercise = reviewedExercises.find((re) => re.lesson.lessonName === extractedLessonName)
        }
      } else if (hasLessonName) {
        // Match by lesson name directly
        // Try to find active exercise first, then any status
        targetExercise =
          reviewedExercises.find((re) => re.lesson.lessonName === lessonName && re.status === ExamStatus.ACTIVE) ||
          reviewedExercises.find((re) => re.lesson.lessonName === lessonName)
      }

      if (!targetExercise) {
        const identifier = reviewedExerciseTitle || lessonName || 'unknown'
        this.logger.warn(`Reviewed exercise not found for submission: ${identifier}`)
        continue
      }

      // Get a question set from the reviewed exercise
      if (!targetExercise.questionSets || targetExercise.questionSets.length === 0) {
        this.logger.warn(`No question sets found for reviewed exercise: ${targetExercise.reviewedExerciseId}`)
        continue
      }

      const questionSet = targetExercise.questionSets[0]

      // Check if submission already exists
      const existingSubmission = await this.dataSource.getRepository(ReviewedExerciseSubmissionEntity).findOne({
        where: {
          studentId: student.id,
          reviewedExerciseId: targetExercise.reviewedExerciseId,
          questionSetId: questionSet.questionSetId
        }
      })

      if (!existingSubmission) {
        const submission = this.dataSource.getRepository(ReviewedExerciseSubmissionEntity).create({
          studentId: student.id,
          reviewedExerciseId: targetExercise.reviewedExerciseId,
          questionSetId: questionSet.questionSetId,
          attemptStatus: submissionData.attemptStatus,
          score: submissionData.score,
          submittedAt: submissionData.submittedAt ? new Date(submissionData.submittedAt) : null,
          note: submissionData.note,
          penalty: submissionData.penalty,
          answered: submissionData.score !== null ? { sample: 'data' } : null // Placeholder
        })

        await this.dataSource.getRepository(ReviewedExerciseSubmissionEntity).save(submission)
        this.logger.log(
          `Created reviewed exercise submission: ${student.name} -> ${lessonName} (Score: ${submissionData.score ?? 'N/A'})`
        )
      } else {
        this.logger.log(`Reviewed exercise submission already exists: ${student.name} -> ${lessonName}`)
      }
    }
  }

  private async seedMaterials(): Promise<void> {
    this.logger.log('Seeding materials...')

    // Get all lecturers
    const lecturers = await this.dataSource.getRepository(User).find({
      where: { role: { name: 'Lecturer' } },
      relations: ['role']
    })

    if (lecturers.length === 0) {
      this.logger.warn('No lecturers found for material creation')
      return
    }

    for (const materialData of materialSeedData) {
      // Find lecturer by email
      const lecturer = lecturers.find((l) => l.email === materialData.lecturerEmail)

      if (!lecturer) {
        this.logger.warn(`Lecturer not found: ${materialData.lecturerEmail}`)
        continue
      }

      // Check if material already exists
      const existingMaterial = await this.dataSource.getRepository(MaterialEntity).findOne({
        where: { materialName: materialData.materialName }
      })

      if (!existingMaterial) {
        const material = this.dataSource.getRepository(MaterialEntity).create({
          lecturerId: lecturer.id,
          materialName: materialData.materialName,
          materialType: materialData.materialType,
          materialPath: materialData.materialPath
        })

        await this.dataSource.getRepository(MaterialEntity).save(material)
        this.logger.log(`Created material: ${materialData.materialName}`)
      } else {
        this.logger.log(`Material already exists: ${materialData.materialName}`)
      }
    }
  }

  private async seedTeachingMaterials(): Promise<void> {
    this.logger.log('Seeding teaching materials...')

    // Get all materials
    const materials = await this.dataSource.getRepository(MaterialEntity).find()

    if (materials.length === 0) {
      this.logger.warn('No materials found for teaching material creation')
      return
    }

    // Get all lessons
    const lessons = await this.dataSource.getRepository(LessonEntity).find()

    if (lessons.length === 0) {
      this.logger.warn('No lessons found for teaching material creation')
      return
    }

    for (const teachingMaterialData of teachingMaterialSeedData) {
      // Find lesson by name
      const lesson = lessons.find((l) => l.lessonName === teachingMaterialData.lessonName)

      if (!lesson) {
        this.logger.warn(`Lesson not found: ${teachingMaterialData.lessonName}`)
        continue
      }

      // Find material by name
      const material = materials.find((m) => m.materialName === teachingMaterialData.materialName)

      if (!material) {
        this.logger.warn(`Material not found: ${teachingMaterialData.materialName}`)
        continue
      }

      // Check if teaching material already exists
      const existingTeachingMaterial = await this.dataSource.getRepository(TeachingMaterial).findOne({
        where: {
          lesson: { lessonId: lesson.lessonId },
          material: { materialId: material.materialId }
        }
      })

      if (!existingTeachingMaterial) {
        const teachingMaterial = this.dataSource.getRepository(TeachingMaterial).create({
          lesson,
          material,
          content: teachingMaterialData.content
        })

        await this.dataSource.getRepository(TeachingMaterial).save(teachingMaterial)
        this.logger.log(`Created teaching material: ${lesson.lessonName} -> ${material.materialName}`)
      } else {
        this.logger.log(`Teaching material already exists: ${lesson.lessonName} -> ${material.materialName}`)
      }
    }
  }

  private async seedEntryTests(): Promise<void> {
    this.logger.log('Seeding entry tests...')

    // Get all lecturers
    const lecturers = await this.dataSource.getRepository(User).find({
      where: { role: { name: 'Lecturer' } },
      relations: ['role']
    })

    if (lecturers.length === 0) {
      this.logger.warn('No lecturers found for entry test creation')
      return
    }

    // Get all question sets
    const questionSets = await this.dataSource.getRepository(QuestionSetEntity).find()

    if (questionSets.length === 0) {
      this.logger.warn('No question sets found for entry test creation')
      return
    }

    for (const entryTestData of entryTestSeedData) {
      // Find lecturer by email
      const lecturer = lecturers.find((l) => l.email === entryTestData.lecturerEmail)

      if (!lecturer) {
        this.logger.warn(`Lecturer not found: ${entryTestData.lecturerEmail}`)
        continue
      }

      // Find question sets by titles
      const testQuestionSets = questionSets.filter((qs) => entryTestData.questionSetTitles.includes(qs.title))

      if (testQuestionSets.length === 0) {
        this.logger.warn(`No question sets found for entry test: ${entryTestData.questionSetTitles.join(', ')}`)
        continue
      }

      // Check if entry test already exists
      const existingEntryTest = await this.dataSource.getRepository(EntryTestEntity).findOne({
        where: { title: entryTestData.title }
      })

      if (!existingEntryTest) {
        const entryTest = this.dataSource.getRepository(EntryTestEntity).create({
          title: entryTestData.title,
          description: entryTestData.description,
          status: entryTestData.status,
          startTime: new Date(entryTestData.startTime),
          endTime: new Date(entryTestData.endTime),
          createdBy: lecturer,
          questionSets: testQuestionSets
        })

        await this.dataSource.getRepository(EntryTestEntity).save(entryTest)
        this.logger.log(`Created entry test: ${entryTestData.title}`)
      } else {
        this.logger.log(`Entry test already exists: ${entryTestData.title}`)
      }
    }
  }

  private async seedEntryTestSubmissions(): Promise<void> {
    this.logger.log('Seeding entry test submissions...')

    // Get all students
    const students = await this.dataSource.getRepository(User).find({
      where: { role: { name: 'Student' } },
      relations: ['role']
    })

    if (students.length === 0) {
      this.logger.warn('No students found for entry test submission creation')
      return
    }

    // Get all entry tests with their question sets
    const entryTests = await this.dataSource
      .getRepository(EntryTestEntity)
      .createQueryBuilder('entryTest')
      .leftJoinAndSelect('entryTest.questionSets', 'questionSets')
      .getMany()

    if (entryTests.length === 0) {
      this.logger.warn('No entry tests found for submission creation')
      return
    }

    for (const submissionData of entryTestSubmissionSeedData) {
      // Find student by email
      const student = students.find((s) => s.email === submissionData.studentEmail)

      if (!student) {
        this.logger.warn(`Student not found: ${submissionData.studentEmail}`)
        continue
      }

      // Find entry test by title
      const entryTest = entryTests.find((et) => et.title === submissionData.entryTestTitle)

      if (!entryTest) {
        this.logger.warn(`Entry test not found: ${submissionData.entryTestTitle}`)
        continue
      }

      // Find question set by title
      const questionSet = entryTest.questionSets.find((qs) => qs.title === submissionData.questionSetTitle)

      if (!questionSet) {
        this.logger.warn(`Question set not found: ${submissionData.questionSetTitle}`)
        continue
      }

      // Check if submission already exists
      const existingSubmission = await this.dataSource.getRepository(EntryTestSubmissionEntity).findOne({
        where: {
          studentId: student.id,
          entryTestId: entryTest.entryTestId,
          questionSetId: questionSet.questionSetId
        }
      })

      if (!existingSubmission) {
        const submission = this.dataSource.getRepository(EntryTestSubmissionEntity).create({
          studentId: student.id,
          entryTestId: entryTest.entryTestId,
          questionSetId: questionSet.questionSetId,
          attemptStatus: submissionData.attemptStatus,
          score: submissionData.score,
          submittedAt: submissionData.submittedAt ? new Date(submissionData.submittedAt) : null,
          note: submissionData.note,
          penalty: submissionData.penalty,
          answered: submissionData.score !== null ? { sample: 'data' } : null // Placeholder
        })

        await this.dataSource.getRepository(EntryTestSubmissionEntity).save(submission)
        this.logger.log(
          `Created entry test submission: ${student.name} -> ${entryTest.title} (Score: ${submissionData.score ?? 'N/A'})`
        )
      } else {
        this.logger.log(`Entry test submission already exists: ${student.name} -> ${entryTest.title}`)
      }
    }
  }

  private async seedFinalExams(): Promise<void> {
    this.logger.log('Seeding final exams...')

    // Get all lecturers
    const lecturers = await this.dataSource.getRepository(User).find({
      where: { role: { name: 'Lecturer' } },
      relations: ['role']
    })

    if (lecturers.length === 0) {
      this.logger.warn('No lecturers found for final exam creation')
      return
    }

    // Get all question sets
    const questionSets = await this.dataSource.getRepository(QuestionSetEntity).find()

    if (questionSets.length === 0) {
      this.logger.warn('No question sets found for final exam creation')
      return
    }

    for (const finalExamData of finalExamSeedData) {
      // Find lecturer by email
      const lecturer = lecturers.find((l) => l.email === finalExamData.lecturerEmail)

      if (!lecturer) {
        this.logger.warn(`Lecturer not found: ${finalExamData.lecturerEmail}`)
        continue
      }

      // Find question sets by titles
      const examQuestionSets = questionSets.filter((qs) => finalExamData.questionSetTitles.includes(qs.title))

      if (examQuestionSets.length === 0) {
        this.logger.warn(`No question sets found for final exam: ${finalExamData.questionSetTitles.join(', ')}`)
        continue
      }

      // Check if final exam already exists
      const existingFinalExam = await this.dataSource.getRepository(FinalExamEntity).findOne({
        where: { title: finalExamData.title }
      })

      if (!existingFinalExam) {
        const finalExam = this.dataSource.getRepository(FinalExamEntity).create({
          title: finalExamData.title,
          description: finalExamData.description,
          status: finalExamData.status,
          startTime: new Date(finalExamData.startTime),
          endTime: new Date(finalExamData.endTime),
          createdBy: lecturer,
          questionSets: examQuestionSets
        })

        await this.dataSource.getRepository(FinalExamEntity).save(finalExam)
        this.logger.log(`Created final exam: ${finalExamData.title}`)
      } else {
        this.logger.log(`Final exam already exists: ${finalExamData.title}`)
      }
    }
  }

  private async seedFinalExamSubmissions(): Promise<void> {
    this.logger.log('Seeding final exam submissions...')

    // Get all students
    const students = await this.dataSource.getRepository(User).find({
      where: { role: { name: 'Student' } },
      relations: ['role']
    })

    if (students.length === 0) {
      this.logger.warn('No students found for final exam submission creation')
      return
    }

    // Get all final exams with their question sets
    const finalExams = await this.dataSource
      .getRepository(FinalExamEntity)
      .createQueryBuilder('finalExam')
      .leftJoinAndSelect('finalExam.questionSets', 'questionSets')
      .getMany()

    if (finalExams.length === 0) {
      this.logger.warn('No final exams found for submission creation')
      return
    }

    for (const submissionData of finalExamSubmissionSeedData) {
      // Find student by email
      const student = students.find((s) => s.email === submissionData.studentEmail)

      if (!student) {
        this.logger.warn(`Student not found: ${submissionData.studentEmail}`)
        continue
      }

      // Find final exam by title
      const finalExam = finalExams.find((fe) => fe.title === submissionData.finalExamTitle)

      if (!finalExam) {
        this.logger.warn(`Final exam not found: ${submissionData.finalExamTitle}`)
        continue
      }

      // Find question set by title
      const questionSet = finalExam.questionSets.find((qs) => qs.title === submissionData.questionSetTitle)

      if (!questionSet) {
        this.logger.warn(`Question set not found: ${submissionData.questionSetTitle}`)
        continue
      }

      // Check if submission already exists
      const existingSubmission = await this.dataSource.getRepository(FinalExamSubmissionEntity).findOne({
        where: {
          studentId: student.id,
          finalExamId: finalExam.finalExamId,
          questionSetId: questionSet.questionSetId
        }
      })

      if (!existingSubmission) {
        const submission = this.dataSource.getRepository(FinalExamSubmissionEntity).create({
          studentId: student.id,
          finalExamId: finalExam.finalExamId,
          questionSetId: questionSet.questionSetId,
          attemptStatus: submissionData.attemptStatus,
          score: submissionData.score,
          submittedAt: submissionData.submittedAt ? new Date(submissionData.submittedAt) : null,
          note: submissionData.note,
          penalty: submissionData.penalty,
          answered: submissionData.score !== null ? { sample: 'data' } : null // Placeholder
        })

        await this.dataSource.getRepository(FinalExamSubmissionEntity).save(submission)
        this.logger.log(
          `Created final exam submission: ${student.name} -> ${finalExam.title} (Score: ${submissionData.score ?? 'N/A'})`
        )
      } else {
        this.logger.log(`Final exam submission already exists: ${student.name} -> ${finalExam.title}`)
      }
    }
  }

  private async seedStreaks(): Promise<void> {
    this.logger.log('Seeding streaks...')

    // Get all students
    const students = await this.dataSource.getRepository(User).find({
      where: { role: { name: 'Student' } },
      relations: ['role']
    })

    if (students.length === 0) {
      this.logger.warn('No students found for streak creation')
      return
    }

    for (const streakData of streakSeedData) {
      // Find student by email
      const student = students.find((s) => s.email === streakData.studentEmail)

      if (!student) {
        this.logger.warn(`Student not found: ${streakData.studentEmail}`)
        continue
      }

      // Check if streak already exists
      const existingStreak = await this.dataSource.getRepository(Streak).findOne({
        where: { studentId: student.id }
      })

      if (!existingStreak) {
        const streak = this.dataSource.getRepository(Streak).create({
          studentId: student.id,
          currentStreak: streakData.currentStreak,
          longestStreak: streakData.longestStreak,
          lastActivityDate: new Date(streakData.lastActivityDate)
        })

        await this.dataSource.getRepository(Streak).save(streak)
        this.logger.log(
          `Created streak: ${student.name} (Current: ${streakData.currentStreak}, Longest: ${streakData.longestStreak})`
        )
      } else {
        this.logger.log(`Streak already exists: ${student.name}`)
      }
    }
  }

  private async seedMeetingEvents(): Promise<void> {
    this.logger.log('Seeding meeting events...')

    // Get all users (for host and invitees)
    const users = await this.dataSource.getRepository(User).find({
      relations: ['role']
    })

    if (users.length === 0) {
      this.logger.warn('No users found for meeting event creation')
      return
    }

    // Get all classes
    const classes = await this.dataSource.getRepository(Class).find()

    if (classes.length === 0) {
      this.logger.warn('No classes found for meeting event creation')
      return
    }

    for (const meetingData of meetingEventSeedData) {
      // Find class by code
      const classEntity = classes.find((c) => c.classCode === meetingData.classCode)

      if (!classEntity) {
        this.logger.warn(`Class not found: ${meetingData.classCode}`)
        continue
      }

      // Find host by email
      const host = users.find((u) => u.email === meetingData.hostEmail)

      if (!host) {
        this.logger.warn(`Host not found: ${meetingData.hostEmail}`)
        continue
      }

      // Find invitees by emails
      const invitees = meetingData.inviteeEmails
        .map((email) => users.find((u) => u.email === email))
        .filter((user): user is User => user !== undefined)

      if (invitees.length === 0) {
        this.logger.warn(`No invitees found for meeting: ${meetingData.title}`)
        continue
      }

      // Check if meeting event already exists
      const existingMeeting = await this.dataSource.getRepository(MeetingEventEntity).findOne({
        where: { code: meetingData.code }
      })

      if (!existingMeeting) {
        const meetingEvent = this.dataSource.getRepository(MeetingEventEntity).create({
          classId: classEntity.classId,
          hostBy: host.id,
          invitee: invitees.map((inv) => inv.id),
          title: meetingData.title,
          description: meetingData.description,
          note: meetingData.note,
          startTime: new Date(meetingData.startTime),
          endTime: new Date(meetingData.endTime),
          code: meetingData.code
        })

        await this.dataSource.getRepository(MeetingEventEntity).save(meetingEvent)
        this.logger.log(`Created meeting event: ${meetingData.title} (Code: ${meetingData.code})`)
      } else {
        this.logger.log(`Meeting event already exists: ${meetingData.title}`)
      }
    }
  }

  private async seedLessonProgress(): Promise<void> {
    this.logger.log('Seeding lesson progress...')

    // Get all students
    const students = await this.dataSource.getRepository(User).find({
      where: { role: { name: 'Student' } },
      relations: ['role']
    })

    if (students.length === 0) {
      this.logger.warn('No students found for lesson progress creation')
      return
    }

    // Get all lessons
    const lessons = await this.dataSource.getRepository(LessonEntity).find()

    if (lessons.length === 0) {
      this.logger.warn('No lessons found for lesson progress creation')
      return
    }

    for (const progressData of lessonProgressSeedData) {
      // Find student by email
      const student = students.find((s) => s.email === progressData.studentEmail)

      if (!student) {
        this.logger.warn(`Student not found: ${progressData.studentEmail}`)
        continue
      }

      // Find lesson by name
      const lesson = lessons.find((l) => l.lessonName === progressData.lessonName)

      if (!lesson) {
        this.logger.warn(`Lesson not found: ${progressData.lessonName}`)
        continue
      }

      // Check if lesson progress already exists
      const existingProgress = await this.dataSource.getRepository(LessonProgress).findOne({
        where: {
          studentId: student.id,
          lessonId: lesson.lessonId
        }
      })

      if (!existingProgress) {
        const lessonProgress = this.dataSource.getRepository(LessonProgress).create({
          studentId: student.id,
          lessonId: lesson.lessonId,
          completedAt: progressData.completedAt ? new Date(progressData.completedAt) : null
        })

        await this.dataSource.getRepository(LessonProgress).save(lessonProgress)
        this.logger.log(
          `Created lesson progress: ${student.name} -> ${lesson.lessonName} (${progressData.completedAt ? 'Completed' : 'In Progress'})`
        )
      } else {
        this.logger.log(`Lesson progress already exists: ${student.name} -> ${lesson.lessonName}`)
      }
    }
  }
}
