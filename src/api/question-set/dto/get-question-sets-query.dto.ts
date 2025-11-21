import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsUUID, IsBoolean } from 'class-validator'
import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { StringFieldOptional } from '@decorators/field.decorators'
import { Transform } from 'class-transformer'

export class GetQuestionSetsQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by lecturer ID' })
  @IsOptional()
  @IsUUID()
  lecturerId?: string

  @ApiPropertyOptional({ description: 'Filter by isInUse status', type: Boolean })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  })
  isInUse?: boolean

  @StringFieldOptional()
  readonly sort_by?: string
}
