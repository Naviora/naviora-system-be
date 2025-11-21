import { DataSource } from 'typeorm'
import { AppDataSource } from '../src/database/data-source'
import { User } from '../src/api/user/entities/user.entity'
import { Class } from '../src/api/class/entities/class.entity'
import { ModuleEntity } from '../src/api/module/entities/module.entity'
import { LessonEntity } from '../src/api/lesson/entities/lesson.entity'
import { QuestionEntity } from '../src/api/question/entities/question.entity'
import { QuestionSetEntity } from '../src/api/question-set/entities/question-set.entity'
import { MaterialEntity } from '../src/api/material/entities/material.entity'
import { TeachingMaterial } from '../src/api/teaching-material/entities/teaching-material.entity'
import { EntryTestEntity } from '../src/api/entry-test/entities/entry-test.entity'
import { FinalExamEntity } from '../src/api/final-exam/entities/final-exam.entity'
import { ReviewedExerciseEntity } from '../src/api/reviewed-exercise/entities/reviewed-exercise.entity'
import { Streak } from '../src/api/streak/entities/streak.entity'
import { MeetingEventEntity } from '../src/api/meeting-events/entities/meeting-event.entity'
import { LessonProgress } from '../src/api/lesson/entities/lesson-progress.entity'

/**
 * Validation script to verify seed data counts and relationships
 * Run this after seeding to ensure all data was created correctly
 */

interface EntityCount {
  entityName: string
  expectedMin: number
  expectedMax?: number
  actual: number
  status: 'pass' | 'fail' | 'warning'
}

async function validateSeedData() {
  let dataSource: DataSource | null = null

  try {
    console.log('Initializing database connection...')
    dataSource = AppDataSource
    await dataSource.initialize()

    console.log('Database connection established successfully!')
    console.log('Starting seed data validation...\n')

    const results: EntityCount[] = []

    // Validate Users
    const userCount = await dataSource.getRepository(User).count()
    results.push({
      entityName: 'Users',
      expectedMin: 50,
      expectedMax: 60,
      actual: userCount,
      status: userCount >= 50 && userCount <= 60 ? 'pass' : 'warning'
    })

    // Validate Classes
    const classCount = await dataSource.getRepository(Class).count()
    results.push({
      entityName: 'Classes',
      expectedMin: 15,
      expectedMax: 20,
      actual: classCount,
      status: classCount >= 15 && classCount <= 20 ? 'pass' : 'warning'
    })

    // Validate Modules
    const moduleCount = await dataSource.getRepository(ModuleEntity).count()
    results.push({
      entityName: 'Modules',
      expectedMin: 20,
      expectedMax: 30,
      actual: moduleCount,
      status: moduleCount >= 20 && moduleCount <= 30 ? 'pass' : 'warning'
    })

    // Validate Lessons
    const lessonCount = await dataSource.getRepository(LessonEntity).count()
    results.push({
      entityName: 'Lessons',
      expectedMin: 30,
      expectedMax: 50,
      actual: lessonCount,
      status: lessonCount >= 30 && lessonCount <= 50 ? 'pass' : 'warning'
    })

    // Validate Questions
    const questionCount = await dataSource.getRepository(QuestionEntity).count()
    results.push({
      entityName: 'Questions',
      expectedMin: 80,
      expectedMax: 120,
      actual: questionCount,
      status: questionCount >= 80 ? 'pass' : 'warning'
    })

    // Validate Question Sets
    const questionSetCount = await dataSource.getRepository(QuestionSetEntity).count()
    results.push({
      entityName: 'Question Sets',
      expectedMin: 15,
      expectedMax: 25,
      actual: questionSetCount,
      status: questionSetCount >= 15 ? 'pass' : 'warning'
    })

    // Validate Materials
    const materialCount = await dataSource.getRepository(MaterialEntity).count()
    results.push({
      entityName: 'Materials',
      expectedMin: 40,
      expectedMax: 50,
      actual: materialCount,
      status: materialCount >= 40 ? 'pass' : 'warning'
    })

    // Validate Teaching Materials
    const teachingMaterialCount = await dataSource.getRepository(TeachingMaterial).count()
    results.push({
      entityName: 'Teaching Materials',
      expectedMin: 50,
      expectedMax: 70,
      actual: teachingMaterialCount,
      status: teachingMaterialCount >= 50 ? 'pass' : 'warning'
    })

    // Validate Entry Tests
    const entryTestCount = await dataSource.getRepository(EntryTestEntity).count()
    results.push({
      entityName: 'Entry Tests',
      expectedMin: 8,
      expectedMax: 12,
      actual: entryTestCount,
      status: entryTestCount >= 8 ? 'pass' : 'warning'
    })

    // Validate Final Exams
    const finalExamCount = await dataSource.getRepository(FinalExamEntity).count()
    results.push({
      entityName: 'Final Exams',
      expectedMin: 8,
      expectedMax: 12,
      actual: finalExamCount,
      status: finalExamCount >= 8 ? 'pass' : 'warning'
    })

    // Validate Reviewed Exercises
    const reviewedExerciseCount = await dataSource.getRepository(ReviewedExerciseEntity).count()
    results.push({
      entityName: 'Reviewed Exercises',
      expectedMin: 15,
      expectedMax: 25,
      actual: reviewedExerciseCount,
      status: reviewedExerciseCount >= 15 ? 'pass' : 'warning'
    })

    // Validate Streaks
    const streakCount = await dataSource.getRepository(Streak).count()
    results.push({
      entityName: 'Streaks',
      expectedMin: 30,
      expectedMax: 50,
      actual: streakCount,
      status: streakCount >= 30 ? 'pass' : 'warning'
    })

    // Validate Meeting Events
    const meetingEventCount = await dataSource.getRepository(MeetingEventEntity).count()
    results.push({
      entityName: 'Meeting Events',
      expectedMin: 10,
      expectedMax: 20,
      actual: meetingEventCount,
      status: meetingEventCount >= 10 ? 'pass' : 'warning'
    })

    // Validate Lesson Progress
    const lessonProgressCount = await dataSource.getRepository(LessonProgress).count()
    results.push({
      entityName: 'Lesson Progress',
      expectedMin: 50,
      expectedMax: 100,
      actual: lessonProgressCount,
      status: lessonProgressCount >= 50 ? 'pass' : 'warning'
    })

    // Print results
    console.log('\n=== Seed Data Validation Results ===\n')
    let passCount = 0
    let warningCount = 0
    let failCount = 0

    results.forEach((result) => {
      const range = result.expectedMax ? `${result.expectedMin}-${result.expectedMax}` : `>=${result.expectedMin}`
      const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'
      console.log(`${icon} ${result.entityName.padEnd(25)} Expected: ${range.padEnd(10)} Actual: ${result.actual}`)

      if (result.status === 'pass') passCount++
      else if (result.status === 'warning') warningCount++
      else failCount++
    })

    console.log('\n=== Summary ===')
    console.log(`✅ Passed: ${passCount}`)
    console.log(`⚠️  Warnings: ${warningCount}`)
    console.log(`❌ Failed: ${failCount}`)

    if (failCount > 0) {
      console.log('\n❌ Validation failed! Please check the errors above.')
      process.exit(1)
    } else if (warningCount > 0) {
      console.log('\n⚠️  Validation completed with warnings. Please review the counts above.')
      process.exit(0)
    } else {
      console.log('\n✅ All validations passed!')
      process.exit(0)
    }
  } catch (error) {
    console.error('❌ Error during validation:', error)
    process.exit(1)
  } finally {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy()
      console.log('\nDatabase connection closed.')
    }
  }
}

// Run the validator
validateSeedData()
