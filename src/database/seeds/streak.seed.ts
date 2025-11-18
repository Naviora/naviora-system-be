// Seed data for StreakEntity
// Streaks track consecutive days of student activity/learning
// studentEmail will be replaced by actual student ID during seeding
// Include various streak counts and dates to test different scenarios

export const streakSeedData = [
  // Active streaks (ongoing)
  {
    studentEmail: 'student1@example.com',
    currentStreak: 15,
    longestStreak: 20,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student2@example.com',
    currentStreak: 23,
    longestStreak: 30,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student3@example.com',
    currentStreak: 8,
    longestStreak: 12,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student4@example.com',
    currentStreak: 31,
    longestStreak: 35,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student5@example.com',
    currentStreak: 12,
    longestStreak: 15,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student6@example.com',
    currentStreak: 19,
    longestStreak: 25,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student7@example.com',
    currentStreak: 5,
    longestStreak: 8,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student8@example.com',
    currentStreak: 42,
    longestStreak: 50,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student9@example.com',
    currentStreak: 3,
    longestStreak: 5,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student10@example.com',
    currentStreak: 27,
    longestStreak: 32,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student11@example.com',
    currentStreak: 35,
    longestStreak: 40,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student12@example.com',
    currentStreak: 18,
    longestStreak: 22,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student13@example.com',
    currentStreak: 7,
    longestStreak: 10,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student14@example.com',
    currentStreak: 14,
    longestStreak: 18,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student15@example.com',
    currentStreak: 21,
    longestStreak: 28,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  // Streaks with 1 day gap (might be broken soon)
  {
    studentEmail: 'student16@example.com',
    currentStreak: 10,
    longestStreak: 15,
    lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Yesterday
  },
  {
    studentEmail: 'student17@example.com',
    currentStreak: 6,
    longestStreak: 9,
    lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Yesterday
  },
  {
    studentEmail: 'student18@example.com',
    currentStreak: 25,
    longestStreak: 30,
    lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Yesterday
  },
  {
    studentEmail: 'student19@example.com',
    currentStreak: 9,
    longestStreak: 12,
    lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Yesterday
  },
  {
    studentEmail: 'student20@example.com',
    currentStreak: 16,
    longestStreak: 20,
    lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Yesterday
  },
  // Streaks with 2 days gap (broken streaks)
  {
    studentEmail: 'student21@example.com',
    currentStreak: 0,
    longestStreak: 8,
    lastActivityDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    studentEmail: 'student22@example.com',
    currentStreak: 0,
    longestStreak: 5,
    lastActivityDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    studentEmail: 'student23@example.com',
    currentStreak: 0,
    longestStreak: 12,
    lastActivityDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    studentEmail: 'student24@example.com',
    currentStreak: 0,
    longestStreak: 7,
    lastActivityDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
  },
  {
    studentEmail: 'student25@example.com',
    currentStreak: 0,
    longestStreak: 10,
    lastActivityDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  },
  // New streaks (just started)
  {
    studentEmail: 'student26@example.com',
    currentStreak: 1,
    longestStreak: 1,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student27@example.com',
    currentStreak: 2,
    longestStreak: 2,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student28@example.com',
    currentStreak: 1,
    longestStreak: 1,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student29@example.com',
    currentStreak: 4,
    longestStreak: 4,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student30@example.com',
    currentStreak: 2,
    longestStreak: 2,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  // Long streaks (dedicated students)
  {
    studentEmail: 'student31@example.com',
    currentStreak: 50,
    longestStreak: 55,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student32@example.com',
    currentStreak: 67,
    longestStreak: 70,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student33@example.com',
    currentStreak: 45,
    longestStreak: 48,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student34@example.com',
    currentStreak: 38,
    longestStreak: 42,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student35@example.com',
    currentStreak: 29,
    longestStreak: 35,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  // Medium streaks
  {
    studentEmail: 'student36@example.com',
    currentStreak: 11,
    longestStreak: 14,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student37@example.com',
    currentStreak: 13,
    longestStreak: 16,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student38@example.com',
    currentStreak: 20,
    longestStreak: 24,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student39@example.com',
    currentStreak: 17,
    longestStreak: 21,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  },
  {
    studentEmail: 'student40@example.com',
    currentStreak: 24,
    longestStreak: 28,
    lastActivityDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString() // Today
  }
]
