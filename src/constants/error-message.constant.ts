import { HttpStatus } from '@nestjs/common'
import { ErrorCode } from './error-code.constant'

const DEFAULT_ERROR_MESSAGE = 'Đã xảy ra lỗi không mong muốn'

export const ERROR_CODE_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.V000]: 'Dữ liệu gửi lên không hợp lệ',
  [ErrorCode.V003]: 'Chuỗi ký tự không hợp lệ',
  [ErrorCode.V004]: 'Trường dữ liệu không được để trống',
  [ErrorCode.V005]: 'Định dạng ngày không hợp lệ',
  [ErrorCode.V006]: 'Định dạng thời gian không hợp lệ',
  [ErrorCode.V007]: 'Số điện thoại không hợp lệ',
  [ErrorCode.V001]: 'Email không hợp lệ',
  [ErrorCode.V002]: 'Mật khẩu không hợp lệ',
  [ErrorCode.S001]: 'Không tìm thấy nhân viên',
  [ErrorCode.S002]: 'Không thể tạo nhân viên',
  [ErrorCode.E001]: 'Tên đăng nhập hoặc email đã tồn tại',
  [ErrorCode.E002]: 'Không tìm thấy tài khoản',
  [ErrorCode.E003]: 'Email đã tồn tại',
  [ErrorCode.E004]: 'Không tìm thấy email',
  [ErrorCode.E005]: 'Mật khẩu không khớp',
  [ErrorCode.E006]: 'Mật khẩu hiện tại không đúng',
  [ErrorCode.E007]: 'OTP đã hết hạn',
  [ErrorCode.E008]: 'OTP không đúng',
  [ErrorCode.E009]: 'Số điện thoại đã tồn tại',
  [ErrorCode.A001]: 'Không thể tạo tài khoản',
  [ErrorCode.A002]: 'Không thể thay đổi thông tin tài khoản',
  [ErrorCode.A003]: 'Tải tệp thất bại',
  [ErrorCode.A004]: 'Không tìm thấy tài khoản',
  [ErrorCode.ES001]: 'Thiếu thông tin xác thực',
  [ErrorCode.NF001]: 'Không tìm thấy thông báo',
  [ErrorCode.EMAIL001]: 'Thiếu email hoặc tên người nhận',
  [ErrorCode.EMAIL002]: 'Gửi email thất bại',
  [ErrorCode.EMAIL003]: 'Không có dữ liệu lương',
  [ErrorCode.EMAIL004]: 'Thiếu thông tin nhân viên',
  [ErrorCode.EMAIL005]: 'Xử lý email thất bại',
  [ErrorCode.D001]: 'Không tìm thấy phòng ban',
  [ErrorCode.CLASS001]: 'Mã lớp đã tồn tại',
  [ErrorCode.CLASS002]: 'Ngày bắt đầu phải trước hoặc bằng ngày kết thúc',
  [ErrorCode.CLASS003]: 'Không tìm thấy lớp',
  [ErrorCode.CLASS004]: 'Không tìm thấy giảng viên',
  [ErrorCode.CLASS005]: 'Người dùng không phải giảng viên',
  [ErrorCode.CLASS006]: 'Phân công giảng viên thất bại',
  [ErrorCode.CLASS007]: 'Giảng viên đã được phân công',
  [ErrorCode.MODULE001]: 'Mã học phần đã tồn tại',
  [ErrorCode.MODULE002]: 'Không thể tạo học phần',
  [ErrorCode.MODULE003]: 'Không tìm thấy học phần',
  [ErrorCode.MODULE004]: 'Giảng viên đã được phân công cho học phần này',
  [ErrorCode.MODULE005]: 'Phân công giảng viên thất bại',
  [ErrorCode.Q001]: 'Không tìm thấy câu hỏi',
  [ErrorCode.Q002]: 'Câu hỏi trắc nghiệm phải có 4 đáp án',
  [ErrorCode.Q003]: 'Câu hỏi trắc nghiệm chỉ được phép có 1 đáp án đúng',
  [ErrorCode.Q004]: 'Nội dung đáp án bị trùng',
  [ErrorCode.Q005]: 'Số lượng câu hỏi không khớp',
  [ErrorCode.USER001]: 'Không tìm thấy người dùng',
  [ErrorCode.USER002]: 'Người dùng không phải giảng viên',
  [ErrorCode.L001]: 'Tên bài học đã tồn tại',
  [ErrorCode.L002]: 'Không tìm thấy bài học',
  [ErrorCode.M001]: 'Không tìm thấy tài liệu',
  [ErrorCode.T001]: 'Không tìm thấy tài liệu giảng dạy',
  [ErrorCode.QUESTION_SET_001]: 'Không tìm thấy bộ câu hỏi',
  [ErrorCode.QUESTION_SET_002]: 'Danh sách bộ câu hỏi không hợp lệ',
  [ErrorCode.QUESTION_SET_003]: 'Số lượng câu hỏi trong bộ câu hỏi không khớp',
  [ErrorCode.QUESTION_SET_004]: 'Không thể cập nhật bộ câu hỏi đang được sử dụng',
  [ErrorCode.QUESTION_SET_005]: 'Không thể xóa bộ câu hỏi đang được sử dụng',
  [ErrorCode.ENTRY_TEST001]: 'Không tìm thấy bài kiểm tra đầu vào',
  [ErrorCode.ENTRY_TEST002]: 'Học viên đã có bài làm cho bài kiểm tra này',
  [ErrorCode.ENTRY_TEST003]: 'Không có bộ câu hỏi khả dụng',
  [ErrorCode.ENTRY_TEST004]: 'Cập nhật bài kiểm tra đầu vào thất bại',
  [ErrorCode.ENTRY_TEST005]: 'Đã có bài kiểm tra đầu vào đang hoạt động',
  [ErrorCode.FINAL_EXAM001]: 'Không tìm thấy bài thi cuối kỳ',
  [ErrorCode.FINAL_EXAM002]: 'Học viên đã có bài làm cho bài thi này',
  [ErrorCode.FINAL_EXAM003]: 'Không có bộ câu hỏi khả dụng cho bài thi',
  [ErrorCode.FINAL_EXAM004]: 'Cập nhật bài thi cuối kỳ thất bại',
  [ErrorCode.FINAL_EXAM005]: 'Đã có bài thi cuối kỳ đang hoạt động',
  [ErrorCode.MEETING001]: 'Khoảng thời gian họp không hợp lệ',
  [ErrorCode.MEETING002]: 'Bạn không được phép tạo lịch họp cho lớp này',
  [ErrorCode.MEETING003]: 'Một số người được mời không thuộc lớp',
  [ErrorCode.MEETING004]: 'Tạo lịch họp thất bại'
}

