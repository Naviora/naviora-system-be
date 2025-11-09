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
    // Ensure we have valid default values if pageOptions properties are undefined
    const limit = pageOptions?.limit ?? 10
    const page = pageOptions?.page ?? 1

    this.limit = limit
    this.current_page = page
    this.total_records = totalRecords
    this.total_pages = limit > 0 ? Math.ceil(totalRecords / limit) : 0
    this.next_page = this.current_page < this.total_pages ? this.current_page + 1 : undefined
    this.previous_page =
      this.current_page > 1 && this.current_page - 1 < this.total_pages ? this.current_page - 1 : undefined
  }
}
