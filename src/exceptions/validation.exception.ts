import { BadRequestException } from '@nestjs/common'
import { ErrorCode } from '@constants/error-code.constant'
import { getErrorMessage, translateText } from '@constants/error-message.constant'

/**
 * Custom ValidationException for detailed validation errors.
 */
export class ValidationException extends BadRequestException {
  constructor(
    error: ErrorCode = ErrorCode.V000,
    message?: string,
    private details?: Array<{ property: string; code: string; message?: string }>
  ) {
    const translatedMessage = translateText(message) || getErrorMessage(error)
    const translatedDetails = details?.map((detail) => ({
      ...detail,
      message: translateText(detail.message) || detail.message
    }))

    super({ errorCode: error, message: translatedMessage, details: translatedDetails })

    this.details = translatedDetails
  }

  getDetails() {
    return this.details || []
  }
}
