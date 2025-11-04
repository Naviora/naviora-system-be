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
  Q005 = 'question.error.question_count_mismatch',

  //Error of User
  USER001 = 'user.error.user_not_found',
  USER002 = 'user.error.user_not_lecturer',

  // Error of Lesson
  L001 = 'lesson.error.lesson_name_exists',
  L002 = 'lesson.error.lesson_not_found',

  // Error of Material
  M001 = 'material.error.material_not_found',

  // Error of Teaching Material
  T001 = 'teaching_material.error.teaching_material_not_found',

  // Error of Question Set
  QUESTION_SET_001 = 'question_set.error.question_set_not_found',
  QUESTION_SET_002 = 'question_set.error.invalid_question_set_ids',
  QUESTION_SET_003 = 'question_set.error.question_count_mismatch',
  QUESTION_SET_004 = 'question_set.error.cannot_update_questions_or_config_when_in_use',
  QUESTION_SET_005 = 'question.error.cannot_delete_question_set_in_use',
  // Error of Entry Test
  ENTRY_TEST001 = 'entry_test.error.entry_test_not_found',
  ENTRY_TEST002 = 'entry_test.error.student_already_has_a_submission_for_this_entry_test',
  ENTRY_TEST003 = 'entry_test.error.no_question_sets_available_for_this_entry_test',
  ENTRY_TEST004 = 'entry_test.error.failed_to_update_entry_test',
  // Error of Final Exam
  FINAL_EXAM001 = 'final_exam.error.final_exam_not_found',
  FINAL_EXAM002 = 'final_exam.error.student_already_has_a_submission_for_this_final_exam',
  FINAL_EXAM003 = 'final_exam.error.no_question_sets_available_for_this_final_exam',
  FINAL_EXAM004 = 'final_exam.error.failed_to_update_final_exam',
  // Error of Meeting Events
  MEETING001 = 'meeting_events.error.invalid_time_range',
  MEETING002 = 'meeting_events.error.not_allowed_to_create_for_class',
  MEETING003 = 'meeting_events.error.invitees_not_in_class',
  MEETING004 = 'meeting_events.error.create_meeting_failed'
}
