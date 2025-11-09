import { ApiPropertyOptional } from '@nestjs/swagger'
import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { StringFieldOptional } from '@decorators/field.decorators'

export class GetStudentsByClassQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Search by student name or email' })
  @StringFieldOptional()
  readonly q?: string

  @ApiPropertyOptional({ description: 'Sort field: name, email, enrolment_date' })
  @StringFieldOptional()
  readonly sort_by?: string
}

