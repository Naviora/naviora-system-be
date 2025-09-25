import { ErrorCode } from '@constants/error-code.constant'

// Define error codes for constraint errors from validation(library)
export const constraintErrors: Record<string, string> = Object.freeze({
  isEmail: ErrorCode.V001,
  isPassword: ErrorCode.V002,
  isString: ErrorCode.V003,
  isNotEmpty: ErrorCode.V004,
  isDateFormat: ErrorCode.V005,
  isTimeFormat: ErrorCode.V006,
  isPhoneNumber: ErrorCode.V007
})
