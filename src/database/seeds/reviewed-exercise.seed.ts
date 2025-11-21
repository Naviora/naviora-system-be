import { ExamStatus } from '@common/enums/exam-status.enum'

// Seed data for ReviewedExerciseEntity
// This will be used to create reviewed exercises for testing
// lessonName, lecturerEmail, questionSetTitles will be replaced by actual IDs during seeding

export const reviewedExerciseSeedData = [
  // SINH12 - Di truyền học phân tử
  {
    lessonName: 'Cấu trúc và chức năng của ADN',
    lecturerEmail: 'lecturer8@example.com', // Cô Bùi Thị Phân Tử
    questionSetTitles: ['Kiểm tra Sinh học 12 - Di truyền học phân tử'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    endTime: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString() // 9 days from now
  },
  {
    lessonName: 'Nhân đôi ADN',
    lecturerEmail: 'lecturer8@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Di truyền học phân tử'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    endTime: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000).toISOString() // 11 days from now
  },
  {
    lessonName: 'Phiên mã và xử lý ARN',
    lecturerEmail: 'lecturer8@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Di truyền học phân tử'],
    status: ExamStatus.PUBLISHED,
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    endTime: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString() // 16 days from now
  },
  {
    lessonName: 'Dịch mã và tổng hợp protein',
    lecturerEmail: 'lecturer8@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Di truyền học phân tử'],
    status: ExamStatus.COMPLETED,
    startTime: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), // 35 days ago
    endTime: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() // 25 days ago
  },
  // SINH12 - Đột biến
  {
    lessonName: 'Đột biến gen',
    lecturerEmail: 'lecturer3@example.com', // Thầy Lê Văn Di Truyền
    questionSetTitles: ['Kiểm tra Sinh học 12 - Đột biến và biến dị'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days from now
  },
  {
    lessonName: 'Đột biến cấu trúc nhiễm sắc thể',
    lecturerEmail: 'lecturer3@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Đột biến và biến dị'],
    status: ExamStatus.COMPLETED,
    startTime: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), // 28 days ago
    endTime: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString() // 18 days ago
  },
  // SINH12 - Quy luật di truyền
  {
    lessonName: 'Quy luật di truyền Mendel',
    lecturerEmail: 'lecturer3@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Cơ chế di truyền và biến dị'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    endTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString() // 8 days from now
  },
  {
    lessonName: 'Di truyền liên kết và hoán vị gen',
    lecturerEmail: 'lecturer3@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Cơ chế di truyền và biến dị'],
    status: ExamStatus.DRAFT,
    startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    endTime: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString() // 19 days from now
  },
  // SINH12 - Tiến hóa
  {
    lessonName: 'Thuyết tiến hóa Darwin',
    lecturerEmail: 'lecturer7@example.com', // Thầy Đặng Văn Tiến Hóa
    questionSetTitles: ['Kiểm tra Sinh học 12 - Tiến hóa sinh học'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    endTime: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString() // 12 days from now
  },
  {
    lessonName: 'Bằng chứng tiến hóa',
    lecturerEmail: 'lecturer7@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Tiến hóa sinh học'],
    status: ExamStatus.COMPLETED,
    startTime: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(), // 32 days ago
    endTime: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString() // 22 days ago
  },
  {
    lessonName: 'Tiến hóa phân tử',
    lecturerEmail: 'lecturer7@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Tiến hóa sinh học'],
    status: ExamStatus.PUBLISHED,
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    endTime: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString() // 17 days from now
  },
  // SINH12 - Sinh thái học
  {
    lessonName: 'Đặc trưng quần thể sinh vật',
    lecturerEmail: 'lecturer5@example.com', // Thầy Hoàng Văn Sinh Thái
    questionSetTitles: ['Kiểm tra Sinh học 12 - Sinh thái học'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    endTime: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString() // 13 days from now
  },
  {
    lessonName: 'Cấu trúc quần xã sinh vật',
    lecturerEmail: 'lecturer5@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Sinh thái học'],
    status: ExamStatus.COMPLETED,
    startTime: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString(), // 26 days ago
    endTime: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString() // 16 days ago
  },
  {
    lessonName: 'Dòng năng lượng trong hệ sinh thái',
    lecturerEmail: 'lecturer5@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Sinh thái học'],
    status: ExamStatus.CANCELLED,
    startTime: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    endTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  },
  // SINH12 - Công nghệ gen
  {
    lessonName: 'Kỹ thuật ADN tái tổ hợp',
    lecturerEmail: 'lecturer8@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Công nghệ gen'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days from now
  },
  {
    lessonName: 'Nhân bản gen và PCR',
    lecturerEmail: 'lecturer8@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Công nghệ gen'],
    status: ExamStatus.PUBLISHED,
    startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    endTime: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days from now
  },
  // SINH12 - Miễn dịch
  {
    lessonName: 'Hệ miễn dịch bẩm sinh',
    lecturerEmail: 'lecturer2@example.com', // Cô Trần Thị Sinh Học
    questionSetTitles: ['Kiểm tra Sinh học 12 - Sinh học miễn dịch'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days from now
  },
  {
    lessonName: 'Hệ miễn dịch đáp ứng',
    lecturerEmail: 'lecturer2@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 12 - Sinh học miễn dịch'],
    status: ExamStatus.COMPLETED,
    startTime: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), // 40 days ago
    endTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
  },
  // SINH10 - Tế bào học
  {
    lessonName: 'Cấu trúc tế bào nhân sơ và nhân thực',
    lecturerEmail: 'lecturer4@example.com', // Cô Phạm Thị Tế Bào
    questionSetTitles: ['Kiểm tra Sinh học 10 - Tế bào học'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
  },
  {
    lessonName: 'Màng sinh học và vận chuyển',
    lecturerEmail: 'lecturer4@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 10 - Tế bào học'],
    status: ExamStatus.COMPLETED,
    startTime: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(), // 24 days ago
    endTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days ago
  },
  // SINH10 - Phân bào
  {
    lessonName: 'Nguyên phân và chu kỳ tế bào',
    lecturerEmail: 'lecturer4@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 10 - Phân bào'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days from now
  },
  // SINH11 - Sinh lý thực vật
  {
    lessonName: 'Quang hợp - Pha sáng',
    lecturerEmail: 'lecturer12@example.com', // Cô Mai Thị Thực Vật
    questionSetTitles: ['Kiểm tra Sinh học 11 - Sinh lý thực vật'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(), // 11 days ago
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
  },
  {
    lessonName: 'Vận chuyển nước và khoáng',
    lecturerEmail: 'lecturer12@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 11 - Sinh lý thực vật'],
    status: ExamStatus.COMPLETED,
    startTime: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(), // 22 days ago
    endTime: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() // 12 days ago
  },
  // SINH11 - Sinh lý động vật
  {
    lessonName: 'Hệ tuần hoàn máu',
    lecturerEmail: 'lecturer11@example.com', // Thầy Lưu Văn Động Vật
    questionSetTitles: ['Kiểm tra Sinh học 11 - Sinh lý động vật'],
    status: ExamStatus.ACTIVE,
    startTime: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
  },
  {
    lessonName: 'Hệ thần kinh',
    lecturerEmail: 'lecturer11@example.com',
    questionSetTitles: ['Kiểm tra Sinh học 11 - Sinh lý động vật'],
    status: ExamStatus.DRAFT,
    startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    endTime: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString() // 21 days from now
  }
]
