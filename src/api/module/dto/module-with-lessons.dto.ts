import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsUUID, IsDate, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class LessonDTO {
  @ApiProperty({
    description: 'The unique identifier of the lesson',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  lesson_id: string

  @ApiProperty({
    description: 'The name of the lesson',
    example: 'Introduction to Anatomy'
  })
  @IsString()
  @IsNotEmpty()
  lesson_name: string

  @ApiProperty({
    description: 'The description of the lesson',
    example: 'This lesson covers the basic concepts of human anatomy'
  })
  @IsString()
  @IsNotEmpty()
  lesson_description: string

  @ApiProperty({
    description: 'The creation date of the lesson',
    example: '2024-01-15T10:30:00Z'
  })
  @IsDate()
  @Type(() => Date)
  created_at: Date

  @ApiProperty({
    description: 'The last update date of the lesson',
    example: '2024-01-15T10:30:00Z'
  })
  @IsDate()
  @Type(() => Date)
  updated_at: Date
}

export class ModuleWithLessonsDTO {
  @ApiProperty({
    description: 'The unique identifier of the module',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  module_id: string

  @ApiProperty({
    description: 'The code of the module',
    example: 'CD1'
  })
  @IsString()
  @IsNotEmpty()
  module_code: string

  @ApiProperty({
    description: 'The name of the module',
    example: 'Cơ bản về cơ thể người'
  })
  @IsString()
  @IsNotEmpty()
  module_name: string

  @ApiProperty({
    description: 'The description of the module',
    example: 'Module 1 description'
  })
  @IsString()
  module_description: string

  @ApiProperty({
    description: 'The banner image URL of the module',
    example: 'https://res.cloudinary.com/example/image/upload/v1234567890/banner.jpg'
  })
  @IsString()
  banner: string

  @ApiProperty({
    description: 'The creation date of the module',
    example: '2024-01-15T10:30:00Z'
  })
  @IsDate()
  @Type(() => Date)
  created_at: Date

  @ApiProperty({
    description: 'The last update date of the module',
    example: '2024-01-15T10:30:00Z'
  })
  @IsDate()
  @Type(() => Date)
  updated_at: Date

  @ApiProperty({
    description: 'List of lessons in this module',
    type: [LessonDTO]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LessonDTO)
  lessons: LessonDTO[]
}