const TEXT_TRANSLATIONS: Record<string, string> = {
  'Access token is invalid or expired': 'Access token không hợp lệ hoặc đã hết hạn',
  'Access token is invalid or revoked': 'Access token không hợp lệ hoặc đã bị thu hồi',
  'Access token is missing': 'Thiếu Access token',
  'Account is not activated yet!': 'Tài khoản chưa được kích hoạt!',
  'Answer content must be unique': 'Nội dung đáp án phải là duy nhất',
  'Answer content must not be empty': 'Nội dung đáp án không được để trống',
  'Answer does not belong to the specified question': 'Đáp án không thuộc về câu hỏi tương ứng',
  'Cannot create account with Admin role': 'Không thể tạo tài khoản với quyền Quản trị',
  'Cannot delete question set that is in use': 'Không thể xóa bộ câu hỏi đang được sử dụng',
  'Cannot update questions or config when question set is in use':
    'Không thể cập nhật câu hỏi hoặc cấu hình khi bộ câu hỏi đang được sử dụng',
  'Class code already exists': 'Mã lớp đã tồn tại',
  'Class not found': 'Không tìm thấy lớp',
  'Class not found for this module': 'Không tìm thấy lớp của học phần này',
  'Config total_questions does not match the number of questions': 'Số câu hỏi trong cấu hình không khớp với thực tế',
  'Duplicate score ranges found': 'Phát hiện khoảng điểm trùng nhau',
  'Email already exists': 'Email đã tồn tại',
  'Email not exists': 'Email không tồn tại',
  'Email or password is incorrect!!!': 'Email hoặc mật khẩu không chính xác',
  'End time must be after start time': 'Thời gian kết thúc phải sau thời gian bắt đầu',
  'Entry test is not active': 'Bài kiểm tra đầu vào chưa được kích hoạt',
  'Entry test not found': 'Không tìm thấy bài kiểm tra đầu vào',
  'Excel file is empty or invalid': 'Tệp Excel rỗng hoặc không hợp lệ',
  'Excel file is required': 'Cần cung cấp tệp Excel',
  'Failed to assign lecturers to class': 'Phân công giảng viên cho lớp thất bại',
  'Failed to assign lecturers to module': 'Phân công giảng viên cho học phần thất bại',
  'Failed to create entry test': 'Tạo bài kiểm tra đầu vào thất bại',
  'Failed to create final exam': 'Tạo bài thi cuối kỳ thất bại',
  'Failed to create question set': 'Tạo bộ câu hỏi thất bại',
  'Failed to create reviewed exercise': 'Tạo bài tập có chấm điểm thất bại',
  'Failed to process Excel file': 'Xử lý tệp Excel thất bại',
  'Failed to update class': 'Cập nhật lớp thất bại',
  'Failed to update entry test': 'Cập nhật bài kiểm tra đầu vào thất bại',
  'Failed to update final exam': 'Cập nhật bài thi cuối kỳ thất bại',
  'Failed to update module': 'Cập nhật học phần thất bại',
  'Failed to update reviewed exercise': 'Cập nhật bài tập có chấm điểm thất bại',
  'Final exam is not active': 'Bài thi cuối kỳ chưa được kích hoạt',
  'Final exam not found': 'Không tìm thấy bài thi cuối kỳ',
  'Invalid answer IDs in submission': 'Đáp án gửi lên không hợp lệ',
  'Invalid file type. Please upload an Excel file (.xlsx)': 'Sai định dạng tệp. Vui lòng tải lên tệp Excel (.xlsx)',
  'Invalid question IDs': 'Câu hỏi không hợp lệ',
  'Invalid question IDs in submission': 'Câu hỏi gửi lên không hợp lệ',
  'Invalid question set IDs': 'Bộ câu hỏi không hợp lệ',
  'Invalid time range': 'Khoảng thời gian không hợp lệ',
  'Lecturer not found': 'Không tìm thấy giảng viên',
  'Lesson name is already existed': 'Tên bài học đã tồn tại',
  'Lesson not found': 'Không tìm thấy bài học',
  'Lesson not found after update': 'Không tìm thấy bài học sau khi cập nhật',
  'Material not found': 'Không tìm thấy tài liệu',
  'Module code already exists': 'Mã học phần đã tồn tại',
  'Module not found': 'Không tìm thấy học phần',
  'Module not found for this reviewed exercise': 'Không tìm thấy học phần của bài tập này',
  'Multiple choice question must have 4 answers': 'Câu hỏi trắc nghiệm phải có 4 đáp án',
  'Multiple choice question must have only 1 correct answer': 'Câu hỏi trắc nghiệm chỉ được phép có 1 đáp án đúng',
  'New password and confirm password do not match': 'Mật khẩu mới và xác nhận mật khẩu không khớp',
  'No question sets available for this entry test': 'Không có bộ câu hỏi khả dụng cho bài kiểm tra đầu vào này',
  'No question sets available for this final exam': 'Không có bộ câu hỏi khả dụng cho bài thi cuối kỳ này',
  'No question sets available for this reviewed exercise': 'Không có bộ câu hỏi khả dụng cho bài tập này',
  'No submitted entries found for this entry test': 'Không có bài làm nào cho bài kiểm tra đầu vào này',
  'OTP has expired': 'OTP đã hết hạn',
  'OTP not match': 'OTP không đúng',
  'Only students can access class modules': 'Chỉ học viên mới được truy cập học phần của lớp',
  'Only students can update lesson progress': 'Chỉ học viên mới được cập nhật tiến độ bài học',
  'Only students can view their streak': 'Chỉ học viên mới được xem chuỗi học tập',
  'Password not correct': 'Mật khẩu không chính xác',
  'Phone number already exists': 'Số điện thoại đã tồn tại',
  'Question count mismatch': 'Số lượng câu hỏi không khớp',
  'Question not found': 'Không tìm thấy câu hỏi',
  'Question set not found': 'Không tìm thấy bộ câu hỏi',
  'Question sets are already in use': 'Bộ câu hỏi đang được sử dụng',
  'Questions is required': 'Danh sách câu hỏi là bắt buộc',
  'Refresh token is invalid or expired': 'Refresh token không hợp lệ hoặc đã hết hạn',
  'Refresh token is missing': 'Thiếu Refresh token',
  'Reviewed exercise is not active': 'Bài tập có chấm điểm chưa được kích hoạt',
  'Reviewed exercise is not currently available': 'Bài tập có chấm điểm hiện chưa khả dụng',
  'Reviewed exercise not found': 'Không tìm thấy bài tập có chấm điểm',
  'Role not found': 'Không tìm thấy vai trò',
  'Some classes are not active': 'Một số lớp chưa được kích hoạt',
  'Some classes not found': 'Không tìm thấy một số lớp',
  'Some invitees are not in the class': 'Một số người được mời không thuộc lớp',
  'Some lecturers are already assigned to this class': 'Một số giảng viên đã được phân công cho lớp này',
  'Some lecturers are already assigned to this module': 'Một số giảng viên đã được phân công cho học phần này',
  'Some lecturers not found': 'Không tìm thấy một số giảng viên',
  'Some users are not lecturers': 'Một số người dùng không phải giảng viên',
  'Start date must be before or equal to end date': 'Ngày bắt đầu phải trước hoặc bằng ngày kết thúc',
  'Student already has a submission for this entry test': 'Học viên đã có bài làm cho bài kiểm tra đầu vào này',
  'Student already has a submission for this final exam': 'Học viên đã có bài làm cho bài thi cuối kỳ này',
  'Student already has a submission for this reviewed exercise': 'Học viên đã có bài làm cho bài tập này',
  'Student has not completed the entry test': 'Học viên chưa hoàn thành bài kiểm tra đầu vào',
  'Student is not enrolled in this class': 'Học viên chưa đăng ký lớp này',
  'Student not found': 'Không tìm thấy học viên',
  'Submission has already been completed': 'Bài làm này đã được nộp trước đó',
  'Submission not found': 'Không tìm thấy bài làm',
  'There is already an active entry test': 'Đã có bài kiểm tra đầu vào đang hoạt động',
  'There is already an active final exam': 'Đã có bài thi cuối kỳ đang hoạt động',
  'Unauthorized access to submission': 'Bạn không có quyền truy cập bài làm này',
  'User is not a student': 'Người dùng không phải học viên',
  'User not found': 'Không tìm thấy người dùng',
  'You are not assigned to teach this module. You can only view grades for students in your assigned modules.':
    'Bạn không được phân công dạy học phần này. Bạn chỉ được xem điểm của học viên thuộc học phần do mình phụ trách.',
  'You do not have permission to do this!': 'Bạn không có quyền thực hiện hành động này!',
  'You have not logged into this website!': 'Bạn chưa đăng nhập vào hệ thống!'
}

