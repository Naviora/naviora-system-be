import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsEnum, IsInt, Min, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class StudentDashboardStatisticsQueryDto {
  @ApiPropertyOptional({
    description: 'Period for statistics',
    enum: ['month', 'semester', 'all'],
    default: 'month'
  })
  @IsOptional()
  @IsEnum(['month', 'semester', 'all'])
  period?: 'month' | 'semester' | 'all' = 'month'
}

export class LearningHoursQueryDto {
  @ApiPropertyOptional({ description: 'Number of days to retrieve', default: 16, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  days?: number = 16
}

export class StudentModulesQueryDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1

  @ApiPropertyOptional({ description: 'Items per page', default: 10, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: ['ongoing', 'completed', 'all'],
    default: 'all'
  })
  @IsOptional()
  @IsEnum(['ongoing', 'completed', 'all'])
  status?: 'ongoing' | 'completed' | 'all' = 'all'

  @ApiPropertyOptional({
    description: 'Sort by field',
    enum: ['updated_at', 'created_at', 'progress'],
    default: 'updated_at'
  })
  @IsOptional()
  @IsEnum(['updated_at', 'created_at', 'progress'])
  sort_by?: 'updated_at' | 'created_at' | 'progress' = 'updated_at'

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    default: 'DESC'
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'DESC'
}
