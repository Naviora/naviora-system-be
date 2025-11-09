import { ApiPropertyOptional } from '@nestjs/swagger'
import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { StringFieldOptional } from '@decorators/field.decorators'

export class GetFinalExamStudentGradesQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Search by student name or email' })
  @StringFieldOptional()
  readonly q?: string
}
