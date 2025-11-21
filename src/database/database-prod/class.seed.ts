import { ClassType } from '@common/enums/class-types.enum'

// Dữ liệu seed cho các lớp thi học sinh giỏi Sinh học
// Giảm xuống 6 lớp với số lượng học sinh nhiều hơn
export const classSeedData = [
  {
    classCode: 'SINH12-SCHOOL-2024',
    className: 'Lớp thi học sinh giỏi - Cấp trường 2024-2025',
    classType: ClassType.SCHOOL,
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    isActive: true
  },
  {
    classCode: 'SINH12-CITY-2024',
    className: 'Lớp thi học sinh giỏi - Cấp thành phố 2024-2025',
    classType: ClassType.CITY,
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    isActive: true
  },
  {
    classCode: 'SINH12-PROVINCE-2024',
    className: 'Lớp thi học sinh giỏi - Cấp tỉnh 2024-2025',
    classType: ClassType.PROVINCE,
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    isActive: true
  },
  {
    classCode: 'SINH12-NATIONAL-2024',
    className: 'Lớp thi học sinh giỏi - Cấp quốc gia 2024-2025',
    classType: ClassType.NATIONAL,
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    isActive: true
  },
  {
    classCode: 'SINH11-SCHOOL-2024',
    className: 'Lớp thi học sinh giỏi - Cấp trường 2024-2025',
    classType: ClassType.SCHOOL,
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    isActive: true
  },
  {
    classCode: 'SINH10-SCHOOL-2024',
    className: 'Lớp thi học sinh giỏi - Cấp trường 2024-2025',
    classType: ClassType.SCHOOL,
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    isActive: true
  }
]
