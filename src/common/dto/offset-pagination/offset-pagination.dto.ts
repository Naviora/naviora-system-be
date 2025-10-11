import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { PageOptionsDto } from './page-options.dto'

export class OffsetPaginationDto {
  @ApiProperty()
  @Expose()
  readonly limit: number

  @ApiProperty()
  @Expose()
  readonly current_page: number

  @ApiProperty()
  @Expose()
  readonly next_page?: number

  @ApiProperty()
  @Expose()
  readonly previous_page?: number

  @ApiProperty()
  @Expose()
  readonly total_records: number

  @ApiProperty()
  @Expose()
  readonly total_pages: number

  constructor(totalRecords: number, pageOptions: PageOptionsDto) {
    this.limit = pageOptions.limit
    this.current_page = pageOptions.page
    this.next_page = this.current_page < this.total_pages ? this.current_page + 1 : undefined
    this.previous_page =
      this.current_page > 1 && this.current_page - 1 < this.total_pages ? this.current_page - 1 : undefined
    this.total_records = totalRecords
    this.total_pages = this.limit > 0 ? Math.ceil(totalRecords / pageOptions.limit) : 0
  }
}
