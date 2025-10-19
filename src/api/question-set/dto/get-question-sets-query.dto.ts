import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsUUID } from 'class-validator'
import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { StringFieldOptional } from '@decorators/field.decorators'

export class GetQuestionSetsQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by lecturer ID' })
  @IsOptional()
  @IsUUID()
  lecturerId?: string

  @StringFieldOptional()
  readonly sort_by?: string
}
