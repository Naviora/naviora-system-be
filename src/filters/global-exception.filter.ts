import { ErrorDetailDto } from '@common/dto/error-detail.dto'
import { ErrorDto } from '@common/dto/error.dto'
import { constraintErrors } from '@constants/constraint-errors'
import { ErrorCode } from '@constants/error-code.constant'
import { ValidationException } from '@exceptions/validation.exception'
import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationError
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { STATUS_CODES } from 'http'
import { EntityNotFoundError, QueryFailedError } from 'typeorm'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private debug: boolean = false
  private readonly logger = new Logger(GlobalExceptionFilter.name)

  constructor(private readonly configService: ConfigService) {}

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    this.debug = this.configService.getOrThrow<boolean>('app.debug', { infer: true })

    let error: ErrorDto

    if (exception instanceof UnprocessableEntityException) {
      error = this.handleUnprocessableEntityException(exception)
    } else if (exception instanceof ValidationException) {
      error = this.handleValidationException(exception)
    } else if (exception instanceof HttpException) {
      error = this.handleHttpException(exception)
    } else if (exception instanceof QueryFailedError) {
      error = this.handleQueryFailedError(exception)
    } else if (exception instanceof EntityNotFoundError) {
      error = this.handleEntityNotFoundError(exception)
    } else {
      error = this.handleError(exception)
    }

    if (this.debug) {
      error.stack = exception.stack
      error.trace = exception

      this.logger.debug(error)
    }

    response.status(error.statusCode).json(error)
  }

  private handleUnprocessableEntityException(exception: UnprocessableEntityException): ErrorDto {
    const r = exception.getResponse() as { message: ValidationError[] }
    const statusCode = exception.getStatus()

    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode],
      message: 'Validation failed',
      details: this.extractValidationErrorDetails(r.message)
    }

    this.logger.debug(exception)

    return errorRes
  }

  private handleValidationException(exception: ValidationException): ErrorDto {
    const r = exception.getResponse() as {
      errorCode: ErrorCode
      message?: string
      details?: Array<{ property: string; code: string; message: string }>
    }

    const statusCode = exception.getStatus()

    const errorRes =
      r.details?.length > 0
        ? {
            timestamp: new Date().toISOString(),
            statusCode,
            error: STATUS_CODES[statusCode] || 'Unknown Error',
            message: r.message || r.errorCode,
            errorCode: Object.keys(ErrorCode)[Object.values(ErrorCode).indexOf(r.errorCode)],
            details: r.details?.map((detail) => ({
              ...detail,
              message: r.message
            }))
          }
        : {
            timestamp: new Date().toISOString(),
            error: STATUS_CODES[statusCode] || 'Unknown Error',
            statusCode,
            errorCode: Object.keys(ErrorCode)[Object.values(ErrorCode).indexOf(r.errorCode)],
            message: r.message || r.errorCode
          }

    this.logger.debug(exception)

    return errorRes
  }

  private handleHttpException(exception: HttpException): ErrorDto {
    const statusCode = exception.getStatus()

    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode],
      message: exception.message
    }

    this.logger.debug(exception)

    return errorRes
  }

  private handleQueryFailedError(error: QueryFailedError): ErrorDto {
    const r = error as QueryFailedError & { constraint?: string }
    const { status, message } = r.constraint?.startsWith('UQ')
      ? {
          status: HttpStatus.CONFLICT,
          message: constraintErrors[r.constraint] || r.constraint
        }
      : {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'common.error.internal_server_error'
        }

    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode: status,
      error: STATUS_CODES[status],
      message
    }

    this.logger.error(error)

    return errorRes
  }

  private handleEntityNotFoundError(error: EntityNotFoundError): ErrorDto {
    const status = HttpStatus.NOT_FOUND
    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode: status,
      error: STATUS_CODES[status],
      message: 'Entity not found'
    }

    this.logger.debug(error)

    return errorRes
  }

  private handleError(error: Error): ErrorDto {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR
    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode],
      message: error?.message || 'An unexpected error occurred'
    }

    this.logger.error(error)

    return errorRes
  }

  private extractValidationErrorDetails(errors: ValidationError[]): ErrorDetailDto[] {
    const extractErrors = (error: ValidationError, parentProperty: string = ''): ErrorDetailDto[] => {
      const propertyPath = parentProperty ? `${parentProperty}.${error.property}` : error.property

      const currentErrors: ErrorDetailDto[] = Object.entries(error.constraints || {}).map(([code, message]) => ({
        property: propertyPath,
        code: constraintErrors[code] || code,
        message
      }))

      const childErrors: ErrorDetailDto[] =
        error.children?.flatMap((childError) => extractErrors(childError, propertyPath)) || []

      return [...currentErrors, ...childErrors]
    }

    return errors.flatMap((error) => extractErrors(error))
  }
}
