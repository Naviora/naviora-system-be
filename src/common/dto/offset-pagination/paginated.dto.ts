import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { OffsetPaginationDto } from './offset-pagination.dto'

interface OffsetPaginated<T> {
  statusCode: number
  message: string
  data: T[]
  meta: OffsetPaginationDto
}
export class OffsetPaginatedDto<TData> {
  @ApiProperty()
  @Expose()
  readonly message?: string

  @ApiProperty()
  @Expose()
  readonly statusCode?: number

  @ApiProperty({ type: [Object] })
  @Expose()
  readonly data: TData[]

  @ApiProperty()
  @Expose()
  pagination: OffsetPaginationDto

  constructor({
    data,
    meta,
    message = 'Data has been successfully retrieved',
    statusCode = 200
  }: OffsetPaginated<TData>) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
    this.pagination = meta
  }
}
