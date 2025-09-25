export class ApiResponse<T> {
  private statusCode: number = 200
  private message?: string
  private data?: T

  constructor(message?: string, data?: T, statusCode = 200) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }

  setCode(statusCode: number): this {
    this.statusCode = statusCode
    return this
  }

  setMessage(message: string): this {
    this.message = message
    return this
  }

  setData(data: T): this {
    this.data = data
    return this
  }
}
