import { ApiPropertyOptional } from '@nestjs/swagger'
import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { StringFieldOptional } from '@decorators/field.decorators'

export class GetModulesByClassQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Search by module name, code, or description' })
  @StringFieldOptional()
  readonly q?: string

  @ApiPropertyOptional({ description: 'Sort field: module_name, module_code, created_at, updated_at' })
  @StringFieldOptional()
  readonly sort_by?: string
}

