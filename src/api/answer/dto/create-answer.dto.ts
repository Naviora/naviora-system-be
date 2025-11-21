import { ApiProperty } from '@nestjs/swagger'
import { StringField, BooleanField } from '@decorators/field.decorators'
import { IsNotEmpty, IsBoolean } from 'class-validator'

export class CreateAnswerDto {
  @ApiProperty({
    description: 'Answer content',
    example: 'Paris'
  })
  @StringField()
  @IsNotEmpty({ message: 'Answer content is required' })
  content: string

  @ApiProperty({
    description: 'Whether this answer is correct',
    example: true
  })
  @BooleanField()
  @IsBoolean({ message: 'isCorrect must be a boolean value' })
  isCorrect: boolean
}
