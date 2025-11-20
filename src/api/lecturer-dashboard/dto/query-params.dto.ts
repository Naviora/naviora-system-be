import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsEnum, IsInt, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class LecturerClassesQueryDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1

  @ApiPropertyOptional({ description: 'Items per page', default: 20, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: ['active', 'completed', 'all'],
    default: 'active'
  })
  @IsOptional()
  @IsEnum(['active', 'completed', 'all'])
  status?: 'active' | 'completed' | 'all' = 'active'

  @ApiPropertyOptional({
    description: 'Sort by field',
    enum: ['updated_at', 'created_at', 'class_name'],
    default: 'updated_at'
  })
  @IsOptional()
  @IsEnum(['updated_at', 'created_at', 'class_name'])
  sort_by?: 'updated_at' | 'created_at' | 'class_name' = 'updated_at'

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    default: 'DESC'
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'DESC'
}

export class LecturerModulesQueryDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1

  @ApiPropertyOptional({ description: 'Items per page', default: 20, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20

  @ApiPropertyOptional({
    description: 'Semester filter',
    enum: ['current', 'all'],
    default: 'current'
  })
  @IsOptional()
  @IsEnum(['current', 'all'])
  semester?: 'current' | 'all' | string = 'current'

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: ['draft', 'published', 'completed', 'all'],
    default: 'all'
  })
  @IsOptional()
  @IsEnum(['draft', 'published', 'completed', 'all'])
  status?: 'draft' | 'published' | 'completed' | 'all' = 'all'

  @ApiPropertyOptional({
    description: 'Sort by field',
    enum: ['updated_at', 'created_at', 'module_name'],
    default: 'updated_at'
  })
  @IsOptional()
  @IsEnum(['updated_at', 'created_at', 'module_name'])
  sort_by?: 'updated_at' | 'created_at' | 'module_name' = 'updated_at'

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    default: 'DESC'
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'DESC'
}

export class UpcomingActivitiesQueryDto {
  @ApiPropertyOptional({ description: 'Number of days ahead', default: 7, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  days?: number = 7

  @ApiPropertyOptional({
    description: 'Filter by activity types',
    enum: ['assignment_due', 'exam_schedule', 'class_session', 'all'],
    default: 'all'
  })
  @IsOptional()
  @IsEnum(['assignment_due', 'exam_schedule', 'class_session', 'all'])
  activity_types?: 'assignment_due' | 'exam_schedule' | 'class_session' | 'all' = 'all'
}
