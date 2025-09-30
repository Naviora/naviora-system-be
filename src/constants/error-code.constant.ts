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

  //Validation and Error of Claim Request
  C001 = 'claim_request.validation.ot_date_out_of_range',
  C002 = 'claim_request.error.not_found',
  C003 = 'claim_request.error.not_draft',
  C004 = 'claim_request.error.not_pending',
  C005 = 'claim_request.error.not_approved',
  C006 = 'claim_request.error.user_not_project_manager',
  C007 = 'claim_request.error.finance_not_found',
  C008 = 'claim_request.error.approver_not_found',
  C009 = 'claim_request.error.failed_export_paid_claims',
  C010 = 'claim_request.error.no_permission_to_approve',
  C011 = 'claim_request.error.invalid_status_transition',
  C012 = 'claim_request.error.can_not_update_claim_request',
  C013 = 'claim_request.validation.total_hours_out_of_range',
  C014 = 'claim_request.validation.total_hours_not_match_calculated_hours.',
  C015 = 'claim_request.validation.remark_is_required',

  // Validation and Error of Staff Hour Month
  SH001 = 'staff_hour_month.validation.invalid_date_range',
  SH002 = 'staff_hour_month.error.not_found',
  SH003 = 'staff_hour_month.error.can_not_over_time_in_month',

  //Error of Project
  P001 = 'project.error.project_not_found',
  P002 = 'project.error.project_code_conflict',

  //Error of Project Staff
  PS000 = `project_staff.error.staff_doesn't_an_approver`,
  PS001 = 'project_staff.error.project_manager_not_found',
  PS002 = 'project_staff.error.not_assigned_to_any_project',
  PS003 = 'project_staff.error.has_a_staff_assigned_in_project',
  PS004 = 'project_staff.error.no_staff_found_in_project',
  PS005 = 'project_staff.error.already_existed_staff_with_role_PM_in_project',
  PS006 = `project_staff.error.you_don't_have_permission_to_assign_in_this_project`,
  //Error of Staff
  S001 = 'staff.error.staff_not_found',
  S002 = 'staff.error.create_staff_failed',

  //Error
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

  //Error of Salary Calculate
  SAL001 = 'salary.error.staff_not_found',
  SAL002 = 'salary.error.no_salary_records',
  SAL003 = 'salary.error.salary_already_exists',
  SAL004 = 'salary.error.staff_hours_not_found',
  SAL005 = 'salary.error.invalid_working_hours',
  SAL006 = 'salary.error.salary_processing_failed',
  SAL007 = 'salary.error.salary_record_not_found',
  SAL008 = 'salary.error.salary_config_not_found',
  SAL009 = 'salary.error.no_salary_records_found_for_this_month',

  // Error of Email Sending
  EMAIL001 = 'email.error.missing_email_or_name',
  EMAIL002 = 'email.error.send_failed',
  EMAIL003 = 'email.error.no_salary_data',
  EMAIL004 = 'email.error.missing_staff_info',
  EMAIL005 = 'email.error.processing_failed',

  //Error of Department
  D001 = 'department.error.not_found',

  //Error of Module
  MODULE001 = 'module.error.module_code_exists',
  MODULE002 = 'module.error.create_module_failed'
}
