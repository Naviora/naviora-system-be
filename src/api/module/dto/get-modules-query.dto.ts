import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { StringFieldOptional } from '@decorators/field.decorators'

export class GetModulesQueryDto extends PageOptionsDto {
  @StringFieldOptional()
  readonly sort_by?: string
}
