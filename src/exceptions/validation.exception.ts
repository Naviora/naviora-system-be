import { BadRequestException } from '@nestjs/common'
import { ErrorCode } from '@constants/error-code.constant'

/**
 * Custom ValidationException for detailed validation errors.
 */
export class ValidationException extends BadRequestException {
  constructor(
    error: ErrorCode = ErrorCode.V000,
    message?: string,
    private details?: Array<{ property: string; code: string; message?: string }>
  ) {
    super({ errorCode: error, message, details })
  }

  getDetails() {
    return this.details || []
  }
}
