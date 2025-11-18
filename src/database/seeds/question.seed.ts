import { QuestionType, QuestionDifficulty } from '@common/enums/question.enum'

// Data seed for comprehensive biology questions covering multiple topics
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
  },
  // Additional questions based on the images - Transcription and Translation
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Nguyên tắc khuôn mẫu được thể hiện trong cơ chế nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Tự sao, tổng hợp ARN, dịch mã', isCorrect: true, additionalImage: null },
      { content: 'Tổng hợp ADN, dịch mã', isCorrect: false, additionalImage: null },
      { content: 'Tự sao, tổng hợp ARN', isCorrect: false, additionalImage: null },
      { content: 'Tổng hợp ADN, tổng hợp ARN', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Trong vi khuẩn E.coli, phiên mã diễn ra ở đâu?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Tế bào chất', isCorrect: true, additionalImage: null },
      { content: 'Ribosome', isCorrect: false, additionalImage: null },
      { content: 'Nhân tế bào', isCorrect: false, additionalImage: null },
      { content: 'Ty thể', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Phân tử nào làm khuôn cho quá trình phiên mã?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Mạch khuôn', isCorrect: true, additionalImage: null },
      { content: 'Mạch mã gốc', isCorrect: false, additionalImage: null },
      { content: 'mARN', isCorrect: false, additionalImage: null },
      { content: 'tARN', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đơn vị giải mã thông tin di truyền trong chuỗi pôlipeptit là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Codon', isCorrect: true, additionalImage: null },
      { content: 'Anticodon', isCorrect: false, additionalImage: null },
      { content: 'Axit amin', isCorrect: false, additionalImage: null },
      { content: 'Bộ ba', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đặc điểm cấu trúc của mARN là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Mạch đơn, thẳng, chứa A, U, G, X', isCorrect: true, additionalImage: null },
      { content: 'Mạch kép, tròn, chứa A, T, G, X', isCorrect: false, additionalImage: null },
      { content: 'Mạch kép, chứa A, T, G, X', isCorrect: false, additionalImage: null },
      { content: 'Mạch đơn, chứa A, U, G, X', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Phiên mã xảy ra ở những sinh vật nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Sinh vật có ADN mạch kép', isCorrect: true, additionalImage: null },
      { content: 'Eukaryote, vi khuẩn', isCorrect: false, additionalImage: null },
      { content: 'Eukaryote, virus', isCorrect: false, additionalImage: null },
      { content: 'Virus, vi khuẩn', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Chức năng của polyribosome trong quá trình dịch mã là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Tăng hiệu suất tổng hợp protein', isCorrect: true, additionalImage: null },
      { content: 'Điều hòa tổng hợp protein', isCorrect: false, additionalImage: null },
      { content: 'Tổng hợp protein cùng loại', isCorrect: false, additionalImage: null },
      { content: 'Tổng hợp nhiều loại protein', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Anticodon đặc hiệu trên phân tử tARN được gọi là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Anticodon', isCorrect: true, additionalImage: null },
      { content: 'Codon', isCorrect: false, additionalImage: null },
      { content: 'Axit amin', isCorrect: false, additionalImage: null },
      { content: 'Bộ ba', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'ARN được tổng hợp từ mạch nào của gen?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Từ mạch khuôn', isCorrect: true, additionalImage: null },
      { content: "Từ mạch 5' → 3'", isCorrect: false, additionalImage: null },
      { content: 'Từ cả hai mạch đơn', isCorrect: false, additionalImage: null },
      { content: 'Đôi khi từ mạch 1, đôi khi từ mạch 2', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Loại axit nucleic nào là thành phần cấu trúc của ribosome?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'rARN', isCorrect: true, additionalImage: null },
      { content: 'mARN', isCorrect: false, additionalImage: null },
      { content: 'tARN', isCorrect: false, additionalImage: null },
      { content: 'ADN', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Chuỗi pôlipeptit được tổng hợp trong tế bào eukaryote bắt đầu bằng axit amin nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Tất cả bắt đầu bằng axit amin Met', isCorrect: true, additionalImage: null },
      { content: 'Tất cả kết thúc bằng Met', isCorrect: false, additionalImage: null },
      { content: 'Tất cả bắt đầu bằng formyl-Met', isCorrect: false, additionalImage: null },
      { content: 'Tất cả bắt đầu bằng phức hợp aa-tARN', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Phân tử nào chịu trách nhiệm giải mã thông tin di truyền trên khuôn mARN thành trình tự axit amin?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'tARN', isCorrect: true, additionalImage: null },
      { content: 'rARN', isCorrect: false, additionalImage: null },
      { content: 'mARN', isCorrect: false, additionalImage: null },
      { content: 'ARN', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Phân tử nào làm khuôn cho quá trình dịch mã?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'mARN', isCorrect: true, additionalImage: null },
      { content: 'Mạch mã gốc', isCorrect: false, additionalImage: null },
      { content: 'tARN', isCorrect: false, additionalImage: null },
      { content: 'Mạch khuôn', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Phiên mã là quá trình tổng hợp phân tử nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'ARN', isCorrect: true, additionalImage: null },
      { content: 'ADN và ARN', isCorrect: false, additionalImage: null },
      { content: 'Protein', isCorrect: false, additionalImage: null },
      { content: 'ADN', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Vùng nào ARN polymerase tương tác để tháo xoắn gen trong quá trình phiên mã?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Vùng khởi động', isCorrect: true, additionalImage: null },
      { content: 'Vùng mã hóa', isCorrect: false, additionalImage: null },
      { content: 'Vùng kết thúc', isCorrect: false, additionalImage: null },
      { content: 'Vùng điều hòa', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Trong quá trình phiên mã, chuỗi poliribônuclêôtit được tổng hợp theo chiều nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: "5' → 3'", isCorrect: true, additionalImage: null },
      { content: "3' → 3'", isCorrect: false, additionalImage: null },
      { content: "3' → 5'", isCorrect: false, additionalImage: null },
      { content: "5' → 5'", isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Giai đoạn hoạt hóa axit amin của quá trình dịch mã diễn ra ở đâu?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Tế bào chất', isCorrect: true, additionalImage: null },
      { content: 'Nhân con', isCorrect: false, additionalImage: null },
      { content: 'Nhân', isCorrect: false, additionalImage: null },
      { content: 'Màng nhân', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Sản phẩm của giai đoạn hoạt hóa axit amin là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Phức hợp aa-tARN', isCorrect: true, additionalImage: null },
      { content: 'Axit amin hoạt hóa', isCorrect: false, additionalImage: null },
      { content: 'Axit amin tự do', isCorrect: false, additionalImage: null },
      { content: 'Chuỗi pôlipeptit', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Giai đoạn hoạt hóa axit amin của quá trình dịch mã nhờ năng lượng từ sự phân giải chất nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'ATP', isCorrect: true, additionalImage: null },
      { content: 'Lipit', isCorrect: false, additionalImage: null },
      { content: 'ADP', isCorrect: false, additionalImage: null },
      { content: 'Glucôzơ', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Thông tin di truyền trong ADN được biểu hiện thành tính trạng nhờ cơ chế nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Phiên mã và dịch mã', isCorrect: true, additionalImage: null },
      { content: 'Nhân đôi ADN và phiên mã', isCorrect: false, additionalImage: null },
      { content: 'Nhân đôi ADN và dịch mã', isCorrect: false, additionalImage: null },
      { content: 'Nhân đôi ADN, phiên mã và dịch mã', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Cặp bazơ nitơ nào sau đây không có liên kết hidrô bổ sung?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'U và T', isCorrect: true, additionalImage: null },
      { content: 'T và A', isCorrect: false, additionalImage: null },
      { content: 'A và U', isCorrect: false, additionalImage: null },
      { content: 'G và X', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Nhận định nào sau đây là đúng về phân tử ARN?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'tARN có chức năng vận chuyển axit amin tới ribôxôm', isCorrect: true, additionalImage: null },
      { content: 'Tất cả các loại ARN đều có cấu tạo mạch thẳng', isCorrect: false, additionalImage: null },
      { content: 'mARN được sao y khuôn từ mạch gốc của ADN', isCorrect: false, additionalImage: null },
      { content: 'Trên các tARN có các anticodon giống nhau', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Dịch mã là quá trình tổng hợp nên phân tử gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Prôtêin', isCorrect: true, additionalImage: null },
      { content: 'mARN', isCorrect: false, additionalImage: null },
      { content: 'ADN', isCorrect: false, additionalImage: null },
      { content: 'mARN và prôtêin', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Enzim chính tham gia vào quá trình phiên mã là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'ARN-polimeraza', isCorrect: true, additionalImage: null },
      { content: 'ADN-polimeraza', isCorrect: false, additionalImage: null },
      { content: 'Restrictaza', isCorrect: false, additionalImage: null },
      { content: 'ADN-ligaza', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Trong quá trình dịch mã, liên kết peptit đầu tiên được hình thành giữa những gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Axit amin mở đầu với axit amin thứ nhất', isCorrect: true, additionalImage: null },
      { content: 'Hai axit amin kế nhau', isCorrect: false, additionalImage: null },
      { content: 'Axit amin thứ nhất với axit amin thứ hai', isCorrect: false, additionalImage: null },
      { content: 'Hai axit amin cùng loại hay khác loại', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonId: 'lesson-sinh-hoc-12',
    content: 'Đơn vị mã hóa cho thông tin di truyền trên mARN được gọi là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Codon', isCorrect: true, additionalImage: null },
      { content: 'Anticodon', isCorrect: false, additionalImage: null },
      { content: 'Bộ ba', isCorrect: false, additionalImage: null },
      { content: 'Axit amin', isCorrect: false, additionalImage: null }
    ]
  },
  // SINH10 - Tế bào học questions
  {
    lessonName: 'Cấu trúc tế bào nhân sơ và nhân thực',
    content: 'Đặc điểm nào sau đây chỉ có ở tế bào nhân thực?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Có màng nhân và các bào quan có màng', isCorrect: true, additionalImage: null },
      { content: 'Có ribosome', isCorrect: false, additionalImage: null },
      { content: 'Có ADN', isCorrect: false, additionalImage: null },
      { content: 'Có màng tế bào', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Cấu trúc tế bào nhân sơ và nhân thực',
    content: 'Bào quan nào có chức năng tổng hợp protein?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Ribosome', isCorrect: true, additionalImage: null },
      { content: 'Ty thể', isCorrect: false, additionalImage: null },
      { content: 'Lục lạp', isCorrect: false, additionalImage: null },
      { content: 'Lưới nội chất', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Cấu trúc tế bào nhân sơ và nhân thực',
    content: 'Bào quan nào có chức năng sản xuất năng lượng ATP?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Ty thể', isCorrect: true, additionalImage: null },
      { content: 'Lục lạp', isCorrect: false, additionalImage: null },
      { content: 'Ribosome', isCorrect: false, additionalImage: null },
      { content: 'Bộ máy Golgi', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Màng sinh học và vận chuyển',
    content: 'Vận chuyển chủ động qua màng tế bào có đặc điểm gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Cần năng lượng ATP và protein vận chuyển', isCorrect: true, additionalImage: null },
      { content: 'Không cần năng lượng, theo gradient nồng độ', isCorrect: false, additionalImage: null },
      { content: 'Chỉ xảy ra với các phân tử nhỏ', isCorrect: false, additionalImage: null },
      { content: 'Luôn đi từ nơi có nồng độ cao đến thấp', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Màng sinh học và vận chuyển',
    content: 'Khuếch tán đơn giản là quá trình vận chuyển như thế nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Vận chuyển thụ động, không cần năng lượng', isCorrect: true, additionalImage: null },
      { content: 'Vận chuyển chủ động, cần ATP', isCorrect: false, additionalImage: null },
      { content: 'Vận chuyển qua kênh protein', isCorrect: false, additionalImage: null },
      { content: 'Vận chuyển ngược gradient nồng độ', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Các bào quan trong tế bào',
    content: 'Bào quan nào có chức năng tổng hợp và vận chuyển protein?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Lưới nội chất hạt', isCorrect: true, additionalImage: null },
      { content: 'Lưới nội chất trơn', isCorrect: false, additionalImage: null },
      { content: 'Bộ máy Golgi', isCorrect: false, additionalImage: null },
      { content: 'Ribosome tự do', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Các bào quan trong tế bào',
    content: 'Bộ máy Golgi có chức năng chính là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Chế biến, đóng gói và phân phối protein', isCorrect: true, additionalImage: null },
      { content: 'Tổng hợp protein', isCorrect: false, additionalImage: null },
      { content: 'Sản xuất ATP', isCorrect: false, additionalImage: null },
      { content: 'Quang hợp', isCorrect: false, additionalImage: null }
    ]
  },
  // SINH10 - Vi sinh vật học
  {
    lessonName: 'Vi khuẩn và cấu trúc',
    content: 'Thành phần nào của vi khuẩn giúp bảo vệ tế bào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Thành tế bào', isCorrect: true, additionalImage: null },
      { content: 'Màng tế bào', isCorrect: false, additionalImage: null },
      { content: 'Ribosome', isCorrect: false, additionalImage: null },
      { content: 'ADN', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Virus và cơ chế xâm nhập',
    content: 'Virus có đặc điểm nào sau đây?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Không có cấu trúc tế bào, chỉ có ADN/ARN và protein', isCorrect: true, additionalImage: null },
      { content: 'Có cấu trúc tế bào hoàn chỉnh', isCorrect: false, additionalImage: null },
      { content: 'Có thể tự sinh sản độc lập', isCorrect: false, additionalImage: null },
      { content: 'Có ribosome riêng', isCorrect: false, additionalImage: null }
    ]
  },
  // SINH10 - Phân bào
  {
    lessonName: 'Nguyên phân và chu kỳ tế bào',
    content: 'Giai đoạn nào của nguyên phân có nhiễm sắc thể co xoắn tối đa?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Kỳ giữa', isCorrect: true, additionalImage: null },
      { content: 'Kỳ đầu', isCorrect: false, additionalImage: null },
      { content: 'Kỳ sau', isCorrect: false, additionalImage: null },
      { content: 'Kỳ cuối', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Giảm phân và hình thành giao tử',
    content: 'Giảm phân tạo ra các tế bào con có số lượng nhiễm sắc thể như thế nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Bằng một nửa tế bào mẹ (n)', isCorrect: true, additionalImage: null },
      { content: 'Bằng tế bào mẹ (2n)', isCorrect: false, additionalImage: null },
      { content: 'Gấp đôi tế bào mẹ (4n)', isCorrect: false, additionalImage: null },
      { content: 'Không xác định', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Điều hòa phân bào và ung thư',
    content: 'Ung thư xảy ra do nguyên nhân chính nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Đột biến gen điều hòa chu kỳ tế bào', isCorrect: true, additionalImage: null },
      { content: 'Tế bào phân chia quá chậm', isCorrect: false, additionalImage: null },
      { content: 'Thiếu chất dinh dưỡng', isCorrect: false, additionalImage: null },
      { content: 'Tế bào già đi nhanh', isCorrect: false, additionalImage: null }
    ]
  },
  // SINH10 - Trao đổi chất
  {
    lessonName: 'Enzyme và cơ chế xúc tác',
    content: 'Enzyme hoạt động tối ưu ở điều kiện nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Nhiệt độ và pH phù hợp', isCorrect: true, additionalImage: null },
      { content: 'Nhiệt độ cao và pH thấp', isCorrect: false, additionalImage: null },
      { content: 'Nhiệt độ thấp và pH cao', isCorrect: false, additionalImage: null },
      { content: 'Bất kỳ điều kiện nào', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Hô hấp tế bào',
    content: 'Sản phẩm cuối cùng của hô hấp hiếu khí là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'CO2, H2O và ATP', isCorrect: true, additionalImage: null },
      { content: 'Chỉ CO2 và H2O', isCorrect: false, additionalImage: null },
      { content: 'Chỉ ATP', isCorrect: false, additionalImage: null },
      { content: 'Lactic acid', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Quang hợp ở thực vật',
    content: 'Sản phẩm của pha sáng quang hợp là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'ATP, NADPH và O2', isCorrect: true, additionalImage: null },
      { content: 'Glucose và O2', isCorrect: false, additionalImage: null },
      { content: 'Chỉ ATP', isCorrect: false, additionalImage: null },
      { content: 'CO2 và H2O', isCorrect: false, additionalImage: null }
    ]
  },
  // SINH11 - Sinh lý thực vật
  {
    lessonName: 'Quang hợp - Pha sáng',
    content: 'Quang hợp pha sáng xảy ra ở đâu trong lục lạp?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Màng thylakoid', isCorrect: true, additionalImage: null },
      { content: 'Stroma', isCorrect: false, additionalImage: null },
      { content: 'Màng ngoài lục lạp', isCorrect: false, additionalImage: null },
      { content: 'Chất nền', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Quang hợp - Pha tối',
    content: 'Chu trình Calvin xảy ra ở đâu trong lục lạp?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Stroma', isCorrect: true, additionalImage: null },
      { content: 'Màng thylakoid', isCorrect: false, additionalImage: null },
      { content: 'Granum', isCorrect: false, additionalImage: null },
      { content: 'Màng trong lục lạp', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Vận chuyển nước và khoáng',
    content: 'Lực nào giúp vận chuyển nước từ rễ lên lá?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Lực đẩy rễ, lực mao dẫn và lực hút do thoát hơi nước', isCorrect: true, additionalImage: null },
      { content: 'Chỉ lực đẩy rễ', isCorrect: false, additionalImage: null },
      { content: 'Chỉ lực hút do thoát hơi nước', isCorrect: false, additionalImage: null },
      { content: 'Lực trọng trường', isCorrect: false, additionalImage: null }
    ]
  },
  // SINH11 - Sinh lý động vật
  {
    lessonName: 'Hệ tuần hoàn máu',
    content: 'Tim có bao nhiêu ngăn ở động vật có vú?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: '4 ngăn: 2 tâm nhĩ và 2 tâm thất', isCorrect: true, additionalImage: null },
      { content: '2 ngăn: 1 tâm nhĩ và 1 tâm thất', isCorrect: false, additionalImage: null },
      { content: '3 ngăn: 2 tâm nhĩ và 1 tâm thất', isCorrect: false, additionalImage: null },
      { content: '5 ngăn', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Hệ hô hấp và trao đổi khí',
    content: 'Quá trình trao đổi khí ở phổi diễn ra theo cơ chế nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Khuếch tán theo gradient nồng độ', isCorrect: true, additionalImage: null },
      { content: 'Vận chuyển chủ động', isCorrect: false, additionalImage: null },
      { content: 'Thẩm thấu', isCorrect: false, additionalImage: null },
      { content: 'Thực bào', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Hệ tiêu hóa và hấp thu',
    content: 'Enzyme nào phân giải protein trong dạ dày?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Pepsin', isCorrect: true, additionalImage: null },
      { content: 'Amylase', isCorrect: false, additionalImage: null },
      { content: 'Lipase', isCorrect: false, additionalImage: null },
      { content: 'Trypsin', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Hệ thần kinh',
    content: 'Xung thần kinh được truyền qua synapse nhờ chất gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Chất dẫn truyền thần kinh (neurotransmitter)', isCorrect: true, additionalImage: null },
      { content: 'ADN', isCorrect: false, additionalImage: null },
      { content: 'Protein', isCorrect: false, additionalImage: null },
      { content: 'Lipid', isCorrect: false, additionalImage: null }
    ]
  },
  // SINH12 - Tiến hóa
  {
    lessonName: 'Thuyết tiến hóa Darwin',
    content: 'Chọn lọc tự nhiên dựa trên nguyên tắc nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      {
        content: 'Cá thể có biến dị thích nghi sẽ sống sót và sinh sản tốt hơn',
        isCorrect: true,
        additionalImage: null
      },
      { content: 'Tất cả cá thể đều sống sót như nhau', isCorrect: false, additionalImage: null },
      { content: 'Chỉ cá thể mạnh nhất mới sống sót', isCorrect: false, additionalImage: null },
      { content: 'Môi trường không ảnh hưởng đến sinh vật', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Bằng chứng tiến hóa',
    content: 'Bằng chứng nào sau đây chứng minh tiến hóa?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Cơ quan tương đồng, phôi sinh học và bằng chứng phân tử', isCorrect: true, additionalImage: null },
      { content: 'Chỉ cơ quan tương đồng', isCorrect: false, additionalImage: null },
      { content: 'Chỉ bằng chứng hóa thạch', isCorrect: false, additionalImage: null },
      { content: 'Không có bằng chứng', isCorrect: false, additionalImage: null }
    ]
  },
  // SINH12 - Sinh thái học
  {
    lessonName: 'Đặc trưng quần thể sinh vật',
    content: 'Mật độ quần thể được tính như thế nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Số lượng cá thể trên một đơn vị diện tích hoặc thể tích', isCorrect: true, additionalImage: null },
      { content: 'Tổng số cá thể trong quần thể', isCorrect: false, additionalImage: null },
      { content: 'Tỷ lệ sinh và tử', isCorrect: false, additionalImage: null },
      { content: 'Kích thước quần thể', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Cấu trúc quần xã sinh vật',
    content: 'Loài nào đóng vai trò quan trọng nhất trong quần xã?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Loài ưu thế và loài chủ chốt', isCorrect: true, additionalImage: null },
      { content: 'Chỉ loài ưu thế', isCorrect: false, additionalImage: null },
      { content: 'Tất cả loài đều quan trọng như nhau', isCorrect: false, additionalImage: null },
      { content: 'Chỉ loài săn mồi', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Chuỗi và lưới thức ăn',
    content: 'Sinh vật sản xuất trong chuỗi thức ăn là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Thực vật và các sinh vật quang hợp', isCorrect: true, additionalImage: null },
      { content: 'Động vật ăn thịt', isCorrect: false, additionalImage: null },
      { content: 'Động vật ăn cỏ', isCorrect: false, additionalImage: null },
      { content: 'Vi sinh vật phân hủy', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Dòng năng lượng trong hệ sinh thái',
    content: 'Hiệu suất sinh thái giữa các bậc dinh dưỡng thường là bao nhiêu?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Khoảng 10%', isCorrect: true, additionalImage: null },
      { content: 'Khoảng 50%', isCorrect: false, additionalImage: null },
      { content: 'Khoảng 90%', isCorrect: false, additionalImage: null },
      { content: '100%', isCorrect: false, additionalImage: null }
    ]
  },
  // SINH12 - Đa dạng sinh học
  {
    lessonName: 'Đa dạng sinh học',
    content: 'Đa dạng sinh học bao gồm những mức độ nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Đa dạng gen, loài và hệ sinh thái', isCorrect: true, additionalImage: null },
      { content: 'Chỉ đa dạng loài', isCorrect: false, additionalImage: null },
      { content: 'Chỉ đa dạng gen', isCorrect: false, additionalImage: null },
      { content: 'Chỉ đa dạng hệ sinh thái', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Bảo tồn đa dạng sinh học',
    content: 'Biện pháp bảo tồn nào hiệu quả nhất?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Bảo tồn tại chỗ và bảo tồn chuyển chỗ', isCorrect: true, additionalImage: null },
      { content: 'Chỉ bảo tồn tại chỗ', isCorrect: false, additionalImage: null },
      { content: 'Chỉ bảo tồn chuyển chỗ', isCorrect: false, additionalImage: null },
      { content: 'Không cần bảo tồn', isCorrect: false, additionalImage: null }
    ]
  },
  // SINH12 - Công nghệ gen
  {
    lessonName: 'Kỹ thuật ADN tái tổ hợp',
    content: 'Enzyme nào được sử dụng để cắt ADN trong kỹ thuật tái tổ hợp?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Restriction enzyme', isCorrect: true, additionalImage: null },
      { content: 'ADN polymerase', isCorrect: false, additionalImage: null },
      { content: 'Ligase', isCorrect: false, additionalImage: null },
      { content: 'Helicase', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Nhân bản gen và PCR',
    content: 'PCR là viết tắt của gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Polymerase Chain Reaction', isCorrect: true, additionalImage: null },
      { content: 'Protein Chain Reaction', isCorrect: false, additionalImage: null },
      { content: 'Polypeptide Chain Reaction', isCorrect: false, additionalImage: null },
      { content: 'Polymer Chain Reaction', isCorrect: false, additionalImage: null }
    ]
  },
  // SINH12 - Sinh học miễn dịch
  {
    lessonName: 'Hệ miễn dịch bẩm sinh',
    content: 'Hàng rào vật lý đầu tiên của hệ miễn dịch là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Da và niêm mạc', isCorrect: true, additionalImage: null },
      { content: 'Tế bào bạch cầu', isCorrect: false, additionalImage: null },
      { content: 'Kháng thể', isCorrect: false, additionalImage: null },
      { content: 'Tế bào T', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Hệ miễn dịch đáp ứng',
    content: 'Kháng thể được sản xuất bởi loại tế bào nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Tế bào B', isCorrect: true, additionalImage: null },
      { content: 'Tế bào T', isCorrect: false, additionalImage: null },
      { content: 'Đại thực bào', isCorrect: false, additionalImage: null },
      { content: 'Tế bào NK', isCorrect: false, additionalImage: null }
    ]
  },
  // Thêm questions cho các lessons còn lại
  {
    lessonName: 'Quy luật di truyền Mendel',
    content: 'Theo quy luật phân ly độc lập, khi lai hai cặp tính trạng, tỷ lệ kiểu hình ở F2 là bao nhiêu?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: '9:3:3:1', isCorrect: true, additionalImage: null },
      { content: '3:1', isCorrect: false, additionalImage: null },
      { content: '1:1:1:1', isCorrect: false, additionalImage: null },
      { content: '1:2:1', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Di truyền liên kết và hoán vị gen',
    content: 'Hoán vị gen xảy ra ở giai đoạn nào của giảm phân?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Kỳ đầu của giảm phân I', isCorrect: true, additionalImage: null },
      { content: 'Kỳ giữa của giảm phân I', isCorrect: false, additionalImage: null },
      { content: 'Kỳ đầu của giảm phân II', isCorrect: false, additionalImage: null },
      { content: 'Kỳ sau của giảm phân I', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Di truyền ngoài nhân',
    content: 'Di truyền ngoài nhân có đặc điểm gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Di truyền theo dòng mẹ, không tuân theo quy luật Mendel', isCorrect: true, additionalImage: null },
      { content: 'Di truyền theo dòng bố', isCorrect: false, additionalImage: null },
      { content: 'Tuân theo quy luật Mendel', isCorrect: false, additionalImage: null },
      { content: 'Chỉ xảy ra ở động vật', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Các yếu tố tiến hóa quần thể',
    content: 'Yếu tố nào sau đây làm thay đổi tần số alen trong quần thể?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      {
        content: 'Đột biến, di nhập gen, chọn lọc tự nhiên, phiêu bạt di truyền',
        isCorrect: true,
        additionalImage: null
      },
      { content: 'Chỉ đột biến', isCorrect: false, additionalImage: null },
      { content: 'Chỉ chọn lọc tự nhiên', isCorrect: false, additionalImage: null },
      { content: 'Không có yếu tố nào', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Cơ chế tiến hóa',
    content: 'Phiêu bạt di truyền có ảnh hưởng lớn nhất đến quần thể nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Quần thể nhỏ', isCorrect: true, additionalImage: null },
      { content: 'Quần thể lớn', isCorrect: false, additionalImage: null },
      { content: 'Quần thể ổn định', isCorrect: false, additionalImage: null },
      { content: 'Quần thể đang tăng trưởng', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Tiến hóa phân tử',
    content: 'Đồng hồ phân tử dựa trên nguyên tắc nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Tốc độ đột biến ổn định theo thời gian', isCorrect: true, additionalImage: null },
      { content: 'Tốc độ đột biến thay đổi liên tục', isCorrect: false, additionalImage: null },
      { content: 'Không có đột biến', isCorrect: false, additionalImage: null },
      { content: 'Đột biến chỉ xảy ra ở một số gen', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Biến động số lượng quần thể',
    content: 'Quần thể có thể điều hòa số lượng bằng cách nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Điều hòa sinh sản, tử vong, di cư', isCorrect: true, additionalImage: null },
      { content: 'Chỉ điều hòa sinh sản', isCorrect: false, additionalImage: null },
      { content: 'Chỉ điều hòa tử vong', isCorrect: false, additionalImage: null },
      { content: 'Không thể điều hòa', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Mối quan hệ giữa các loài',
    content: 'Quan hệ cộng sinh có đặc điểm gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Cả hai loài đều có lợi', isCorrect: true, additionalImage: null },
      { content: 'Một loài có lợi, một loài bị hại', isCorrect: false, additionalImage: null },
      { content: 'Một loài có lợi, một loài không ảnh hưởng', isCorrect: false, additionalImage: null },
      { content: 'Cả hai loài đều bị hại', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Diễn thế sinh thái',
    content: 'Diễn thế nguyên sinh bắt đầu từ đâu?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Từ môi trường chưa có sinh vật', isCorrect: true, additionalImage: null },
      { content: 'Từ quần xã đã có sẵn', isCorrect: false, additionalImage: null },
      { content: 'Từ đất đã có sẵn', isCorrect: false, additionalImage: null },
      { content: 'Từ nước', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Chu trình vật chất',
    content: 'Chu trình carbon bao gồm những quá trình nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Quang hợp, hô hấp, phân hủy', isCorrect: true, additionalImage: null },
      { content: 'Chỉ quang hợp', isCorrect: false, additionalImage: null },
      { content: 'Chỉ hô hấp', isCorrect: false, additionalImage: null },
      { content: 'Chỉ phân hủy', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Các hệ sinh thái chính',
    content: 'Hệ sinh thái nào có độ đa dạng sinh học cao nhất?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Rừng mưa nhiệt đới', isCorrect: true, additionalImage: null },
      { content: 'Sa mạc', isCorrect: false, additionalImage: null },
      { content: 'Bắc cực', isCorrect: false, additionalImage: null },
      { content: 'Đồng cỏ', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Các mối đe dọa đa dạng sinh học',
    content: 'Nguyên nhân chính gây mất đa dạng sinh học là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      {
        content: 'Mất môi trường sống, ô nhiễm, biến đổi khí hậu, khai thác quá mức',
        isCorrect: true,
        additionalImage: null
      },
      { content: 'Chỉ mất môi trường sống', isCorrect: false, additionalImage: null },
      { content: 'Chỉ ô nhiễm', isCorrect: false, additionalImage: null },
      { content: 'Chỉ biến đổi khí hậu', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Ứng dụng công nghệ gen',
    content: 'Công nghệ gen được ứng dụng trong lĩnh vực nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Y học, nông nghiệp, công nghiệp, môi trường', isCorrect: true, additionalImage: null },
      { content: 'Chỉ y học', isCorrect: false, additionalImage: null },
      { content: 'Chỉ nông nghiệp', isCorrect: false, additionalImage: null },
      { content: 'Chỉ công nghiệp', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Vắc xin và liệu pháp miễn dịch',
    content: 'Vắc xin hoạt động theo cơ chế nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Kích thích hệ miễn dịch tạo kháng thể và tế bào nhớ', isCorrect: true, additionalImage: null },
      { content: 'Tiêu diệt trực tiếp mầm bệnh', isCorrect: false, additionalImage: null },
      { content: 'Ngăn chặn hoàn toàn mầm bệnh', isCorrect: false, additionalImage: null },
      { content: 'Chỉ tạo kháng thể tạm thời', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Hô hấp ở thực vật',
    content: 'Hô hấp ở thực vật tạo ra sản phẩm gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'CO2, H2O và ATP', isCorrect: true, additionalImage: null },
      { content: 'Chỉ CO2', isCorrect: false, additionalImage: null },
      { content: 'Chỉ ATP', isCorrect: false, additionalImage: null },
      { content: 'O2 và glucose', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Vận chuyển chất hữu cơ',
    content: 'Đường được vận chuyển qua dòng mạch nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Dòng mạch rây', isCorrect: true, additionalImage: null },
      { content: 'Dòng mạch gỗ', isCorrect: false, additionalImage: null },
      { content: 'Cả hai dòng mạch', isCorrect: false, additionalImage: null },
      { content: 'Không qua dòng mạch', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Hormone thực vật',
    content: 'Auxin có chức năng chính là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Kích thích sinh trưởng, hướng động', isCorrect: true, additionalImage: null },
      { content: 'Kích thích ra hoa', isCorrect: false, additionalImage: null },
      { content: 'Kích thích rụng lá', isCorrect: false, additionalImage: null },
      { content: 'Ức chế sinh trưởng', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Cảm ứng với ánh sáng',
    content: 'Quang chu kỳ là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Phản ứng của thực vật với độ dài ngày đêm', isCorrect: true, additionalImage: null },
      { content: 'Phản ứng với cường độ ánh sáng', isCorrect: false, additionalImage: null },
      { content: 'Phản ứng với màu sắc ánh sáng', isCorrect: false, additionalImage: null },
      { content: 'Phản ứng với hướng ánh sáng', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Hệ bài tiết',
    content: 'Đơn vị chức năng của thận là gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Nephron', isCorrect: true, additionalImage: null },
      { content: 'Glomerulus', isCorrect: false, additionalImage: null },
      { content: 'Tubule', isCorrect: false, additionalImage: null },
      { content: 'Capsule', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Hệ nội tiết',
    content: 'Hormone được tiết ra từ đâu?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.EASY,
    additionalImage: null,
    answers: [
      { content: 'Các tuyến nội tiết', isCorrect: true, additionalImage: null },
      { content: 'Các tuyến ngoại tiết', isCorrect: false, additionalImage: null },
      { content: 'Các tế bào thần kinh', isCorrect: false, additionalImage: null },
      { content: 'Các tế bào cơ', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Sinh sản và phát triển',
    content: 'Quá trình phát triển phôi ở động vật có xương sống trải qua các giai đoạn nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Phân cắt, phôi nang, phôi vị, phôi thần kinh', isCorrect: true, additionalImage: null },
      { content: 'Chỉ phân cắt', isCorrect: false, additionalImage: null },
      { content: 'Chỉ phôi nang', isCorrect: false, additionalImage: null },
      { content: 'Chỉ phôi vị', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Sinh học phát triển tế bào',
    content: 'Chết tế bào theo chương trình (apoptosis) có đặc điểm gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Quá trình có kiểm soát, không gây viêm', isCorrect: true, additionalImage: null },
      { content: 'Quá trình ngẫu nhiên, gây viêm', isCorrect: false, additionalImage: null },
      { content: 'Chỉ xảy ra ở tế bào ung thư', isCorrect: false, additionalImage: null },
      { content: 'Không có vai trò gì', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Sinh học phân tử nâng cao',
    content: 'Cấu trúc bậc ba của protein được xác định bởi yếu tố nào?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.HARD,
    additionalImage: null,
    answers: [
      { content: 'Trình tự axit amin và tương tác giữa các nhóm R', isCorrect: true, additionalImage: null },
      { content: 'Chỉ trình tự axit amin', isCorrect: false, additionalImage: null },
      { content: 'Chỉ tương tác giữa các nhóm R', isCorrect: false, additionalImage: null },
      { content: 'Môi trường bên ngoài', isCorrect: false, additionalImage: null }
    ]
  },
  {
    lessonName: 'Sinh lý học so sánh',
    content: 'Động vật máu lạnh có đặc điểm gì?',
    type: QuestionType.MULTI_CHOICE,
    difficulty: QuestionDifficulty.MEDIUM,
    additionalImage: null,
    answers: [
      { content: 'Nhiệt độ cơ thể thay đổi theo môi trường', isCorrect: true, additionalImage: null },
      { content: 'Nhiệt độ cơ thể ổn định', isCorrect: false, additionalImage: null },
      { content: 'Luôn có nhiệt độ cao', isCorrect: false, additionalImage: null },
      { content: 'Không có nhiệt độ cơ thể', isCorrect: false, additionalImage: null }
    ]
  }
]
