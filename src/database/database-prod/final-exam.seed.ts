import { ExamStatus } from '@common/enums/exam-status.enum'

// Seed data for FinalExamEntity
// Final exams are used to assess students at the end of classes
// lecturerEmail and questionSetTitles will be replaced by actual IDs during seeding

export const finalExamSeedData = [
  {
    title: 'Thi cuối kỳ - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2024',
    description:
      'Bài thi cuối kỳ đánh giá kết quả học tập của học sinh trong lớp thi học sinh giỏi Sinh học 12 cấp trường năm học 2024-2025',
    lecturerEmail: 'lecturer@example.com', // Thầy Nguyễn Văn Sinh
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp trường'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString(), // 150 days from now
    endTime: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString() // 180 days from now
  },
  {
    title: 'Thi cuối kỳ - Lớp thi học sinh giỏi Sinh học 12 - Cấp thành phố 2024',
    description:
      'Bài thi cuối kỳ đánh giá kết quả học tập của học sinh trong lớp thi học sinh giỏi Sinh học 12 cấp thành phố năm học 2024-2025',
    lecturerEmail: 'lecturer2@example.com', // Cô Trần Thị Sinh Học
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp thành phố'],
    status: ExamStatus.DRAFT,
    startTime: new Date(Date.now() + 155 * 24 * 60 * 60 * 1000).toISOString(), // 155 days from now
    endTime: new Date(Date.now() + 185 * 24 * 60 * 60 * 1000).toISOString() // 185 days from now
  },
  {
    title: 'Thi cuối kỳ - Lớp thi học sinh giỏi Sinh học 12 - Cấp tỉnh 2024',
    description:
      'Bài thi cuối kỳ đánh giá kết quả học tập của học sinh trong lớp thi học sinh giỏi Sinh học 12 cấp tỉnh năm học 2024-2025',
    lecturerEmail: 'lecturer3@example.com', // Thầy Lê Văn Di Truyền
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp tỉnh'],
    status: ExamStatus.DRAFT,
    startTime: new Date(Date.now() + 160 * 24 * 60 * 60 * 1000).toISOString(), // 160 days from now
    endTime: new Date(Date.now() + 190 * 24 * 60 * 60 * 1000).toISOString() // 190 days from now
  },
  {
    title: 'Thi cuối kỳ - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc gia 2024',
    description:
      'Bài thi cuối kỳ đánh giá kết quả học tập của học sinh trong lớp thi học sinh giỏi Sinh học 12 cấp quốc gia năm học 2024-2025',
    lecturerEmail: 'lecturer2@example.com', // Cô Trần Thị Sinh Học
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp quốc gia'],
    status: ExamStatus.DRAFT,
    startTime: new Date(Date.now() + 165 * 24 * 60 * 60 * 1000).toISOString(), // 165 days from now
    endTime: new Date(Date.now() + 195 * 24 * 60 * 60 * 1000).toISOString() // 195 days from now
  },
  {
    title: 'Thi cuối kỳ - Lớp thi học sinh giỏi Sinh học 12 - Cấp quốc tế 2024',
    description:
      'Bài thi cuối kỳ đánh giá kết quả học tập của học sinh trong lớp thi học sinh giỏi Sinh học 12 cấp quốc tế năm học 2024-2025',
    lecturerEmail: 'lecturer@example.com', // Thầy Nguyễn Văn Sinh
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp quốc tế'],
    status: ExamStatus.DRAFT,
    startTime: new Date(Date.now() + 170 * 24 * 60 * 60 * 1000).toISOString(), // 170 days from now
    endTime: new Date(Date.now() + 200 * 24 * 60 * 60 * 1000).toISOString() // 200 days from now
  },
  {
    title: 'Thi cuối kỳ - Lớp thi học sinh giỏi Sinh học 11 - Cấp trường 2024',
    description:
      'Bài thi cuối kỳ đánh giá kết quả học tập của học sinh trong lớp thi học sinh giỏi Sinh học 11 cấp trường năm học 2024-2025',
    lecturerEmail: 'lecturer6@example.com', // Cô Vũ Thị Sinh Lý
    questionSetTitles: ['Thi học sinh giỏi Sinh học 11 - Cấp thành phố'],
    status: ExamStatus.DRAFT,
    startTime: new Date(Date.now() + 145 * 24 * 60 * 60 * 1000).toISOString(), // 145 days from now
    endTime: new Date(Date.now() + 175 * 24 * 60 * 60 * 1000).toISOString() // 175 days from now
  },
  {
    title: 'Thi cuối kỳ - Lớp thi học sinh giỏi Sinh học 11 - Cấp thành phố 2024',
    description:
      'Bài thi cuối kỳ đánh giá kết quả học tập của học sinh trong lớp thi học sinh giỏi Sinh học 11 cấp thành phố năm học 2024-2025',
    lecturerEmail: 'lecturer12@example.com', // Cô Mai Thị Thực Vật
    questionSetTitles: ['Thi học sinh giỏi Sinh học 11 - Cấp thành phố'],
    status: ExamStatus.DRAFT,
    startTime: new Date(Date.now() + 148 * 24 * 60 * 60 * 1000).toISOString(), // 148 days from now
    endTime: new Date(Date.now() + 178 * 24 * 60 * 60 * 1000).toISOString() // 178 days from now
  },
  {
    title: 'Thi cuối kỳ - Lớp thi học sinh giỏi Sinh học 10 - Cấp trường 2024',
    description:
      'Bài thi cuối kỳ đánh giá kết quả học tập của học sinh trong lớp thi học sinh giỏi Sinh học 10 cấp trường năm học 2024-2025',
    lecturerEmail: 'lecturer4@example.com', // Cô Phạm Thị Tế Bào
    questionSetTitles: ['Thi học sinh giỏi Sinh học 10 - Cấp trường'],
    status: ExamStatus.DRAFT,
    startTime: new Date(Date.now() + 140 * 24 * 60 * 60 * 1000).toISOString(), // 140 days from now
    endTime: new Date(Date.now() + 170 * 24 * 60 * 60 * 1000).toISOString() // 170 days from now
  },
  {
    title: 'Thi cuối kỳ - Lớp thi học sinh giỏi Sinh học 10 - Cấp thành phố 2024',
    description:
      'Bài thi cuối kỳ đánh giá kết quả học tập của học sinh trong lớp thi học sinh giỏi Sinh học 10 cấp thành phố năm học 2024-2025',
    lecturerEmail: 'lecturer4@example.com', // Cô Phạm Thị Tế Bào
    questionSetTitles: ['Thi học sinh giỏi Sinh học 10 - Cấp trường'],
    status: ExamStatus.DRAFT,
    startTime: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(), // 120 days from now
    endTime: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString() // 150 days from now
  },
  {
    title: 'Thi cuối kỳ - Lớp thi học sinh giỏi Sinh học 12 - Cấp trường 2025',
    description:
      'Bài thi cuối kỳ đánh giá kết quả học tập của học sinh trong lớp thi học sinh giỏi Sinh học 12 cấp trường năm học 2025-2026',
    lecturerEmail: 'lecturer@example.com', // Thầy Nguyễn Văn Sinh
    questionSetTitles: ['Thi học sinh giỏi Sinh học 12 - Cấp trường'],
    status: ExamStatus.DRAFT,
    startTime: new Date(Date.now() + 450 * 24 * 60 * 60 * 1000).toISOString(), // 450 days from now
    endTime: new Date(Date.now() + 480 * 24 * 60 * 60 * 1000).toISOString() // 480 days from now
  }
]
