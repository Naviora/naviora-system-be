import { QuestionType, QuestionDifficulty } from '@common/enums/question.enum'

// Data seed for 20 questions of MULTI_CHOICE subject Sinh học 12 - Chapter Cơ chế di truyền và biến dị
export const questionSeedData = [
  {
    lessonId: 'lesson-sinh-hoc-12', // Will be replaced by actual lesson ID
    content: 'Trong quá trình nhân đôi ADN, enzim nào có vai trò tháo xoắn phân tử ADN?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'ADN polymerase', isCorrect: false, additionalImage: null },
      { content: 'Helicase', isCorrect: true, additionalImage: null },
      { content: 'Ligase', isCorrect: false, additionalImage: null },
      { content: 'Primase', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đột biến gen là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Sự thay đổi cấu trúc của nhiễm sắc thể', isCorrect: false, additionalImage: null },
      { content: 'Sự thay đổi cấu trúc của gen', isCorrect: true, additionalImage: null },
      { content: 'Sự thay đổi số lượng nhiễm sắc thể', isCorrect: false, additionalImage: null },
      { content: 'Sự thay đổi cấu trúc của protein', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Trong quá trình phiên mã, mạch nào của ADN được sử dụng làm khuôn?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: "Mạch mã gốc (mạch 3' - 5')", isCorrect: true, additionalImage: null },
      { content: "Mạch mã sao (mạch 5' - 3')", isCorrect: false, additionalImage: null },
      { content: 'Cả hai mạch', isCorrect: false, additionalImage: null },
      { content: "Mạch có chiều 5' - 3'", isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Nguyên tắc bán bảo toàn trong nhân đôi ADN có nghĩa là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Mỗi phân tử ADN con chứa một mạch cũ và một mạch mới', isCorrect: true, additionalImage: null },
      { content: 'ADN được nhân đôi hoàn toàn mới', isCorrect: false, additionalImage: null },
      { content: 'Chỉ một nửa ADN được nhân đôi', isCorrect: false, additionalImage: null },
      { content: 'ADN được bảo toàn hoàn toàn', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đột biến điểm là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Đột biến xảy ra ở một cặp nucleotide', isCorrect: true, additionalImage: null },
      { content: 'Đột biến xảy ra ở nhiều gen', isCorrect: false, additionalImage: null },
      { content: 'Đột biến xảy ra ở toàn bộ nhiễm sắc thể', isCorrect: false, additionalImage: null },
      { content: 'Đột biến xảy ra ở protein', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Trong quá trình dịch mã, codon nào là codon kết thúc?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'UAA, UAG, UGA', isCorrect: true, additionalImage: null },
      { content: 'AUG', isCorrect: false, additionalImage: null },
      { content: 'AAA, AAG', isCorrect: false, additionalImage: null },
      { content: 'UUU, UUC', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đột biến mất đoạn nhiễm sắc thể có đặc điểm gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Mất một đoạn nhiễm sắc thể', isCorrect: true, additionalImage: null },
      { content: 'Thêm một đoạn nhiễm sắc thể', isCorrect: false, additionalImage: null },
      { content: 'Đảo ngược một đoạn nhiễm sắc thể', isCorrect: false, additionalImage: null },
      { content: 'Chuyển đoạn giữa các nhiễm sắc thể', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Enzim nào có vai trò tổng hợp mạch ADN mới?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'ADN polymerase', isCorrect: true, additionalImage: null },
      { content: 'Helicase', isCorrect: false, additionalImage: null },
      { content: 'Ligase', isCorrect: false, additionalImage: null },
      { content: 'Primase', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đột biến gen có thể gây ra hậu quả gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Thay đổi trình tự axit amin trong protein', isCorrect: true, additionalImage: null },
      { content: 'Không ảnh hưởng gì', isCorrect: false, additionalImage: null },
      { content: 'Chỉ ảnh hưởng đến ADN', isCorrect: false, additionalImage: null },
      { content: 'Chỉ ảnh hưởng đến ARN', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Trong quá trình nhân đôi ADN, mạch nào được tổng hợp liên tục?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: "Mạch dẫn đầu (5' - 3')", isCorrect: true, additionalImage: null },
      { content: "Mạch chậm (3' - 5')", isCorrect: false, additionalImage: null },
      { content: 'Cả hai mạch', isCorrect: false, additionalImage: null },
      { content: 'Không có mạch nào', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đột biến thêm nucleotide gây ra hậu quả gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Dịch khung đọc mã di truyền', isCorrect: true, additionalImage: null },
      { content: 'Không ảnh hưởng gì', isCorrect: false, additionalImage: null },
      { content: 'Chỉ thay đổi một axit amin', isCorrect: false, additionalImage: null },
      { content: 'Làm mất hoàn toàn gen', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Enzim nào có vai trò nối các đoạn Okazaki?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Ligase', isCorrect: true, additionalImage: null },
      { content: 'ADN polymerase', isCorrect: false, additionalImage: null },
      { content: 'Helicase', isCorrect: false, additionalImage: null },
      { content: 'Primase', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đột biến thay thế nucleotide có thể gây ra hậu quả gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Thay đổi một axit amin hoặc không ảnh hưởng', isCorrect: true, additionalImage: null },
      { content: 'Luôn gây bệnh', isCorrect: false, additionalImage: null },
      { content: 'Không bao giờ ảnh hưởng', isCorrect: false, additionalImage: null },
      { content: 'Làm mất hoàn toàn protein', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Trong quá trình phiên mã, enzim nào tham gia?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'ARN polymerase', isCorrect: true, additionalImage: null },
      { content: 'ADN polymerase', isCorrect: false, additionalImage: null },
      { content: 'Helicase', isCorrect: false, additionalImage: null },
      { content: 'Ligase', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đột biến mất một cặp nucleotide gây ra hậu quả gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Dịch khung đọc từ điểm đột biến', isCorrect: true, additionalImage: null },
      { content: 'Không ảnh hưởng gì', isCorrect: false, additionalImage: null },
      { content: 'Chỉ thay đổi một axit amin', isCorrect: false, additionalImage: null },
      { content: 'Làm tăng chiều dài protein', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Trong quá trình dịch mã, codon AUG có vai trò gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Codon khởi đầu và mã hóa methionine', isCorrect: true, additionalImage: null },
      { content: 'Codon kết thúc', isCorrect: false, additionalImage: null },
      { content: 'Codon mã hóa lysine', isCorrect: false, additionalImage: null },
      { content: 'Codon không có chức năng', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đột biến gen lặn trên nhiễm sắc thể X có đặc điểm gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Nam dễ mắc bệnh hơn nữ', isCorrect: true, additionalImage: null },
      { content: 'Nữ dễ mắc bệnh hơn nam', isCorrect: false, additionalImage: null },
      { content: 'Nam và nữ có tỷ lệ mắc bệnh như nhau', isCorrect: false, additionalImage: null },
      { content: 'Chỉ nữ mới mắc bệnh', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Trong quá trình nhân đôi ADN, mạch chậm được tổng hợp như thế nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Tổng hợp từng đoạn ngắn (Okazaki) theo chiều ngược', isCorrect: true, additionalImage: null },
      { content: 'Tổng hợp liên tục theo chiều thuận', isCorrect: false, additionalImage: null },
      { content: 'Tổng hợp từ cả hai đầu', isCorrect: false, additionalImage: null },
      { content: 'Không được tổng hợp', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đột biến gen có thể được phân loại thành mấy loại chính?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: '3 loại: thay thế, thêm, mất', isCorrect: true, additionalImage: null },
      { content: '2 loại: thay thế và thêm', isCorrect: false, additionalImage: null },
      { content: '4 loại: thay thế, thêm, mất, đảo', isCorrect: false, additionalImage: null },
      { content: '5 loại: thay thế, thêm, mất, đảo, chuyển', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Trong quá trình dịch mã, tARN có vai trò gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Vận chuyển axit amin đến ribosome', isCorrect: true, additionalImage: null },
      { content: 'Tổng hợp protein', isCorrect: false, additionalImage: null },
      { content: 'Phiên mã gen', isCorrect: false, additionalImage: null },
      { content: 'Nhân đôi ADN', isCorrect: false, additionalImage: null }
    ]
  }
]
