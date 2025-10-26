// Data seed for question sets
export const questionSetSeedData = [
  {
    title: 'Kiểm tra Sinh học 12 - Cơ chế di truyền và biến dị',
    description: 'Bộ câu hỏi kiểm tra về cơ chế di truyền, nhân đôi ADN, phiên mã, dịch mã và các loại đột biến gen',
    questions: [], // Will be populated with actual question IDs from seeded questions
    config: {
      general: {
        duration_minutes: 60,
        total_questions: 20,
        allow_review: true,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 70
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 3
      },
      composition: {
        question_sources: ['question'],
        topics: ['di truyền', 'đột biến', 'ADN', 'ARN', 'protein']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Thi học sinh giỏi Sinh học 12 - Cấp trường',
    description: 'Bộ câu hỏi thi học sinh giỏi cấp trường về các chủ đề sinh học lớp 12',
    questions: [], // Will be populated with actual question IDs
    config: {
      general: {
        duration_minutes: 90,
        total_questions: 30,
        allow_review: false,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 80
      },
      behavior: {
        show_correct_after_submit: false,
        max_attempts: 1
      },
      composition: {
        question_sources: ['question'],
        topics: ['di truyền', 'tiến hóa', 'sinh thái', 'đột biến']
      },
      proctoring: {
        enable_tab_tracking: true,
        enable_copy_paste_restriction: true
      }
    }
  },
  {
    title: 'Thi học sinh giỏi Sinh học 12 - Cấp thành phố',
    description: 'Bộ câu hỏi thi học sinh giỏi cấp thành phố với độ khó cao hơn',
    questions: [], // Will be populated with actual question IDs
    config: {
      general: {
        duration_minutes: 120,
        total_questions: 40,
        allow_review: false,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 85
      },
      behavior: {
        show_correct_after_submit: false,
        max_attempts: 1
      },
      composition: {
        question_sources: ['question'],
        topics: ['di truyền phân tử', 'tiến hóa', 'sinh thái học', 'đột biến gen']
      },
      proctoring: {
        enable_tab_tracking: true,
        enable_copy_paste_restriction: true
      }
    }
  },
  {
    title: 'Bộ đề cho việc testing dev',
    description: 'Phục vụ cho việc testing in development',
    questions: [], // Will be populated with actual question IDs
    config: {
      general: {
        duration_minutes: 10,
        total_questions: 10,
        allow_review: false,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 8
      },
      behavior: {
        show_correct_after_submit: false,
        max_attempts: 1
      },
      composition: {
        question_sources: ['question'],
        topics: ['di truyền phân tử', 'tiến hóa', 'sinh thái học', 'đột biến gen']
      },
      proctoring: {
        enable_tab_tracking: true,
        enable_copy_paste_restriction: true
      }
    }
  }
]
