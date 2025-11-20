import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsEnum, IsInt, Min, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class PrincipalDashboardStatisticsQueryDto {
  @ApiPropertyOptional({
    description: 'Period for statistics',
    enum: ['today', 'week', 'month', 'semester'],
    default: 'today'
  })
  @IsOptional()
  @IsEnum(['today', 'week', 'month', 'semester'])
  period?: 'today' | 'week' | 'month' | 'semester' = 'today'
}

export class PrincipalClassesQueryDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1

  @ApiPropertyOptional({ description: 'Items per page', default: 50, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 50

  @ApiPropertyOptional({ description: 'Search term', required: false })
  @IsOptional()
  @IsString()
  search?: string

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: ['active', 'inactive', 'all'],
    default: 'all'
  })
  @IsOptional()
  @IsEnum(['active', 'inactive', 'all'])
  status?: 'active' | 'inactive' | 'all' = 'all'

  @ApiPropertyOptional({ description: 'Class type', required: false })
  @IsOptional()
  @IsString()
  class_type?: string

  @ApiPropertyOptional({
    description: 'Sort by field',
    enum: ['updated_at', 'created_at', 'class_name', 'student_count'],
    default: 'updated_at'
  })
  @IsOptional()
  @IsEnum(['updated_at', 'created_at', 'class_name', 'student_count'])
  sort_by?: 'updated_at' | 'created_at' | 'class_name' | 'student_count' = 'updated_at'

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    default: 'DESC'
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'DESC'
}

export class PrincipalModulesQueryDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1

  @ApiPropertyOptional({ description: 'Items per page', default: 50, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 50

  @ApiPropertyOptional({ description: 'Search term', required: false })
  @IsOptional()
  @IsString()
  search?: string

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
    enum: ['updated_at', 'created_at', 'module_name', 'class_count'],
    default: 'updated_at'
  })
  @IsOptional()
  @IsEnum(['updated_at', 'created_at', 'module_name', 'class_count'])
  sort_by?: 'updated_at' | 'created_at' | 'module_name' | 'class_count' = 'updated_at'

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    default: 'DESC'
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'DESC'
}

export class PerformanceMetricsQueryDto {
  @ApiPropertyOptional({
    description: 'Period for performance metrics',
    enum: ['today', 'week', 'month', 'semester'],
    default: 'month'
  })
  @IsOptional()
  @IsEnum(['today', 'week', 'month', 'semester'])
  period?: 'today' | 'week' | 'month' | 'semester' = 'month'
}
