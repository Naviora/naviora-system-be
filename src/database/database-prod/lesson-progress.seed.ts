// Seed data for LessonProgressEntity
// Lesson progress tracks student completion of Biology lessons
// lessonName and studentEmail will be replaced by actual IDs during seeding
// completedAt is null for in-progress lessons, or a date for completed lessons

export const lessonProgressSeedData = [
  // SINH10 - Tế bào học progress
  {
    lessonName: 'Cấu trúc tế bào nhân sơ và nhân thực',
    studentEmail: 'student29@example.com',
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // Completed 5 days ago
  },
  {
    lessonName: 'Cấu trúc tế bào nhân sơ và nhân thực',
    studentEmail: 'student30@example.com',
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // Completed 3 days ago
  },
  {
    lessonName: 'Cấu trúc tế bào nhân sơ và nhân thực',
    studentEmail: 'student31@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Màng sinh học và vận chuyển',
    studentEmail: 'student29@example.com',
    completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // Completed 4 days ago
  },
  {
    lessonName: 'Màng sinh học và vận chuyển',
    studentEmail: 'student30@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Các bào quan trong tế bào',
    studentEmail: 'student29@example.com',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // Completed 2 days ago
  },
  {
    lessonName: 'Các bào quan trong tế bào',
    studentEmail: 'student32@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Khung tế bào và màng tế bào',
    studentEmail: 'student30@example.com',
    completedAt: null // In progress
  },
  // SINH10 - Vi sinh vật học progress
  {
    lessonName: 'Vi khuẩn và cấu trúc',
    studentEmail: 'student29@example.com',
    completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // Completed 6 days ago
  },
  {
    lessonName: 'Virus và cơ chế xâm nhập',
    studentEmail: 'student30@example.com',
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Completed 1 day ago
  },
  {
    lessonName: 'Virus và cơ chế xâm nhập',
    studentEmail: 'student31@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Vi sinh vật có ích và có hại',
    studentEmail: 'student29@example.com',
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // Completed 7 days ago
  },
  // SINH10 - Phân bào progress
  {
    lessonName: 'Nguyên phân và chu kỳ tế bào',
    studentEmail: 'student30@example.com',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // Completed 2 days ago
  },
  {
    lessonName: 'Nguyên phân và chu kỳ tế bào',
    studentEmail: 'student32@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Giảm phân và hình thành giao tử',
    studentEmail: 'student29@example.com',
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Completed 1 day ago
  },
  {
    lessonName: 'Giảm phân và hình thành giao tử',
    studentEmail: 'student31@example.com',
    completedAt: null // In progress
  },
  // SINH11 - Sinh lý thực vật progress
  {
    lessonName: 'Quang hợp - Pha sáng',
    studentEmail: 'student3@example.com',
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // Completed 3 days ago
  },
  {
    lessonName: 'Quang hợp - Pha sáng',
    studentEmail: 'student6@example.com',
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Completed 1 day ago
  },
  {
    lessonName: 'Quang hợp - Pha tối',
    studentEmail: 'student3@example.com',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // Completed 2 days ago
  },
  {
    lessonName: 'Quang hợp - Pha tối',
    studentEmail: 'student9@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Hô hấp ở thực vật',
    studentEmail: 'student3@example.com',
    completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // Completed 4 days ago
  },
  {
    lessonName: 'Vận chuyển nước và khoáng',
    studentEmail: 'student6@example.com',
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Completed 1 day ago
  },
  {
    lessonName: 'Vận chuyển chất hữu cơ',
    studentEmail: 'student3@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Hormone thực vật',
    studentEmail: 'student6@example.com',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // Completed 2 days ago
  },
  {
    lessonName: 'Cảm ứng với ánh sáng',
    studentEmail: 'student9@example.com',
    completedAt: null // In progress
  },
  // SINH11 - Sinh lý động vật progress
  {
    lessonName: 'Hệ tuần hoàn máu',
    studentEmail: 'student21@example.com',
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // Completed 5 days ago
  },
  {
    lessonName: 'Hệ tuần hoàn máu',
    studentEmail: 'student22@example.com',
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // Completed 3 days ago
  },
  {
    lessonName: 'Hệ hô hấp và trao đổi khí',
    studentEmail: 'student21@example.com',
    completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // Completed 4 days ago
  },
  {
    lessonName: 'Hệ tiêu hóa và hấp thu',
    studentEmail: 'student23@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Hệ bài tiết',
    studentEmail: 'student21@example.com',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // Completed 2 days ago
  },
  {
    lessonName: 'Hệ thần kinh',
    studentEmail: 'student24@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Hệ nội tiết',
    studentEmail: 'student21@example.com',
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Completed 1 day ago
  },
  // SINH12 - Di truyền học phân tử progress
  {
    lessonName: 'Cấu trúc và chức năng của ADN',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // Completed 10 days ago
  },
  {
    lessonName: 'Cấu trúc và chức năng của ADN',
    studentEmail: 'student2@example.com',
    completedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // Completed 8 days ago
  },
  {
    lessonName: 'Cấu trúc và chức năng của ADN',
    studentEmail: 'student4@example.com',
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // Completed 5 days ago
  },
  {
    lessonName: 'Nhân đôi ADN',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString() // Completed 9 days ago
  },
  {
    lessonName: 'Nhân đôi ADN',
    studentEmail: 'student5@example.com',
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // Completed 7 days ago
  },
  {
    lessonName: 'Phiên mã và xử lý ARN',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // Completed 8 days ago
  },
  {
    lessonName: 'Phiên mã và xử lý ARN',
    studentEmail: 'student2@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Dịch mã và tổng hợp protein',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // Completed 7 days ago
  },
  {
    lessonName: 'Dịch mã và tổng hợp protein',
    studentEmail: 'student7@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Mã di truyền và tính chất',
    studentEmail: 'student2@example.com',
    completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // Completed 6 days ago
  },
  {
    lessonName: 'Điều hòa biểu hiện gen',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // Completed 5 days ago
  },
  {
    lessonName: 'Điều hòa biểu hiện gen',
    studentEmail: 'student5@example.com',
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // Completed 3 days ago
  },
  // SINH12 - Đột biến và biến dị progress
  {
    lessonName: 'Đột biến gen',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // Completed 4 days ago
  },
  {
    lessonName: 'Đột biến gen',
    studentEmail: 'student2@example.com',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // Completed 2 days ago
  },
  {
    lessonName: 'Đột biến cấu trúc nhiễm sắc thể',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // Completed 3 days ago
  },
  {
    lessonName: 'Đột biến số lượng nhiễm sắc thể',
    studentEmail: 'student5@example.com',
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Completed 1 day ago
  },
  {
    lessonName: 'Đột biến số lượng nhiễm sắc thể',
    studentEmail: 'student8@example.com',
    completedAt: null // In progress
  },
  // SINH12 - Quy luật di truyền progress
  {
    lessonName: 'Quy luật di truyền Mendel',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() // Completed 12 days ago
  },
  {
    lessonName: 'Quy luật di truyền Mendel',
    studentEmail: 'student2@example.com',
    completedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString() // Completed 11 days ago
  },
  {
    lessonName: 'Di truyền liên kết và hoán vị gen',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // Completed 10 days ago
  },
  {
    lessonName: 'Di truyền liên kết với giới tính',
    studentEmail: 'student2@example.com',
    completedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString() // Completed 9 days ago
  },
  {
    lessonName: 'Di truyền quần thể',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // Completed 8 days ago
  },
  {
    lessonName: 'Di truyền quần thể',
    studentEmail: 'student5@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Các yếu tố tiến hóa quần thể',
    studentEmail: 'student11@example.com',
    completedAt: null // In progress
  },
  // SINH12 - Tiến hóa progress
  {
    lessonName: 'Thuyết tiến hóa Darwin',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() // Completed 15 days ago
  },
  {
    lessonName: 'Bằng chứng tiến hóa',
    studentEmail: 'student2@example.com',
    completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // Completed 14 days ago
  },
  {
    lessonName: 'Cơ chế tiến hóa',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString() // Completed 13 days ago
  },
  {
    lessonName: 'Tiến hóa phân tử',
    studentEmail: 'student5@example.com',
    completedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() // Completed 12 days ago
  },
  {
    lessonName: 'Tiến hóa phân tử',
    studentEmail: 'student11@example.com',
    completedAt: null // In progress
  },
  // SINH12 - Sinh thái học progress
  {
    lessonName: 'Đặc trưng quần thể sinh vật',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() // Completed 20 days ago
  },
  {
    lessonName: 'Biến động số lượng quần thể',
    studentEmail: 'student2@example.com',
    completedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString() // Completed 18 days ago
  },
  {
    lessonName: 'Cấu trúc quần xã sinh vật',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString() // Completed 17 days ago
  },
  {
    lessonName: 'Mối quan hệ giữa các loài',
    studentEmail: 'student5@example.com',
    completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() // Completed 15 days ago
  },
  {
    lessonName: 'Chuỗi và lưới thức ăn',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString() // Completed 16 days ago
  },
  {
    lessonName: 'Diễn thế sinh thái',
    studentEmail: 'student11@example.com',
    completedAt: null // In progress
  },
  {
    lessonName: 'Dòng năng lượng trong hệ sinh thái',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // Completed 14 days ago
  },
  {
    lessonName: 'Chu trình vật chất',
    studentEmail: 'student2@example.com',
    completedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString() // Completed 13 days ago
  },
  {
    lessonName: 'Các hệ sinh thái chính',
    studentEmail: 'student5@example.com',
    completedAt: null // In progress
  },
  // SINH12 - Đa dạng sinh học progress
  {
    lessonName: 'Đa dạng sinh học',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString() // Completed 11 days ago
  },
  {
    lessonName: 'Các mối đe dọa đa dạng sinh học',
    studentEmail: 'student2@example.com',
    completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // Completed 10 days ago
  },
  {
    lessonName: 'Bảo tồn đa dạng sinh học',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString() // Completed 9 days ago
  },
  // SINH12 - Công nghệ gen progress
  {
    lessonName: 'Kỹ thuật ADN tái tổ hợp',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // Completed 6 days ago
  },
  {
    lessonName: 'Nhân bản gen và PCR',
    studentEmail: 'student2@example.com',
    completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // Completed 4 days ago
  },
  {
    lessonName: 'Ứng dụng công nghệ gen',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // Completed 2 days ago
  },
  {
    lessonName: 'Ứng dụng công nghệ gen',
    studentEmail: 'student11@example.com',
    completedAt: null // In progress
  },
  // SINH12 - Sinh học miễn dịch progress
  {
    lessonName: 'Hệ miễn dịch bẩm sinh',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Completed 1 day ago
  },
  {
    lessonName: 'Hệ miễn dịch đáp ứng',
    studentEmail: 'student2@example.com',
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Completed 1 day ago
  },
  {
    lessonName: 'Vắc xin và liệu pháp miễn dịch',
    studentEmail: 'student1@example.com',
    completedAt: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Completed today
  },
  {
    lessonName: 'Vắc xin và liệu pháp miễn dịch',
    studentEmail: 'student11@example.com',
    completedAt: null // In progress
  }
]
