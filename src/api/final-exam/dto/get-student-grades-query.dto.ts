import { ApiPropertyOptional } from '@nestjs/swagger'
import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { EnumFieldOptional, StringFieldOptional } from '@decorators/field.decorators'
import { AttemptStatus } from '@common/enums/attempt-status.enum'

export class GetFinalExamStudentGradesQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Search by student name or email' })
  @StringFieldOptional()
  readonly q?: string

  @EnumFieldOptional(() => AttemptStatus)
  readonly attemptStatus?: AttemptStatus
}
