// Seed data for MeetingEventEntity
// Meeting events are online/offline meetings for Biology classes
// classCode, hostEmail, inviteeEmails will be replaced by actual IDs during seeding
// All content must be Biology-related and in Vietnamese

export const meetingEventSeedData = [
  {
    classCode: 'SINH12-SCHOOL-2024',
    hostEmail: 'lecturer@example.com', // Thầy Nguyễn Văn Sinh
    inviteeEmails: ['student1@example.com', 'student2@example.com', 'student4@example.com', 'student5@example.com'],
    title: 'Buổi học trực tuyến: Di truyền học phân tử',
    description: 'Buổi học trực tuyến về di truyền học phân tử, cấu trúc ADN và quá trình nhân đôi ADN',
    note: 'Học sinh chuẩn bị tài liệu trước khi vào lớp',
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), // 90 minutes later
    code: 'SINH12-MEET-001'
  },
  {
    classCode: 'SINH12-CITY-2024',
    hostEmail: 'lecturer2@example.com', // Cô Trần Thị Sinh Học
    inviteeEmails: ['student1@example.com', 'student2@example.com', 'student5@example.com', 'student8@example.com'],
    title: 'Buổi thảo luận: Đột biến gen và hậu quả',
    description: 'Buổi thảo luận về các loại đột biến gen, cơ chế phát sinh và hậu quả trong di truyền',
    note: null,
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 120 * 60 * 1000).toISOString(), // 120 minutes later
    code: 'SINH12-MEET-002'
  },
  {
    classCode: 'SINH12-PROVINCE-2024',
    hostEmail: 'lecturer3@example.com', // Thầy Lê Văn Di Truyền
    inviteeEmails: ['student1@example.com', 'student2@example.com', 'student5@example.com', 'student11@example.com'],
    title: 'Buổi học: Quy luật di truyền Mendel',
    description: 'Buổi học về các quy luật di truyền Mendel, phép lai một và hai cặp tính trạng',
    note: 'Làm bài tập trước khi vào lớp',
    startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), // 90 minutes later
    code: 'SINH12-MEET-003'
  },
  {
    classCode: 'SINH12-NATIONAL-2024',
    hostEmail: 'lecturer2@example.com', // Cô Trần Thị Sinh Học
    inviteeEmails: ['student1@example.com', 'student2@example.com', 'student5@example.com', 'student11@example.com'],
    title: 'Buổi ôn tập: Tiến hóa sinh học',
    description: 'Buổi ôn tập về thuyết tiến hóa Darwin, bằng chứng tiến hóa và các cơ chế tiến hóa',
    note: null,
    startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 120 * 60 * 1000).toISOString(), // 120 minutes later
    code: 'SINH12-MEET-004'
  },
  {
    classCode: 'SINH12-INTERNATIONAL-2024',
    hostEmail: 'lecturer@example.com', // Thầy Nguyễn Văn Sinh
    inviteeEmails: ['student1@example.com', 'student2@example.com', 'student11@example.com'],
    title: 'Buổi học nâng cao: Sinh học miễn dịch',
    description: 'Buổi học nâng cao về hệ miễn dịch, kháng nguyên, kháng thể và ứng dụng trong y học',
    note: 'Đọc tài liệu trước về hệ miễn dịch',
    startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 150 * 60 * 1000).toISOString(), // 150 minutes later
    code: 'SINH12-MEET-005'
  },
  {
    classCode: 'SINH11-SCHOOL-2024',
    hostEmail: 'lecturer6@example.com', // Cô Vũ Thị Sinh Lý
    inviteeEmails: ['student3@example.com', 'student6@example.com', 'student9@example.com', 'student21@example.com'],
    title: 'Buổi học: Sinh lý thực vật - Quang hợp',
    description: 'Buổi học về quá trình quang hợp ở thực vật, pha sáng và pha tối',
    note: null,
    startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), // 90 minutes later
    code: 'SINH11-MEET-001'
  },
  {
    classCode: 'SINH11-CITY-2024',
    hostEmail: 'lecturer12@example.com', // Cô Mai Thị Thực Vật
    inviteeEmails: ['student3@example.com', 'student6@example.com', 'student21@example.com', 'student24@example.com'],
    title: 'Buổi thảo luận: Sinh lý động vật - Hệ tuần hoàn',
    description: 'Buổi thảo luận về hệ tuần hoàn máu, cấu trúc tim và mạch máu',
    note: 'Xem video về hệ tuần hoàn trước',
    startTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 120 * 60 * 1000).toISOString(), // 120 minutes later
    code: 'SINH11-MEET-002'
  },
  {
    classCode: 'SINH10-SCHOOL-2024',
    hostEmail: 'lecturer4@example.com', // Cô Phạm Thị Tế Bào
    inviteeEmails: ['student29@example.com', 'student30@example.com', 'student31@example.com', 'student32@example.com'],
    title: 'Buổi học: Tế bào học - Cấu trúc tế bào',
    description: 'Buổi học về cấu trúc tế bào nhân sơ và nhân thực, các bào quan và chức năng',
    note: null,
    startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), // 90 minutes later
    code: 'SINH10-MEET-001'
  },
  {
    classCode: 'SINH10-CITY-2024',
    hostEmail: 'lecturer4@example.com', // Cô Phạm Thị Tế Bào
    inviteeEmails: ['student29@example.com', 'student30@example.com', 'student34@example.com', 'student35@example.com'],
    title: 'Buổi học: Vi sinh vật học',
    description: 'Buổi học về vi khuẩn, virus và các vi sinh vật khác, vai trò trong tự nhiên',
    note: 'Chuẩn bị câu hỏi về vi sinh vật',
    startTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
    endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), // 90 minutes later
    code: 'SINH10-MEET-002'
  },
  {
    classCode: 'SINH12-SCHOOL-2024',
    hostEmail: 'lecturer@example.com', // Thầy Nguyễn Văn Sinh
    inviteeEmails: [
      'student1@example.com',
      'student2@example.com',
      'student4@example.com',
      'student5@example.com',
      'student7@example.com'
    ],
    title: 'Buổi ôn tập tổng hợp: Sinh thái học',
    description: 'Buổi ôn tập tổng hợp về sinh thái học quần thể, quần xã và hệ sinh thái',
    note: null,
    startTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days from now
    endTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000 + 120 * 60 * 1000).toISOString(), // 120 minutes later
    code: 'SINH12-MEET-006'
  },
  {
    classCode: 'SINH12-CITY-2024',
    hostEmail: 'lecturer2@example.com', // Cô Trần Thị Sinh Học
    inviteeEmails: [
      'student1@example.com',
      'student2@example.com',
      'student5@example.com',
      'student8@example.com',
      'student11@example.com'
    ],
    title: 'Buổi học: Công nghệ gen và kỹ thuật di truyền',
    description: 'Buổi học về kỹ thuật ADN tái tổ hợp, nhân bản gen và ứng dụng trong thực tiễn',
    note: 'Đọc tài liệu về PCR và kỹ thuật ADN tái tổ hợp',
    startTime: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days from now
    endTime: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000 + 150 * 60 * 1000).toISOString(), // 150 minutes later
    code: 'SINH12-MEET-007'
  },
  {
    classCode: 'SINH11-SCHOOL-2024',
    hostEmail: 'lecturer6@example.com', // Cô Vũ Thị Sinh Lý
    inviteeEmails: [
      'student3@example.com',
      'student6@example.com',
      'student9@example.com',
      'student21@example.com',
      'student22@example.com'
    ],
    title: 'Buổi thảo luận: Hệ thần kinh và nội tiết',
    description: 'Buổi thảo luận về hệ thần kinh, hệ nội tiết và điều hòa hoạt động cơ thể',
    note: null,
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 120 * 60 * 1000).toISOString(), // 120 minutes later
    code: 'SINH11-MEET-003'
  },
  {
    classCode: 'SINH10-SCHOOL-2024',
    hostEmail: 'lecturer4@example.com', // Cô Phạm Thị Tế Bào
    inviteeEmails: ['student29@example.com', 'student30@example.com', 'student31@example.com'],
    title: 'Buổi học: Phân bào và chu kỳ tế bào',
    description: 'Buổi học về nguyên phân, giảm phân, chu kỳ tế bào và điều hòa phân bào',
    note: 'Xem sơ đồ các giai đoạn nguyên phân',
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), // 90 minutes later
    code: 'SINH10-MEET-003'
  },
  {
    classCode: 'SINH12-PROVINCE-2024',
    hostEmail: 'lecturer3@example.com', // Thầy Lê Văn Di Truyền
    inviteeEmails: [
      'student1@example.com',
      'student2@example.com',
      'student5@example.com',
      'student11@example.com',
      'student12@example.com'
    ],
    title: 'Buổi ôn tập: Di truyền quần thể nâng cao',
    description: 'Buổi ôn tập về cấu trúc di truyền quần thể, định luật Hardy-Weinberg và các yếu tố tiến hóa',
    note: null,
    startTime: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000).toISOString(), // 11 days from now
    endTime: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000 + 120 * 60 * 1000).toISOString(), // 120 minutes later
    code: 'SINH12-MEET-008'
  },
  {
    classCode: 'SINH11-CITY-2024',
    hostEmail: 'lecturer12@example.com', // Cô Mai Thị Thực Vật
    inviteeEmails: ['student3@example.com', 'student6@example.com', 'student21@example.com'],
    title: 'Buổi học: Cảm ứng ở thực vật',
    description: 'Buổi học về các phản ứng của thực vật với môi trường, hormone thực vật',
    note: 'Làm bài tập về hormone thực vật',
    startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), // 90 minutes later
    code: 'SINH11-MEET-004'
  }
]
