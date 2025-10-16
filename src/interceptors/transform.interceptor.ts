import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { OffsetPaginatedDto } from '@common/dto/offset-pagination/paginated.dto'
import { RESPONSE_MESSAGE_KEY } from '@decorators/response-message.decorator'
import { SKIP_TRANSFORM_KEY } from '@decorators/skip-transform.decorator'
import { keysToSnake } from '@utils/snake-case'

export interface Response<T> {
  statusCode: number
  message: string
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T> | any> {
    // Check if this route or controller should skip transformation
    const skipTransform =
      this.reflector.get<boolean>(SKIP_TRANSFORM_KEY, context.getHandler()) ||
      this.reflector.get<boolean>(SKIP_TRANSFORM_KEY, context.getClass())
    if (skipTransform) {
      return next.handle()
    }

    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse()
        const request = context.switchToHttp().getRequest()
        const statusCode = response.statusCode

        const customMessage = this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler())
        const defaultMessage = this.getDefaultMessage(request.method, statusCode)

        if (data instanceof OffsetPaginatedDto) {
          return {
            status_code: statusCode,
            message: customMessage || defaultMessage,
            data: Array.isArray(data.data) ? data.data.map((item) => keysToSnake(item)) : data.data,
            pagination: keysToSnake(data.pagination)
          }
        }

        return {
          status_code: statusCode,
          message: customMessage || defaultMessage,
          data: keysToSnake(data)
        }
      })
    )
  }

  private getDefaultMessage(method: string, statusCode: number): string {
    if (statusCode >= 200 && statusCode < 300) {
      switch (method.toUpperCase()) {
        case 'GET':
          return 'Data retrieved successfully'
        case 'POST':
          return 'Resource created successfully'
        case 'PUT':
        case 'PATCH':
          return 'Resource updated successfully'
        case 'DELETE':
          return 'Resource deleted successfully'
        default:
          return 'Operation completed successfully'
      }
    }
    return 'Success'
  }
}
