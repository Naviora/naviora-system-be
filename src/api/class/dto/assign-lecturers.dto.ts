import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID, IsArray, ArrayMinSize } from 'class-validator'

export class AssignLecturersDto {
  @ApiProperty({
    description: 'Array of lecturer IDs to assign to the class',
    example: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
    type: [String]
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one lecturer must be provided' })
  @IsUUID('4', { each: true, message: 'Each lecturer ID must be a valid UUID' })
  lecturerIds: string[]
}
