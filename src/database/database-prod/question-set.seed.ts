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
        passing_score: 7
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
        passing_score: 8
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
        passing_score: 9
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
    title: 'Bộ đề cho bài kiểm tra đầu vào lần 1',
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
  },
  {
    title: 'Bộ đề cho bài kiểm tra đầu vào lần 2',
    description: 'Bộ câu hỏi 10 câu phục vụ test tính năng trong development',
    questions: [],
    config: {
      general: {
        duration_minutes: 12,
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
        topics: ['cơ chế di truyền', 'đột biến', 'di truyền người']
      },
      proctoring: {
        enable_tab_tracking: true,
        enable_copy_paste_restriction: true
      }
    }
  },
  {
    title: 'Bộ đề testing dev - Ngẫu nhiên 2',
    description: 'Bộ câu hỏi 10 câu phục vụ test UI/UX làm bài',
    questions: [],
    config: {
      general: {
        duration_minutes: 15,
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
        topics: ['phiên mã', 'dịch mã', 'quy luật Mendel']
      },
      proctoring: {
        enable_tab_tracking: true,
        enable_copy_paste_restriction: true
      }
    }
  },
  {
    title: 'Bộ đề testing dev - Ngẫu nhiên 3',
    description: 'Bộ câu hỏi 10 câu kiểm thử logic chấm điểm và nộp bài',
    questions: [],
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
        topics: ['quần thể', 'quần xã', 'tiến hóa nhỏ']
      },
      proctoring: {
        enable_tab_tracking: true,
        enable_copy_paste_restriction: true
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 10 - Tế bào học',
    description: 'Bộ câu hỏi kiểm tra về cấu trúc tế bào, các bào quan và chức năng',
    lecturerEmail: 'lecturer4@example.com', // Cô Phạm Thị Tế Bào
    questions: [],
    config: {
      general: {
        duration_minutes: 45,
        total_questions: 15,
        allow_review: true,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 7
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['tế bào', 'bào quan', 'màng sinh học', 'vận chuyển']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 10 - Vi sinh vật học',
    description: 'Bộ câu hỏi về vi khuẩn, virus và vai trò của vi sinh vật',
    lecturerEmail: 'lecturer4@example.com',
    questions: [],
    config: {
      general: {
        duration_minutes: 40,
        total_questions: 12,
        allow_review: true,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 7
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['vi khuẩn', 'virus', 'vi sinh vật']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 10 - Phân bào',
    description: 'Bộ câu hỏi về nguyên phân, giảm phân và chu kỳ tế bào',
    lecturerEmail: 'lecturer4@example.com',
    questions: [],
    config: {
      general: {
        duration_minutes: 50,
        total_questions: 18,
        allow_review: true,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 8
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['nguyên phân', 'giảm phân', 'chu kỳ tế bào', 'ung thư']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Thi học sinh giỏi Sinh học 10 - Cấp trường',
    description: 'Bộ câu hỏi thi học sinh giỏi cấp trường về Sinh học lớp 10',
    lecturerEmail: 'lecturer4@example.com',
    questions: [],
    config: {
      general: {
        duration_minutes: 90,
        total_questions: 25,
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
        topics: ['tế bào học', 'vi sinh vật', 'phân bào', 'trao đổi chất']
      },
      proctoring: {
        enable_tab_tracking: true,
        enable_copy_paste_restriction: true
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 11 - Sinh lý thực vật',
    description: 'Bộ câu hỏi về quang hợp, hô hấp và vận chuyển ở thực vật',
    lecturerEmail: 'lecturer12@example.com', // Cô Mai Thị Thực Vật
    questions: [],
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
        passing_score: 7
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['quang hợp', 'hô hấp', 'vận chuyển', 'thực vật']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 11 - Cảm ứng ở thực vật',
    description: 'Bộ câu hỏi về hormone thực vật và các phản ứng với môi trường',
    lecturerEmail: 'lecturer12@example.com',
    questions: [],
    config: {
      general: {
        duration_minutes: 45,
        total_questions: 15,
        allow_review: true,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 7
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['hormone', 'cảm ứng', 'hướng động', 'ứng động']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 11 - Sinh lý động vật',
    description: 'Bộ câu hỏi về các hệ cơ quan và chức năng sinh lý ở động vật',
    lecturerEmail: 'lecturer11@example.com', // Thầy Lưu Văn Động Vật
    questions: [],
    config: {
      general: {
        duration_minutes: 70,
        total_questions: 22,
        allow_review: true,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 7
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['tuần hoàn', 'hô hấp', 'tiêu hóa', 'bài tiết', 'thần kinh', 'nội tiết']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Thi học sinh giỏi Sinh học 11 - Cấp thành phố',
    description: 'Bộ câu hỏi thi học sinh giỏi cấp thành phố về Sinh học lớp 11',
    lecturerEmail: 'lecturer6@example.com', // Cô Vũ Thị Sinh Lý
    questions: [],
    config: {
      general: {
        duration_minutes: 120,
        total_questions: 35,
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
        topics: ['sinh lý thực vật', 'sinh lý động vật', 'cảm ứng', 'sinh sản']
      },
      proctoring: {
        enable_tab_tracking: true,
        enable_copy_paste_restriction: true
      }
    }
  },
  {
    title: 'Thi học sinh giỏi Sinh học 12 - Cấp tỉnh',
    description: 'Bộ câu hỏi thi học sinh giỏi cấp tỉnh với độ khó cao',
    lecturerEmail: 'lecturer3@example.com', // Thầy Lê Văn Di Truyền
    questions: [],
    config: {
      general: {
        duration_minutes: 150,
        total_questions: 50,
        allow_review: false,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 9
      },
      behavior: {
        show_correct_after_submit: false,
        max_attempts: 1
      },
      composition: {
        question_sources: ['question'],
        topics: ['di truyền phân tử', 'đột biến', 'quy luật di truyền', 'tiến hóa', 'sinh thái']
      },
      proctoring: {
        enable_tab_tracking: true,
        enable_copy_paste_restriction: true
      }
    }
  },
  {
    title: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc gia',
    description: 'Bộ câu hỏi thi học sinh giỏi cấp quốc gia với độ khó rất cao',
    lecturerEmail: 'lecturer2@example.com', // Cô Trần Thị Sinh Học
    questions: [],
    config: {
      general: {
        duration_minutes: 180,
        total_questions: 60,
        allow_review: false,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 9
      },
      behavior: {
        show_correct_after_submit: false,
        max_attempts: 1
      },
      composition: {
        question_sources: ['question'],
        topics: ['di truyền học nâng cao', 'công nghệ gen', 'tiến hóa phân tử', 'sinh thái học', 'miễn dịch']
      },
      proctoring: {
        enable_tab_tracking: true,
        enable_copy_paste_restriction: true
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 12 - Di truyền học phân tử',
    description: 'Bộ câu hỏi chuyên sâu về ADN, ARN, phiên mã và dịch mã',
    lecturerEmail: 'lecturer8@example.com', // Cô Bùi Thị Phân Tử
    questions: [],
    config: {
      general: {
        duration_minutes: 75,
        total_questions: 25,
        allow_review: true,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 8
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['ADN', 'ARN', 'phiên mã', 'dịch mã', 'mã di truyền']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 12 - Đột biến và biến dị',
    description: 'Bộ câu hỏi về các loại đột biến gen và nhiễm sắc thể',
    lecturerEmail: 'lecturer3@example.com',
    questions: [],
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
        passing_score: 7
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['đột biến gen', 'đột biến nhiễm sắc thể', 'hậu quả đột biến']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 12 - Tiến hóa sinh học',
    description: 'Bộ câu hỏi về thuyết tiến hóa, bằng chứng và cơ chế tiến hóa',
    lecturerEmail: 'lecturer7@example.com', // Thầy Đặng Văn Tiến Hóa
    questions: [],
    config: {
      general: {
        duration_minutes: 65,
        total_questions: 22,
        allow_review: true,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 7
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['tiến hóa', 'chọn lọc tự nhiên', 'bằng chứng tiến hóa', 'tiến hóa phân tử']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 12 - Sinh thái học',
    description: 'Bộ câu hỏi về quần thể, quần xã và hệ sinh thái',
    lecturerEmail: 'lecturer5@example.com', // Thầy Hoàng Văn Sinh Thái
    questions: [],
    config: {
      general: {
        duration_minutes: 70,
        total_questions: 24,
        allow_review: true,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 7
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['quần thể', 'quần xã', 'hệ sinh thái', 'chu trình vật chất', 'dòng năng lượng']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 12 - Công nghệ gen',
    description: 'Bộ câu hỏi về kỹ thuật ADN tái tổ hợp, PCR và ứng dụng',
    lecturerEmail: 'lecturer8@example.com',
    questions: [],
    config: {
      general: {
        duration_minutes: 55,
        total_questions: 18,
        allow_review: true,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 8
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['ADN tái tổ hợp', 'PCR', 'nhân bản gen', 'ứng dụng công nghệ gen']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Kiểm tra Sinh học 12 - Sinh học miễn dịch',
    description: 'Bộ câu hỏi về hệ miễn dịch, kháng thể và vắc xin',
    lecturerEmail: 'lecturer2@example.com',
    questions: [],
    config: {
      general: {
        duration_minutes: 50,
        total_questions: 16,
        allow_review: true,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 7
      },
      behavior: {
        show_correct_after_submit: true,
        max_attempts: 2
      },
      composition: {
        question_sources: ['question'],
        topics: ['miễn dịch bẩm sinh', 'miễn dịch đáp ứng', 'kháng thể', 'vắc xin']
      },
      proctoring: {
        enable_tab_tracking: false,
        enable_copy_paste_restriction: false
      }
    }
  },
  {
    title: 'Thi học sinh giỏi Sinh học 12 - Cấp quốc tế',
    description: 'Bộ câu hỏi thi học sinh giỏi cấp quốc tế với độ khó cực cao',
    lecturerEmail: 'lecturer@example.com', // Thầy Nguyễn Văn Sinh
    questions: [],
    config: {
      general: {
        duration_minutes: 240,
        total_questions: 80,
        allow_review: false,
        shuffle_questions: true,
        shuffle_answers: true
      },
      scoring: {
        per_question: true,
        passing_score: 10
      },
      behavior: {
        show_correct_after_submit: false,
        max_attempts: 1
      },
      composition: {
        question_sources: ['question'],
        topics: ['tất cả chủ đề Sinh học 12 nâng cao', 'công nghệ sinh học', 'sinh học phân tử', 'sinh học tế bào']
      },
      proctoring: {
        enable_tab_tracking: true,
        enable_copy_paste_restriction: true
      }
    }
  }
]
