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
  },
  // SINH12 - Di truyền học phân tử submissions
  {
    lessonName: 'Cấu trúc và chức năng của ADN',
    studentEmail: 'student1@example.com',
    score: 10,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc! Hiểu rõ cấu trúc ADN',
    penalty: false
  },
  {
    lessonName: 'Cấu trúc và chức năng của ADN',
    studentEmail: 'student2@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Tốt, cần chú ý thêm về liên kết hydrogen',
    penalty: false
  },
  {
    lessonName: 'Cấu trúc và chức năng của ADN',
    studentEmail: 'student11@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  {
    lessonName: 'Nhân đôi ADN',
    studentEmail: 'student3@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Rất tốt! Nắm vững cơ chế nhân đôi',
    penalty: false
  },
  {
    lessonName: 'Nhân đôi ADN',
    studentEmail: 'student4@example.com',
    score: 8,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Nhân đôi ADN',
    studentEmail: 'student12@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  {
    lessonName: 'Dịch mã và tổng hợp protein',
    studentEmail: 'student5@example.com',
    score: 8,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Tốt, cần luyện thêm về codon và anticodon',
    penalty: false
  },
  {
    lessonName: 'Dịch mã và tổng hợp protein',
    studentEmail: 'student6@example.com',
    score: 7,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Dịch mã và tổng hợp protein',
    studentEmail: 'student13@example.com',
    score: 7,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Nộp muộn 1 ngày',
    penalty: true
  },
  // SINH12 - Đột biến submissions
  {
    lessonName: 'Đột biến gen',
    studentEmail: 'student7@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc! Phân biệt rõ các loại đột biến',
    penalty: false
  },
  {
    lessonName: 'Đột biến gen',
    studentEmail: 'student8@example.com',
    score: 8,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Đột biến gen',
    studentEmail: 'student14@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  {
    lessonName: 'Đột biến cấu trúc nhiễm sắc thể',
    studentEmail: 'student9@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Tốt, cần chú ý về hậu quả của từng loại đột biến',
    penalty: false
  },
  {
    lessonName: 'Đột biến cấu trúc nhiễm sắc thể',
    studentEmail: 'student10@example.com',
    score: 8,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  // SINH12 - Quy luật di truyền submissions
  {
    lessonName: 'Quy luật di truyền Mendel',
    studentEmail: 'student11@example.com',
    score: 10,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc! Giải bài tập di truyền rất tốt',
    penalty: false
  },
  {
    lessonName: 'Quy luật di truyền Mendel',
    studentEmail: 'student15@example.com',
    score: 9,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Quy luật di truyền Mendel',
    studentEmail: 'student16@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  // SINH12 - Tiến hóa submissions
  {
    lessonName: 'Thuyết tiến hóa Darwin',
    studentEmail: 'student12@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Rất tốt! Hiểu sâu về chọn lọc tự nhiên',
    penalty: false
  },
  {
    lessonName: 'Thuyết tiến hóa Darwin',
    studentEmail: 'student17@example.com',
    score: 8,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Bằng chứng tiến hóa',
    studentEmail: 'student13@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Tốt, cần liên hệ thêm các bằng chứng với nhau',
    penalty: false
  },
  {
    lessonName: 'Bằng chứng tiến hóa',
    studentEmail: 'student18@example.com',
    score: 7,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  // SINH12 - Sinh thái học submissions
  {
    lessonName: 'Đặc trưng quần thể sinh vật',
    studentEmail: 'student14@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc! Nắm vững các đặc trưng quần thể',
    penalty: false
  },
  {
    lessonName: 'Đặc trưng quần thể sinh vật',
    studentEmail: 'student19@example.com',
    score: 9,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Đặc trưng quần thể sinh vật',
    studentEmail: 'student20@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  {
    lessonName: 'Cấu trúc quần xã sinh vật',
    studentEmail: 'student15@example.com',
    score: 8,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Tốt, cần phân tích sâu hơn về mối quan hệ giữa các loài',
    penalty: false
  },
  {
    lessonName: 'Cấu trúc quần xã sinh vật',
    studentEmail: 'student21@example.com',
    score: 8,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  // SINH12 - Công nghệ gen submissions
  {
    lessonName: 'Kỹ thuật ADN tái tổ hợp',
    studentEmail: 'student16@example.com',
    score: 10,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc! Hiểu rõ các bước của kỹ thuật',
    penalty: false
  },
  {
    lessonName: 'Kỹ thuật ADN tái tổ hợp',
    studentEmail: 'student22@example.com',
    score: 8,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Kỹ thuật ADN tái tổ hợp',
    studentEmail: 'student23@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  // SINH12 - Miễn dịch submissions
  {
    lessonName: 'Hệ miễn dịch bẩm sinh',
    studentEmail: 'student17@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Tốt, cần phân biệt rõ miễn dịch bẩm sinh và đáp ứng',
    penalty: false
  },
  {
    lessonName: 'Hệ miễn dịch bẩm sinh',
    studentEmail: 'student24@example.com',
    score: 8,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Hệ miễn dịch đáp ứng',
    studentEmail: 'student18@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Rất tốt! Hiểu rõ cơ chế tạo kháng thể',
    penalty: false
  },
  {
    lessonName: 'Hệ miễn dịch đáp ứng',
    studentEmail: 'student25@example.com',
    score: 8,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  // SINH10 - Tế bào học submissions
  {
    lessonName: 'Cấu trúc tế bào nhân sơ và nhân thực',
    studentEmail: 'student19@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc! So sánh rõ ràng hai loại tế bào',
    penalty: false
  },
  {
    lessonName: 'Cấu trúc tế bào nhân sơ và nhân thực',
    studentEmail: 'student26@example.com',
    score: 9,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Cấu trúc tế bào nhân sơ và nhân thực',
    studentEmail: 'student27@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  {
    lessonName: 'Màng sinh học và vận chuyển',
    studentEmail: 'student20@example.com',
    score: 8,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Tốt, cần phân biệt rõ vận chuyển thụ động và chủ động',
    penalty: false
  },
  {
    lessonName: 'Màng sinh học và vận chuyển',
    studentEmail: 'student28@example.com',
    score: 7,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  // SINH10 - Phân bào submissions
  {
    lessonName: 'Nguyên phân và chu kỳ tế bào',
    studentEmail: 'student21@example.com',
    score: 10,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc! Nắm vững các giai đoạn nguyên phân',
    penalty: false
  },
  {
    lessonName: 'Nguyên phân và chu kỳ tế bào',
    studentEmail: 'student29@example.com',
    score: 8,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Nguyên phân và chu kỳ tế bào',
    studentEmail: 'student30@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  // SINH11 - Sinh lý thực vật submissions
  {
    lessonName: 'Quang hợp - Pha sáng',
    studentEmail: 'student22@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Rất tốt! Hiểu rõ cơ chế quang phosphoryl hóa',
    penalty: false
  },
  {
    lessonName: 'Quang hợp - Pha sáng',
    studentEmail: 'student31@example.com',
    score: 9,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Vận chuyển nước và khoáng',
    studentEmail: 'student23@example.com',
    score: 8,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Tốt, cần hiểu rõ hơn về lực hút do thoát hơi nước',
    penalty: false
  },
  {
    lessonName: 'Vận chuyển nước và khoáng',
    studentEmail: 'student32@example.com',
    score: 8,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  // SINH11 - Sinh lý động vật submissions
  {
    lessonName: 'Hệ tuần hoàn máu',
    studentEmail: 'student24@example.com',
    score: 9,
    attemptStatus: AttemptStatus.GRADED,
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    note: 'Xuất sắc! Hiểu rõ cấu trúc và chức năng tim',
    penalty: false
  },
  {
    lessonName: 'Hệ tuần hoàn máu',
    studentEmail: 'student33@example.com',
    score: 8,
    attemptStatus: AttemptStatus.SUBMITTED,
    submittedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    note: null,
    penalty: false
  },
  {
    lessonName: 'Hệ tuần hoàn máu',
    studentEmail: 'student34@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  {
    lessonName: 'Hệ thần kinh',
    studentEmail: 'student25@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  {
    lessonName: 'Hệ thần kinh',
    studentEmail: 'student35@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  },
  // Thêm một số submissions với status CANCELLED
  {
    lessonName: 'Dòng năng lượng trong hệ sinh thái',
    studentEmail: 'student26@example.com',
    score: null,
    attemptStatus: AttemptStatus.CANCELLED,
    submittedAt: null,
    note: 'Hủy do lỗi kỹ thuật',
    penalty: null
  },
  {
    lessonName: 'Di truyền liên kết và hoán vị gen',
    studentEmail: 'student27@example.com',
    score: null,
    attemptStatus: AttemptStatus.IN_PROGRESS,
    submittedAt: null,
    note: null,
    penalty: null
  }
]
