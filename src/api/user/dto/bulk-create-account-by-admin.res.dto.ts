import { ApiProperty } from '@nestjs/swagger'
import { CreateAccountByAdminResponseDto } from './create-account-by-admin.res.dto'
import { CreateAccountByAdminDto } from './create-account-by-admin.dto'

export class BulkCreateAccountByAdminResponseDto {
  @ApiProperty({
    description: 'Successfully created accounts',
    type: [CreateAccountByAdminResponseDto]
  })
  success: CreateAccountByAdminResponseDto[]

  @ApiProperty({
    description: 'Failed account creations with error messages',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        account: {
          type: 'object',
          $ref: '#/components/schemas/CreateAccountByAdminDto'
        },
        error: {
          type: 'string',
          example: 'Email already exists'
        }
      }
    }
  })
  failed: Array<{
    account: CreateAccountByAdminDto
    error: string
  }>
}
