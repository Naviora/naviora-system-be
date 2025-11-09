import { AttemptStatus } from '@common/enums/attempt-status.enum'

// Seed data for ReviewedExerciseSubmissionEntity
// This will be used to create student submissions with various scores for testing

export const reviewedExerciseSubmissionSeedData = [
  // Completed exercise submissions with scores
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Completed', // Will be matched to reviewed exercise
    studentEmail: 'student1@example.com',
    score: 9,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Excellent work!',
    penalty: false
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Completed',
    studentEmail: 'student2@example.com',
    score: 8,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Good performance',
    penalty: false
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Completed',
    studentEmail: 'student3@example.com',
    score: 7,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Completed',
    studentEmail: 'student4@example.com',
    score: 6,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Needs improvement',
    penalty: false
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Completed',
    studentEmail: 'student5@example.com',
    score: 5,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Late submission',
    penalty: true
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Completed',
    studentEmail: 'student6@example.com',
    score: 8,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  // Active exercise submissions - some submitted, some in progress
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Active',
    studentEmail: 'student1@example.com',
    score: 9,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Well done!',
    penalty: false
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Active',
    studentEmail: 'student2@example.com',
    score: 7,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Active',
    studentEmail: 'student3@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Active',
    studentEmail: 'student4@example.com',
    score: 8,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    note: null,
    penalty: false
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Active',
    studentEmail: 'student5@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Active',
    studentEmail: 'student6@example.com',
    score: 6,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    note: 'Could be better',
    penalty: false
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Active',
    studentEmail: 'student7@example.com',
    score: 9,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    note: 'Excellent!',
    penalty: false
  },
  {
    reviewedExerciseTitle: 'Cơ chế di truyền và biến dị - Active',
    studentEmail: 'student8@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  }
]
