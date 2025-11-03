import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsUUID } from 'class-validator'
import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto'
import { StringFieldOptional } from '@decorators/field.decorators'
import { ExamStatus } from '@common/enums/exam-status.enum'

export class GetFinalExamsQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by status' })
  @IsOptional()
  @IsString()
  status?: ExamStatus

  @ApiPropertyOptional({ description: 'Filter by creator ID' })
  @IsOptional()
  @IsUUID()
  createdBy?: string

  @StringFieldOptional()
  readonly sort_by?: string
}
