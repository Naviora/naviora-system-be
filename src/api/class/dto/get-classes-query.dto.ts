import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { EnumFieldOptional, StringFieldOptional } from '@decorators/field.decorators'
import { ClassType } from '@common/enums/class-types.enum'

export class GetClassesQueryDto extends PageOptionsDto {
  @EnumFieldOptional(() => ClassType)
  readonly class_type?: ClassType

  @StringFieldOptional()
  readonly sort_by?: string
}
