import { ApiProperty } from '@nestjs/swagger'

export class BulkCreateAccountResultDto {
  @ApiProperty({ description: 'Email of the account', example: 'john.doe@example.com' })
  email: string

  @ApiProperty({ description: 'Name of the account', example: 'John Doe' })
  name: string

  @ApiProperty({ description: 'Role name', example: 'Student' })
  role: string

  @ApiProperty({ description: 'Whether the account was created successfully', example: true })
  success: boolean

  @ApiProperty({ description: 'Error message if creation failed', example: 'Email already exists', required: false })
  error?: string
}

export class BulkCreateAccountsResponseDto {
  @ApiProperty({ description: 'Total number of rows processed', example: 10 })
  total: number

  @ApiProperty({ description: 'Number of successfully created accounts', example: 8 })
  successCount: number

  @ApiProperty({ description: 'Number of failed account creations', example: 2 })
  failureCount: number

  @ApiProperty({ description: 'Detailed results for each account', type: [BulkCreateAccountResultDto] })
  results: BulkCreateAccountResultDto[]
}
