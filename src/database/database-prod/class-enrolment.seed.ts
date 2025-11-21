// Seed data for ClassEnrolment - Enroll students in classes
// Chỉ enroll học sinh đã làm entry test (hasParticipatedEntryTest: true)
// Phân bổ học sinh vào 6 lớp với số lượng nhiều hơn

export const classEnrolmentSeedData = [
  // SINH12-SCHOOL-2024 - 15 học sinh
  {
    studentEmail: 'student1@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student2@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student4@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student5@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student7@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student8@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student10@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student11@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-02'
  },
  {
    studentEmail: 'student12@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-02'
  },
  {
    studentEmail: 'student14@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-02'
  },
  {
    studentEmail: 'student15@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-03'
  },
  {
    studentEmail: 'student16@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-03'
  },
  {
    studentEmail: 'student17@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-03'
  },
  {
    studentEmail: 'student18@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-04'
  },
  {
    studentEmail: 'student19@example.com',
    classCode: 'SINH12-SCHOOL-2024',
    enrolmentDate: '2024-09-04'
  },
  // SINH12-CITY-2024 - 8 học sinh (từ SINH12-SCHOOL đã đạt)
  {
    studentEmail: 'student1@example.com',
    classCode: 'SINH12-CITY-2024',
    enrolmentDate: '2024-09-05'
  },
  {
    studentEmail: 'student2@example.com',
    classCode: 'SINH12-CITY-2024',
    enrolmentDate: '2024-09-05'
  },
  {
    studentEmail: 'student5@example.com',
    classCode: 'SINH12-CITY-2024',
    enrolmentDate: '2024-09-05'
  },
  {
    studentEmail: 'student8@example.com',
    classCode: 'SINH12-CITY-2024',
    enrolmentDate: '2024-09-05'
  },
  {
    studentEmail: 'student11@example.com',
    classCode: 'SINH12-CITY-2024',
    enrolmentDate: '2024-09-06'
  },
  {
    studentEmail: 'student12@example.com',
    classCode: 'SINH12-CITY-2024',
    enrolmentDate: '2024-09-06'
  },
  {
    studentEmail: 'student14@example.com',
    classCode: 'SINH12-CITY-2024',
    enrolmentDate: '2024-09-06'
  },
  {
    studentEmail: 'student15@example.com',
    classCode: 'SINH12-CITY-2024',
    enrolmentDate: '2024-09-07'
  },
  // SINH12-PROVINCE-2024 - 7 học sinh (từ SINH12-CITY đã đạt)
  {
    studentEmail: 'student1@example.com',
    classCode: 'SINH12-PROVINCE-2024',
    enrolmentDate: '2024-09-10'
  },
  {
    studentEmail: 'student2@example.com',
    classCode: 'SINH12-PROVINCE-2024',
    enrolmentDate: '2024-09-10'
  },
  {
    studentEmail: 'student5@example.com',
    classCode: 'SINH12-PROVINCE-2024',
    enrolmentDate: '2024-09-10'
  },
  {
    studentEmail: 'student11@example.com',
    classCode: 'SINH12-PROVINCE-2024',
    enrolmentDate: '2024-09-11'
  },
  {
    studentEmail: 'student12@example.com',
    classCode: 'SINH12-PROVINCE-2024',
    enrolmentDate: '2024-09-11'
  },
  {
    studentEmail: 'student16@example.com',
    classCode: 'SINH12-PROVINCE-2024',
    enrolmentDate: '2024-09-12'
  },
  {
    studentEmail: 'student17@example.com',
    classCode: 'SINH12-PROVINCE-2024',
    enrolmentDate: '2024-09-12'
  },
  // SINH12-NATIONAL-2024 - 6 học sinh (từ SINH12-PROVINCE đã đạt)
  {
    studentEmail: 'student1@example.com',
    classCode: 'SINH12-NATIONAL-2024',
    enrolmentDate: '2024-09-15'
  },
  {
    studentEmail: 'student2@example.com',
    classCode: 'SINH12-NATIONAL-2024',
    enrolmentDate: '2024-09-15'
  },
  {
    studentEmail: 'student5@example.com',
    classCode: 'SINH12-NATIONAL-2024',
    enrolmentDate: '2024-09-15'
  },
  {
    studentEmail: 'student11@example.com',
    classCode: 'SINH12-NATIONAL-2024',
    enrolmentDate: '2024-09-16'
  },
  {
    studentEmail: 'student17@example.com',
    classCode: 'SINH12-NATIONAL-2024',
    enrolmentDate: '2024-09-17'
  },
  {
    studentEmail: 'student18@example.com',
    classCode: 'SINH12-NATIONAL-2024',
    enrolmentDate: '2024-09-17'
  },
  // SINH11-SCHOOL-2024 - 6 học sinh
  {
    studentEmail: 'student3@example.com',
    classCode: 'SINH11-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student6@example.com',
    classCode: 'SINH11-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student9@example.com',
    classCode: 'SINH11-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student21@example.com',
    classCode: 'SINH11-SCHOOL-2024',
    enrolmentDate: '2024-09-02'
  },
  {
    studentEmail: 'student22@example.com',
    classCode: 'SINH11-SCHOOL-2024',
    enrolmentDate: '2024-09-02'
  },
  {
    studentEmail: 'student24@example.com',
    classCode: 'SINH11-SCHOOL-2024',
    enrolmentDate: '2024-09-03'
  },
  // SINH10-SCHOOL-2024 - 6 học sinh
  {
    studentEmail: 'student29@example.com',
    classCode: 'SINH10-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student30@example.com',
    classCode: 'SINH10-SCHOOL-2024',
    enrolmentDate: '2024-09-01'
  },
  {
    studentEmail: 'student31@example.com',
    classCode: 'SINH10-SCHOOL-2024',
    enrolmentDate: '2024-09-02'
  },
  {
    studentEmail: 'student32@example.com',
    classCode: 'SINH10-SCHOOL-2024',
    enrolmentDate: '2024-09-02'
  },
  {
    studentEmail: 'student33@example.com',
    classCode: 'SINH10-SCHOOL-2024',
    enrolmentDate: '2024-09-03'
  },
  {
    studentEmail: 'student34@example.com',
    classCode: 'SINH10-SCHOOL-2024',
    enrolmentDate: '2024-09-03'
  }
]
