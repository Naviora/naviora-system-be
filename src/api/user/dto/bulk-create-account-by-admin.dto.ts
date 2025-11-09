import { ApiProperty } from '@nestjs/swagger'
import { IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateAccountByAdminDto } from './create-account-by-admin.dto'

export class BulkCreateAccountByAdminDto {
  @ApiProperty({
    description: 'Array of accounts to create',
    type: [CreateAccountByAdminDto],
    example: [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role_id: 2,
        password: 'Password@123'
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role_id: 3,
        password: 'Password@456'
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAccountByAdminDto)
  accounts: CreateAccountByAdminDto[]
}
