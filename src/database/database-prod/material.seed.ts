import { MaterialType } from '@common/enums/material.enum'

// Seed data for MaterialEntity
// Materials are Biology-related resources (textbooks, lab guides, practice exercises, diagrams, videos)
// lecturerEmail will be replaced by actual lecturer ID during seeding
// All materials must be Biology-related content for excellent high school students

export const materialSeedData = [
  // SINH10 - Tế bào học materials
  {
    lecturerEmail: 'lecturer4@example.com', // Cô Phạm Thị Tế Bào
    materialName: 'Sách giáo khoa Sinh học 10 - Tế bào học',
    materialType: MaterialType.PDF,
    materialPath: '/materials/sinh10-te-bao-hoc-textbook.pdf'
  },
  {
    lecturerEmail: 'lecturer4@example.com',
    materialName: 'Sơ đồ cấu trúc tế bào nhân sơ và nhân thực',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/te-bao-nhan-so-nhan-thuc-diagram.png'
  },
  {
    lecturerEmail: 'lecturer@example.com', // Thầy Nguyễn Văn Sinh
    materialName: 'Video bài giảng: Các bào quan trong tế bào',
    materialType: MaterialType.VIDEO,
    materialPath: '/materials/bao-quan-te-bao-video.mp4'
  },
  {
    lecturerEmail: 'lecturer4@example.com',
    materialName: 'Bài tập thực hành: Quan sát tế bào dưới kính hiển vi',
    materialType: MaterialType.PDF,
    materialPath: '/materials/bai-tap-quan-sat-te-bao.pdf'
  },
  {
    lecturerEmail: 'lecturer4@example.com',
    materialName: 'Hình ảnh màng sinh học và cơ chế vận chuyển',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/mang-sinh-hoc-van-chuyen.png'
  },
  // SINH10 - Vi sinh vật học materials
  {
    lecturerEmail: 'lecturer4@example.com',
    materialName: 'Tài liệu về vi khuẩn và cấu trúc',
    materialType: MaterialType.PDF,
    materialPath: '/materials/vi-khuan-cau-truc.pdf'
  },
  {
    lecturerEmail: 'lecturer4@example.com',
    materialName: 'Sơ đồ cấu trúc virus',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/cau-truc-virus-diagram.png'
  },
  {
    lecturerEmail: 'lecturer4@example.com',
    materialName: 'Video: Chu trình nhân lên của virus',
    materialType: MaterialType.VIDEO,
    materialPath: '/materials/virus-nhan-len-video.mp4'
  },
  // SINH10 - Phân bào materials
  {
    lecturerEmail: 'lecturer4@example.com',
    materialName: 'Sơ đồ các giai đoạn nguyên phân',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/nguyen-phan-giai-doan.png'
  },
  {
    lecturerEmail: 'lecturer4@example.com',
    materialName: 'Tài liệu về giảm phân và trao đổi chéo',
    materialType: MaterialType.PDF,
    materialPath: '/materials/giam-phan-trao-doi-cheo.pdf'
  },
  {
    lecturerEmail: 'lecturer@example.com',
    materialName: 'Video bài giảng: Chu kỳ tế bào và điều hòa',
    materialType: MaterialType.VIDEO,
    materialPath: '/materials/chu-ky-te-bao-video.mp4'
  },
  // SINH11 - Sinh lý thực vật materials
  {
    lecturerEmail: 'lecturer12@example.com', // Cô Mai Thị Thực Vật
    materialName: 'Sách bài tập Sinh học 11 - Sinh lý thực vật',
    materialType: MaterialType.PDF,
    materialPath: '/materials/sinh11-sinh-ly-thuc-vat-exercises.pdf'
  },
  {
    lecturerEmail: 'lecturer12@example.com',
    materialName: 'Sơ đồ quang hợp - Pha sáng và pha tối',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/quang-hop-pha-sang-pha-toi.png'
  },
  {
    lecturerEmail: 'lecturer12@example.com',
    materialName: 'Video thí nghiệm: Quang hợp ở thực vật',
    materialType: MaterialType.VIDEO,
    materialPath: '/materials/thi-nghiem-quang-hop.mp4'
  },
  {
    lecturerEmail: 'lecturer12@example.com',
    materialName: 'Tài liệu về vận chuyển nước và khoáng',
    materialType: MaterialType.PDF,
    materialPath: '/materials/van-chuyen-nuoc-khoang.pdf'
  },
  {
    lecturerEmail: 'lecturer12@example.com',
    materialName: 'Sơ đồ hệ thống mạch gỗ và mạch rây',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/mach-go-mach-ray-diagram.png'
  },
  // SINH11 - Sinh lý động vật materials
  {
    lecturerEmail: 'lecturer11@example.com', // Thầy Lưu Văn Động Vật
    materialName: 'Tài liệu về hệ tuần hoàn máu',
    materialType: MaterialType.PDF,
    materialPath: '/materials/he-tuan-hoan-mau.pdf'
  },
  {
    lecturerEmail: 'lecturer11@example.com',
    materialName: 'Sơ đồ cấu trúc tim và mạch máu',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/cau-truc-tim-mach-mau.png'
  },
  {
    lecturerEmail: 'lecturer6@example.com', // Cô Vũ Thị Sinh Lý
    materialName: 'Video bài giảng: Hệ hô hấp và trao đổi khí',
    materialType: MaterialType.VIDEO,
    materialPath: '/materials/he-ho-hap-trao-doi-khi-video.mp4'
  },
  {
    lecturerEmail: 'lecturer11@example.com',
    materialName: 'Tài liệu về hệ tiêu hóa và hấp thu',
    materialType: MaterialType.PDF,
    materialPath: '/materials/he-tieu-hoa-hap-thu.pdf'
  },
  {
    lecturerEmail: 'lecturer11@example.com',
    materialName: 'Sơ đồ cấu trúc thận và cơ chế lọc máu',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/cau-truc-than-loc-mau.png'
  },
  // SINH12 - Di truyền học phân tử materials
  {
    lecturerEmail: 'lecturer8@example.com', // Cô Bùi Thị Phân Tử
    materialName: 'Sách chuyên đề: Di truyền học phân tử nâng cao',
    materialType: MaterialType.PDF,
    materialPath: '/materials/di-truyen-phan-tu-nang-cao.pdf'
  },
  {
    lecturerEmail: 'lecturer8@example.com',
    materialName: 'Sơ đồ cấu trúc ADN và ARN',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/cau-truc-adn-arn-diagram.png'
  },
  {
    lecturerEmail: 'lecturer3@example.com', // Thầy Lê Văn Di Truyền
    materialName: 'Video bài giảng: Nhân đôi ADN',
    materialType: MaterialType.VIDEO,
    materialPath: '/materials/nhan-doi-adn-video.mp4'
  },
  {
    lecturerEmail: 'lecturer8@example.com',
    materialName: 'Tài liệu về phiên mã và dịch mã',
    materialType: MaterialType.PDF,
    materialPath: '/materials/phien-ma-dich-ma.pdf'
  },
  {
    lecturerEmail: 'lecturer8@example.com',
    materialName: 'Sơ đồ quá trình tổng hợp protein',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/tong-hop-protein-diagram.png'
  },
  {
    lecturerEmail: 'lecturer3@example.com',
    materialName: 'Bảng mã di truyền đầy đủ',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/bang-ma-di-truyen.png'
  },
  // SINH12 - Đột biến và biến dị materials
  {
    lecturerEmail: 'lecturer3@example.com',
    materialName: 'Tài liệu về các loại đột biến gen',
    materialType: MaterialType.PDF,
    materialPath: '/materials/cac-loai-dot-bien-gen.pdf'
  },
  {
    lecturerEmail: 'lecturer2@example.com', // Cô Trần Thị Sinh Học
    materialName: 'Sơ đồ đột biến cấu trúc nhiễm sắc thể',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/dot-bien-cau-truc-nst.png'
  },
  {
    lecturerEmail: 'lecturer3@example.com',
    materialName: 'Video bài giảng: Đột biến số lượng NST',
    materialType: MaterialType.VIDEO,
    materialPath: '/materials/dot-bien-so-luong-nst-video.mp4'
  },
  // SINH12 - Quy luật di truyền materials
  {
    lecturerEmail: 'lecturer3@example.com',
    materialName: 'Sách bài tập: Quy luật di truyền Mendel',
    materialType: MaterialType.PDF,
    materialPath: '/materials/quy-luat-di-truyen-mendel-exercises.pdf'
  },
  {
    lecturerEmail: 'lecturer3@example.com',
    materialName: 'Sơ đồ di truyền liên kết và hoán vị gen',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/di-truyen-lien-ket-hoan-vi.png'
  },
  {
    lecturerEmail: 'lecturer@example.com',
    materialName: 'Tài liệu về di truyền liên kết với giới tính',
    materialType: MaterialType.PDF,
    materialPath: '/materials/di-truyen-lien-ket-gioi-tinh.pdf'
  },
  // SINH12 - Tiến hóa materials
  {
    lecturerEmail: 'lecturer7@example.com', // Thầy Đặng Văn Tiến Hóa
    materialName: 'Sách chuyên đề: Thuyết tiến hóa Darwin',
    materialType: MaterialType.PDF,
    materialPath: '/materials/thuyet-tien-hoa-darwin.pdf'
  },
  {
    lecturerEmail: 'lecturer7@example.com',
    materialName: 'Sơ đồ bằng chứng tiến hóa',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/bang-chung-tien-hoa-diagram.png'
  },
  {
    lecturerEmail: 'lecturer7@example.com',
    materialName: 'Video bài giảng: Cơ chế tiến hóa',
    materialType: MaterialType.VIDEO,
    materialPath: '/materials/co-che-tien-hoa-video.mp4'
  },
  // SINH12 - Sinh thái học materials
  {
    lecturerEmail: 'lecturer5@example.com', // Thầy Hoàng Văn Sinh Thái
    materialName: 'Tài liệu về đặc trưng quần thể sinh vật',
    materialType: MaterialType.PDF,
    materialPath: '/materials/dac-trung-quan-the.pdf'
  },
  {
    lecturerEmail: 'lecturer10@example.com', // Cô Dương Thị Hệ Sinh Thái
    materialName: 'Sơ đồ chuỗi và lưới thức ăn',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/chuoi-luoi-thuc-an.png'
  },
  {
    lecturerEmail: 'lecturer5@example.com',
    materialName: 'Video bài giảng: Dòng năng lượng trong hệ sinh thái',
    materialType: MaterialType.VIDEO,
    materialPath: '/materials/dong-nang-luong-he-sinh-thai-video.mp4'
  },
  {
    lecturerEmail: 'lecturer9@example.com', // Thầy Ngô Văn Quần Thể
    materialName: 'Tài liệu về chu trình vật chất',
    materialType: MaterialType.PDF,
    materialPath: '/materials/chu-trinh-vat-chat.pdf'
  },
  // SINH12 - Công nghệ gen materials
  {
    lecturerEmail: 'lecturer8@example.com',
    materialName: 'Sách chuyên đề: Kỹ thuật ADN tái tổ hợp',
    materialType: MaterialType.PDF,
    materialPath: '/materials/ky-thuat-adn-tai-to-hop.pdf'
  },
  {
    lecturerEmail: 'lecturer@example.com',
    materialName: 'Video thí nghiệm: Kỹ thuật PCR',
    materialType: MaterialType.VIDEO,
    materialPath: '/materials/ky-thuat-pcr-video.mp4'
  },
  {
    lecturerEmail: 'lecturer8@example.com',
    materialName: 'Tài liệu về ứng dụng công nghệ gen',
    materialType: MaterialType.PDF,
    materialPath: '/materials/ung-dung-cong-nghe-gen.pdf'
  },
  // SINH12 - Sinh học miễn dịch materials
  {
    lecturerEmail: 'lecturer2@example.com',
    materialName: 'Tài liệu về hệ miễn dịch bẩm sinh',
    materialType: MaterialType.PDF,
    materialPath: '/materials/he-mien-dich-bam-sinh.pdf'
  },
  {
    lecturerEmail: 'lecturer@example.com',
    materialName: 'Sơ đồ hệ miễn dịch đáp ứng',
    materialType: MaterialType.IMAGE,
    materialPath: '/materials/he-mien-dich-dap-ung-diagram.png'
  },
  {
    lecturerEmail: 'lecturer2@example.com',
    materialName: 'Video bài giảng: Vắc xin và liệu pháp miễn dịch',
    materialType: MaterialType.VIDEO,
    materialPath: '/materials/vac-xin-lieu-phap-mien-dich-video.mp4'
  }
]
