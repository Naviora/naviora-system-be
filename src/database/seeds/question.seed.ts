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
  }
]
