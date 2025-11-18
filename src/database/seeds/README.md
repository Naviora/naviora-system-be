# Database Seed Data

This directory contains comprehensive seed data for the Naviora system, specifically designed for **Biology (Sinh học) for excellent high school students (học sinh giỏi cấp 3)**.

## Overview

The seed data includes realistic, Vietnamese-language test data covering all major entities in the system. All content is:

- **Purely Vietnamese (thuần Việt)**: All names, addresses, descriptions are in Vietnamese
- **Biology-focused**: Only SINH10, SINH11, SINH12 classes for excellent student competitions
- **Realistic**: Data follows Vietnamese educational system context and business logic

## Quick Start

### Prerequisites

1. Database is running and accessible
2. Environment variables are configured (`.env` file)
3. Database migrations are up to date

### Running the Seeder

```bash
# Run the seed script
npm run seed

# Validate seed data after seeding
npm run seed:validate
```

## Seed Data Files

### Foundation Data

- **`role-seed-data.ts`**: Role definitions (Admin, Student, Lecturer, Principal)
- **`account-seed-data.ts`**: User accounts (50-60 users)
  - 30-40 Students with Vietnamese names
  - 10-15 Lecturers with Biology-themed names
  - 3-5 Principals
  - 1 Admin
- **`class.seed.ts`**: Biology classes (15-20 classes)
  - SINH10, SINH11, SINH12 only
  - Competition levels: SCHOOL, CITY, PROVINCE, NATIONAL, INTERNATIONAL
- **`module.seed.ts`**: Biology modules (20-30 modules)
  - Modules for all three grades
  - Topics: Tế bào học, Di truyền học, Sinh thái học, etc.
- **`lesson.seed.ts`**: Biology lessons (30-50 lessons)
  - Lessons covering all Biology topics
  - Appropriate for excellent high school students

### Question & Assessment Data

- **`question.seed.ts`**: Questions (80-120 questions)
  - Multiple choice questions
  - All in Vietnamese
  - Various difficulty levels (EASY, MEDIUM, HARD)
- **`question-set.seed.ts`**: Question sets (15-25 sets)
  - Question sets for different exams
  - Various configurations (duration, passing score, etc.)
- **`reviewed-exercise.seed.ts`**: Reviewed exercises (15-25 exercises)
  - Practice exercises for students
  - Various statuses (ACTIVE, COMPLETED, PUBLISHED, etc.)
- **`reviewed-exercise-submission.seed.ts`**: Exercise submissions (66 submissions)
  - Student submissions with scores
  - Various attempt statuses

### Entry Test & Final Exam Data

- **`entry-test.seed.ts`**: Entry tests (10 tests)
  - Pre-enrollment assessments
  - For different classes and competition levels
- **`entry-test-submission.seed.ts`**: Entry test submissions (55 submissions)
  - Student submissions with scores
- **`final-exam.seed.ts`**: Final exams (10 exams)
  - End-of-course assessments
- **`final-exam-submission.seed.ts`**: Final exam submissions (51 submissions)
  - Student submissions with scores

### Material & Teaching Data

- **`material.seed.ts`**: Materials (46 materials)
  - PDFs, videos, images for Biology content
  - All materials are Biology-related
- **`teaching-material.seed.ts`**: Teaching materials (61 records)
  - Links materials to lessons
  - Includes content descriptions
- **`teaching-module.seed.ts`**: Teaching module assignments (45 assignments)
  - Assigns lecturers to modules

### Relationship Data

- **`class-enrolment.seed.ts`**: Class enrollments (82 enrollments)
  - Students enrolled in classes
  - Realistic enrollment dates

### Activity & Progress Data

- **`streak.seed.ts`**: Student streaks (40 streaks)
  - Tracks consecutive days of activity
  - Various streak counts (active, broken, new)
- **`meeting-event.seed.ts`**: Meeting events (15 events)
  - Online/offline meetings for classes
  - Various time ranges
- **`lesson-progress.seed.ts`**: Lesson progress (81 records)
  - Student lesson completion tracking
  - Mix of completed and in-progress lessons

### Service

- **`database-seeder.service.ts`**: Main seeder service
  - Orchestrates all seed operations
  - Handles dependencies and relationships
  - Provides logging and error handling

## Entity Counts

| Entity             | Count  | Description                              |
| ------------------ | ------ | ---------------------------------------- |
| Users              | 50-60  | Students, lecturers, principals, admin   |
| Classes            | 15-20  | Biology classes (SINH10, SINH11, SINH12) |
| Modules            | 20-30  | Biology modules                          |
| Lessons            | 30-50  | Biology lessons                          |
| Questions          | 80-120 | Multiple choice questions                |
| Question Sets      | 15-25  | Exam question sets                       |
| Materials          | 40-50  | PDFs, videos, images                     |
| Teaching Materials | 50-70  | Material-lesson links                    |
| Entry Tests        | 8-12   | Pre-enrollment tests                     |
| Final Exams        | 8-12   | End-of-course exams                      |
| Reviewed Exercises | 15-25  | Practice exercises                       |
| Streaks            | 30-50  | Activity streaks                         |
| Meeting Events     | 10-20  | Class meetings                           |
| Lesson Progress    | 50-100 | Completion records                       |

## Data Relationships

### Class Hierarchy

```
Class
  └─> Module
      └─> Lesson
          └─> Question
              └─> Answer
```

### Assessment Flow

```
Question Set
  └─> Entry Test / Final Exam / Reviewed Exercise
      └─> Submission
          └─> Score
```

### Material Flow

```
Material
  └─> Teaching Material
      └─> Lesson
```

### User Relationships

