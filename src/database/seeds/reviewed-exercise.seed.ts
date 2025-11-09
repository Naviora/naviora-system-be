import { ExamStatus } from '@common/enums/exam-status.enum'

// Seed data for ReviewedExerciseEntity
// This will be used to create reviewed exercises for testing

export const reviewedExerciseSeedData = [
  {
    lessonName: 'Cơ chế di truyền và biến dị', // Will be replaced by actual lesson ID
    lecturerEmail: 'lecturer@example.com', // Will be replaced by actual lecturer ID
    questionSetTitles: ['Kiểm tra Sinh học 12 - Cơ chế di truyền và biến dị'], // Will be replaced by actual question set IDs
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
  },
  {
    lessonName: 'Cơ chế di truyền và biến dị',
    lecturerEmail: 'lecturer@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Cơ chế di truyền và biến dị'],
    status: ExamStatus.COMPLETED,
    startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    endTime: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() // 20 days ago
  }
]
