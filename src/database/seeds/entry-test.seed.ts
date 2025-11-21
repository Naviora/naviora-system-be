import { ExamStatus } from '@common/enums/exam-status.enum'

// Seed data for EntryTestEntity
// Entry tests are used to assess students before enrolling in classes
// lecturerEmail and questionSetTitles will be replaced by actual IDs during seeding

export const entryTestSeedData = [
  {
    title: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2024',
    description:
      'Bài kiểm tra đánh giá năng lực để xét tuyển vào lớp thi học sinh giỏi Sinh học 12 cấp trường năm học 2024-2025',
    lecturerEmail: 'lecturer@example.com', // Thầy Nguyễn Văn Sinh
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp trường'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
  },
  {
    title: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp thành phố 2024',
    description:
      'Bài kiểm tra đánh giá năng lực để xét tuyển vào lớp thi học sinh giỏi Sinh học 12 cấp thành phố năm học 2024-2025',
    lecturerEmail: 'lecturer2@example.com', // Cô Trần Thị Sinh Học
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp thành phố'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
    endTime: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString() // 35 days from now
  },
  {
    title: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp tỉnh 2024',
    description:
      'Bài kiểm tra đánh giá năng lực để xét tuyển vào lớp thi học sinh giỏi Sinh học 12 cấp tỉnh năm học 2024-2025',
    lecturerEmail: 'lecturer3@example.com', // Thầy Lê Văn Di Truyền
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp tỉnh'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    endTime: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString() // 40 days from now
  },
  {
    title: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc gia 2024',
    description:
      'Bài kiểm tra đánh giá năng lực để xét tuyển vào lớp thi học sinh giỏi Sinh học 12 cấp quốc gia năm học 2024-2025',
    lecturerEmail: 'lecturer2@example.com', // Cô Trần Thị Sinh Học
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp quốc gia'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    endTime: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString() // 45 days from now
  },
  {
    title: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc tế 2024',
    description:
      'Bài kiểm tra đánh giá năng lực để xét tuyển vào lớp thi học sinh giỏi Sinh học 12 cấp quốc tế năm học 2024-2025',
    lecturerEmail: 'lecturer@example.com', // Thầy Nguyễn Văn Sinh
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp quốc tế'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    endTime: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString() // 50 days from now
  },
  {
    title: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp trường 2024',
    description:
      'Bài kiểm tra đánh giá năng lực để xét tuyển vào lớp thi học sinh giỏi Sinh học 11 cấp trường năm học 2024-2025',
    lecturerEmail: 'lecturer6@example.com', // Cô Vũ Thị Sinh Lý
    questionSetTitles: ['Thi học sinh giỏi Sinh học 11 - Cấp thành phố'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), // 28 days ago
    endTime: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString() // 32 days from now
  },
  {
    title: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 11 - Cấp thành phố 2024',
    description:
      'Bài kiểm tra đánh giá năng lực để xét tuyển vào lớp thi học sinh giỏi Sinh học 11 cấp thành phố năm học 2024-2025',
    lecturerEmail: 'lecturer12@example.com', // Cô Mai Thị Thực Vật
    questionSetTitles: ['Thi học sinh giỏi Sinh học 11 - Cấp thành phố'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(), // 23 days ago
    endTime: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000).toISOString() // 37 days from now
  },
  {
    title: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp trường 2024',
    description:
      'Bài kiểm tra đánh giá năng lực để xét tuyển vào lớp thi học sinh giỏi Sinh học 10 cấp trường năm học 2024-2025',
    lecturerEmail: 'lecturer4@example.com', // Cô Phạm Thị Tế Bào
    questionSetTitles: ['Thi học sinh giỏi Sinh học 10 - Cấp trường'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString(), // 26 days ago
    endTime: new Date(Date.now() + 34 * 24 * 60 * 60 * 1000).toISOString() // 34 days from now
  },
  {
    title: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 10 - Cấp thành phố 2024',
    description:
      'Bài kiểm tra đánh giá năng lực để xét tuyển vào lớp thi học sinh giỏi Sinh học 10 cấp thành phố năm học 2024-2025',
    lecturerEmail: 'lecturer4@example.com', // Cô Phạm Thị Tế Bào
    questionSetTitles: ['Thi học sinh giỏi Sinh học 10 - Cấp trường'],
    status: ExamStatus.COMPLETED,
    startTime: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
    endTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
  },
  {
    title: 'Bài kiểm tra đầu vào - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2025',
    description:
      'Bài kiểm tra đánh giá năng lực để xét tuyển vào lớp thi học sinh giỏi Sinh học 12 cấp trường năm học 2025-2026',
    lecturerEmail: 'lecturer@example.com', // Thầy Nguyễn Văn Sinh
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp trường'],
    status: ExamStatus.PUBLISHED,
    startTime: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
    endTime: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString() // 120 days from now
  }
]