```
User (Lecturer)
  └─> Teaching Module
      └─> Module

User (Student)
  └─> Class Enrolment
      └─> Class
  └─> Lesson Progress
      └─> Lesson
  └─> Streak
```

## Seed Order

The seeder respects the following dependency order:

1. **Roles** → Foundation for user roles
2. **Users** → Requires roles
3. **Classes** → Foundation for modules
4. **Modules** → Requires classes
5. **Lessons** → Requires modules
6. **Questions & Answers** → Requires lessons
7. **Question Sets** → Requires questions and lecturers
8. **Materials** → Requires lecturers
9. **Teaching Materials** → Requires materials and lessons
10. **Teaching Modules** → Requires modules and lecturers
11. **Class Enrolments** → Requires classes and students
12. **Entry Tests** → Requires question sets and lecturers
13. **Final Exams** → Requires question sets and lecturers
14. **Reviewed Exercises** → Requires lessons, question sets, and lecturers
15. **Submissions** → Requires students, exercises/exams, and question sets
16. **Streaks** → Requires students
17. **Meeting Events** → Requires classes and users
18. **Lesson Progress** → Requires students and lessons

## Data Characteristics

### Vietnamese Content

All data follows Vietnamese conventions:

- **Names**: Vietnamese names (e.g., "Nguyễn Thị Mai", "Trần Văn Đức")
- **Addresses**: Vietnamese format (e.g., "22 đường Nguyễn Gia Trí, phường 7, quận Bình Thạnh")
- **Descriptions**: All in Vietnamese
- **Content**: All educational content in Vietnamese

### Biology Content

All content is Biology-related:

- **Classes**: Only SINH10, SINH11, SINH12
- **Competition Levels**: SCHOOL, CITY, PROVINCE, NATIONAL, INTERNATIONAL
- **Topics**: Tế bào học, Di truyền học, Sinh thái học, Sinh lý thực vật, Sinh lý động vật, etc.
- **Difficulty**: Appropriate for excellent high school students

### Realistic Business Logic

- Students progress through competition levels (SCHOOL → CITY → PROVINCE → NATIONAL → INTERNATIONAL)
- Entry tests must be passed before enrollment
- Exercises and exams have realistic time windows
- Scores are within valid ranges (0-10)
- Dates follow logical progression

## Usage

### Running the Seeder

```bash
# Seed the database
npm run seed

# The seeder is idempotent - safe to run multiple times
# It checks for existing records before creating
```

### Validating Seed Data

```bash
# Validate seed data counts
npm run seed:validate

# This will check:
# - Record counts match expected ranges
# - All entities are created
# - No missing relationships
```

### Test Credentials

After seeding, you can use these accounts for testing:

**Admin:**

- Email: `admin@naviora.com`
- Password: `Admin@123`

**Lecturer:**

- Email: `lecturer@example.com` (Thầy Nguyễn Văn Sinh)
- Password: `Student@123`

**Student:**

- Email: `student1@example.com` (Nguyễn Thị Mai)
- Password: `Student@123`

## Customization

### Adding New Seed Data

1. Create a new seed file (e.g., `new-entity.seed.ts`)
2. Export seed data array
3. Import in `database-seeder.service.ts`
4. Add seed method in `DatabaseSeederService`
5. Call method in `seed()` method with correct order

### Modifying Existing Data

1. Edit the appropriate seed file
2. Ensure data follows Vietnamese and Biology constraints
3. Run `npm run seed` to apply changes
4. Run `npm run seed:validate` to verify

## Troubleshooting

### Common Issues

**Issue**: Foreign key constraint errors

- **Solution**: Ensure seed order respects dependencies (see Seed Order above)

**Issue**: Duplicate key errors

- **Solution**: Seed script is idempotent - it checks for existing records. If duplicates exist, they were created outside the seed script.

**Issue**: Missing relationships

- **Solution**: Check that referenced entities (by email, code, name) exist in their respective seed files

**Issue**: Validation shows fewer records

- **Solution**: Check seeder logs for warnings, verify database constraints, ensure all seed methods completed

## File Structure

```
src/database/seeds/
├── README.md                          # This file
├── database-seeder.service.ts         # Main seeder service
├── index.ts                           # Exports
├── role-seed-data.ts                  # Role definitions
├── account-seed-data.ts               # User accounts
├── class.seed.ts                      # Classes
├── module.seed.ts                     # Modules
├── lesson.seed.ts                     # Lessons
├── question.seed.ts                   # Questions
├── question-set.seed.ts               # Question sets
├── material.seed.ts                   # Materials
├── teaching-material.seed.ts          # Teaching materials
├── teaching-module.seed.ts            # Teaching module assignments
├── class-enrolment.seed.ts            # Class enrollments
├── entry-test.seed.ts                 # Entry tests
├── entry-test-submission.seed.ts      # Entry test submissions
├── final-exam.seed.ts                 # Final exams
├── final-exam-submission.seed.ts      # Final exam submissions
├── reviewed-exercise.seed.ts          # Reviewed exercises
├── reviewed-exercise-submission.seed.ts # Exercise submissions
├── streak.seed.ts                     # Student streaks
├── meeting-event.seed.ts              # Meeting events
└── lesson-progress.seed.ts            # Lesson progress
```

## Related Documentation

- [Seed Data Validation Guide](../../../docs/ai/testing/seed-data-validation.md)
- [API Endpoint Testing Guide](../../../docs/ai/testing/api-endpoint-testing.md)
- [Business Logic Verification Guide](../../../docs/ai/testing/business-logic-verification.md)

## Notes

- All seed data is designed for **testing and development** purposes
- Data follows Vietnamese educational system conventions
- Content is appropriate for **excellent high school students** level
- Seed script is **idempotent** - safe to run multiple times
- All content is **purely Vietnamese** and **Biology-focused**