export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  [HttpStatus.BAD_REQUEST]: 'Yêu cầu không hợp lệ',
  [HttpStatus.UNAUTHORIZED]: 'Bạn không có quyền truy cập',
  [HttpStatus.FORBIDDEN]: 'Bạn không có quyền thực hiện hành động này',
  [HttpStatus.NOT_FOUND]: 'Không tìm thấy dữ liệu',
  [HttpStatus.CONFLICT]: 'Dữ liệu bị xung đột',
  [HttpStatus.GONE]: 'Dữ liệu không còn tồn tại',
  [HttpStatus.TOO_MANY_REQUESTS]: 'Bạn thao tác quá nhanh, vui lòng thử lại sau',
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'Lỗi máy chủ nội bộ'
}

export function translateText(message?: string): string | undefined {
  if (!message) {
    return message
  }

  const trimmed = message.trim()
  if (TEXT_TRANSLATIONS[trimmed]) {
    return TEXT_TRANSLATIONS[trimmed]
  }

  for (const [source, target] of Object.entries(TEXT_TRANSLATIONS)) {
    if (trimmed.startsWith(`${source}:`)) {
      return `${target}${trimmed.slice(source.length)}`
    }
  }

  return trimmed
}

export function getErrorMessage(errorCode?: ErrorCode): string {
  if (!errorCode) {
    return DEFAULT_ERROR_MESSAGE
  }

  return ERROR_CODE_MESSAGES[errorCode] || DEFAULT_ERROR_MESSAGE
}

export function getHttpStatusMessage(status: number): string {
  return HTTP_STATUS_MESSAGES[status] || DEFAULT_ERROR_MESSAGE
}
