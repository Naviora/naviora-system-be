import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { StringFieldOptional, UUIDFieldOptional } from '@decorators/field.decorators'

export class GetModulesQueryDto extends PageOptionsDto {
  @StringFieldOptional()
  readonly sort_by?: string

  @UUIDFieldOptional({ description: 'Filter modules by class ID' })
  readonly class_id?: string
}
