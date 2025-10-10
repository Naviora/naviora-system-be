import { ClassType } from '@common/enums/class-types.enum'
import { ApiProperty } from '@nestjs/swagger'

export class ClassDTO {
  @ApiProperty()
  class_id: string
  @ApiProperty()
  class_code: string
  @ApiProperty()
  class_name: string
  @ApiProperty({ enum: ClassType })
  class_type: ClassType
  @ApiProperty()
  start_date: Date
  @ApiProperty()
  end_date: Date
  @ApiProperty()
  is_active: boolean
  @ApiProperty()
  created_at: Date
  @ApiProperty()
  updated_at: Date
}
