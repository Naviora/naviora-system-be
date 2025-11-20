import { AttemptStatus } from '@common/enums/attempt-status.enum'

// Seed data for EntryTestSubmissionEntity
// Entry test submissions are student attempts at entry tests before enrolling in classes
// entryTestTitle, studentEmail, questionSetTitle will be replaced by actual IDs during seeding

export const entryTestSubmissionSeedData = [
  // Entry test SINH12 - Cấp trường 2024 submissions
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2024',
    studentEmail: 'student1@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp trường',
    score: 85,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2024',
    studentEmail: 'student2@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp trường',
    score: 78,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2024',
    studentEmail: 'student4@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp trường',
    score: 82,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2024',
    studentEmail: 'student5@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp trường',
    score: 88,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2024',
    studentEmail: 'student7@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp trường',
    score: 75,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2024',
    studentEmail: 'student8@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp trường',
    score: 90,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2024',
    studentEmail: 'student10@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp trường',
    score: 72,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu tối thiểu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2024',
    studentEmail: 'student11@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp trường',
    score: 68,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Chưa đạt yêu cầu, không được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2024',
    studentEmail: 'student12@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp trường',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  // Entry test SINH12 - Cấp thành phố 2024 submissions
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp thành phố 2024',
    studentEmail: 'student1@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp thành phố',
    score: 88,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp thành phố 2024',
    studentEmail: 'student2@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp thành phố',
    score: 85,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp thành phố 2024',
    studentEmail: 'student5@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp thành phố',
    score: 92,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp thành phố 2024',
    studentEmail: 'student8@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp thành phố',
    score: 87,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp thành phố 2024',
    studentEmail: 'student11@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp thành phố',
    score: 82,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp thành phố 2024',
    studentEmail: 'student12@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp thành phố',
    score: 79,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp thành phố 2024',
    studentEmail: 'student14@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp thành phố',
    score: 76,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp thành phố 2024',
    studentEmail: 'student15@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp thành phố',
    score: 74,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Chưa đạt yêu cầu, không được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp thành phố 2024',
    studentEmail: 'student16@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp thành phố',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  // Entry test SINH12 - Cấp tỉnh 2024 submissions
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp tỉnh 2024',
    studentEmail: 'student1@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp tỉnh',
    score: 90,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp tỉnh 2024',
    studentEmail: 'student2@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp tỉnh',
    score: 87,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp tỉnh 2024',
    studentEmail: 'student5@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp tỉnh',
    score: 93,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp tỉnh 2024',
    studentEmail: 'student11@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp tỉnh',
    score: 86,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp tỉnh 2024',
    studentEmail: 'student12@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp tỉnh',
    score: 84,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp tỉnh 2024',
    studentEmail: 'student16@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp tỉnh',
    score: 81,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp tỉnh 2024',
    studentEmail: 'student17@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp tỉnh',
    score: 78,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Chưa đạt yêu cầu, không được nhận vào lớp',
    penalty: false
  },
  // Entry test SINH12 - Cấp quốc gia 2024 submissions
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc gia 2024',
    studentEmail: 'student1@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc gia',
    score: 92,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc gia 2024',
    studentEmail: 'student2@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc gia',
    score: 89,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc gia 2024',
    studentEmail: 'student5@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc gia',
    score: 95,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc gia 2024',
    studentEmail: 'student11@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc gia',
    score: 88,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc gia 2024',
    studentEmail: 'student17@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc gia',
    score: 85,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc gia 2024',
    studentEmail: 'student18@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc gia',
    score: 82,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Chưa đạt yêu cầu, không được nhận vào lớp',
    penalty: false
  },
  // Entry test SINH12 - Cấp quốc tế 2024 submissions
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc tế 2024',
    studentEmail: 'student1@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc tế',
    score: 94,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc tế 2024',
    studentEmail: 'student2@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc tế',
    score: 91,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc tế 2024',
    studentEmail: 'student11@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc tế',
    score: 90,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc tế 2024',
    studentEmail: 'student19@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc tế',
    score: 87,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Chưa đạt yêu cầu, không được nhận vào lớp',
    penalty: false
  },
  // Entry test SINH11 - Cấp trường 2024 submissions
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp trường 2024',
    studentEmail: 'student3@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 11 - Cấp thành phố',
    score: 83,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp trường 2024',
    studentEmail: 'student6@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 11 - Cấp thành phố',
    score: 80,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp trường 2024',
    studentEmail: 'student9@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 11 - Cấp thành phố',
    score: 77,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp trường 2024',
    studentEmail: 'student21@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 11 - Cấp thành phố',
    score: 85,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp trường 2024',
    studentEmail: 'student22@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 11 - Cấp thành phố',
    score: 72,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Chưa đạt yêu cầu, không được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp trường 2024',
    studentEmail: 'student23@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 11 - Cấp thành phố',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  // Entry test SINH11 - Cấp thành phố 2024 submissions
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp thành phố 2024',
    studentEmail: 'student3@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 11 - Cấp thành phố',
    score: 86,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp thành phố 2024',
    studentEmail: 'student6@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 11 - Cấp thành phố',
    score: 83,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp thành phố 2024',
    studentEmail: 'student21@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 11 - Cấp thành phố',
    score: 89,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp thành phố 2024',
    studentEmail: 'student24@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 11 - Cấp thành phố',
    score: 79,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Chưa đạt yêu cầu, không được nhận vào lớp',
    penalty: false
  },
  // Entry test SINH10 - Cấp trường 2024 submissions
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp trường 2024',
    studentEmail: 'student29@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 10 - Cấp trường',
    score: 81,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp trường 2024',
    studentEmail: 'student30@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 10 - Cấp trường',
    score: 78,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp trường 2024',
    studentEmail: 'student31@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 10 - Cấp trường',
    score: 75,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp trường 2024',
    studentEmail: 'student32@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 10 - Cấp trường',
    score: 73,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp trường 2024',
    studentEmail: 'student33@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 10 - Cấp trường',
    score: 70,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu tối thiểu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp trường 2024',
    studentEmail: 'student34@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 10 - Cấp trường',
    score: 67,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Chưa đạt yêu cầu, không được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp trường 2024',
    studentEmail: 'student35@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 10 - Cấp trường',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  // Entry test SINH10 - Cấp thành phố 2024 submissions (completed)
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp thành phố 2024',
    studentEmail: 'student29@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 10 - Cấp trường',
    score: 85,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp thành phố 2024',
    studentEmail: 'student30@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 10 - Cấp trường',
    score: 82,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 44 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Đạt yêu cầu, được nhận vào lớp',
    penalty: false
  },
  {
    entryTestTitle: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp thành phố 2024',
    studentEmail: 'student36@example.com',
    questionSetTitle: 'Thi học sinh giỏi Sinh học 10 - Cấp trường',
    score: 79,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Chưa đạt yêu cầu, không được nhận vào lớp',
    penalty: false
  }
]
