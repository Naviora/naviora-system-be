// Define error codes for validation and error messages (biz)
export enum ErrorCode {
  // Common Validation
  V000 = 'common.validation.error',
  V003 = 'common.validation.is_invalid_string',
  V004 = 'common.validation.is_not_empty',
  V005 = 'common.validation.is_invalid_date_format',
  V006 = 'common.validation.is_invalid_time_format',
  V007 = 'common.validation.is_invalid_phone_number',
  // Validation
  V001 = 'user.validation.is_invalid_email',
  V002 = 'user.validation.is_invalid_password',

  //Error of Staff
  S001 = 'staff.error.staff_not_found',
  S002 = 'staff.error.create_staff_failed',

  E001 = 'account.error.username_or_email_exists',
  E002 = 'account.error.not_found',
  E003 = 'account.error.email_exists',
  E004 = 'account.error.email_not_found',
  E005 = 'account.error.password_not_match',
  E006 = 'account.error.current_password_not_match',
  E007 = 'account.error.otp_has_expired',
  E008 = 'account.error.otp_not_match',
  E009 = 'account.error.phone_number_exists',

  // Error of Account
  A001 = 'account.error.create_account_failed',
  A002 = 'account.error.change_account_failed',
  A003 = 'account.error.upload_file_failed',
  A004 = 'account.error.account_not_found',

  //Error socket
  ES001 = 'webSocket.error.authentication_missing',

  //Error notifications
  NF001 = 'notification.error.not_found_notifications.',

  // Error of Email Sending
  EMAIL001 = 'email.error.missing_email_or_name',
  EMAIL002 = 'email.error.send_failed',
  EMAIL003 = 'email.error.no_salary_data',
  EMAIL004 = 'email.error.missing_staff_info',
  EMAIL005 = 'email.error.processing_failed',

  //Error of Department
  D001 = 'department.error.not_found',

  //Error of Class
  CLASS001 = 'class.error.class_code_exists',
  CLASS002 = 'class.error.create_class_failed',
  CLASS003 = 'class.error.class_not_found',
  CLASS004 = 'class.error.lecturer_not_found',
  CLASS005 = 'class.error.user_not_lecturer',
  CLASS006 = 'class.error.assign_lecturer_failed',
  CLASS007 = 'class.error.lecturer_already_assigned',

  //Error of Module
  MODULE001 = 'module.error.module_code_exists',
  MODULE002 = 'module.error.create_module_failed',
  MODULE003 = 'module.error.module_not_found',
  MODULE004 = 'module.error.lecturer_already_assigned',
  MODULE005 = 'module.error.assign_lecturer_failed',

  //Error of Question Module
  Q001 = 'question.error.not_found',
  Q002 = 'question.error.multiple_choice_question_must_have_4_answers',
  Q003 = 'question.error.multiple_choice_question_must_have_only_1_correct_answer',
  Q004 = 'question.error.duplicate_answer_content',

  //Error of User
  USER001 = 'user.error.user_not_found',
  USER002 = 'user.error.user_not_lecturer',

  // Error of Lesson
  L001 = 'lesson.error.lesson_name_exists',
  L002 = 'lesson.error.lesson_not_found',

  // Error of Material
  M001 = 'material.error.material_not_found',

  // Error of Teaching Material
  T001 = 'teaching_material.error.teaching_material_not_found'
}
