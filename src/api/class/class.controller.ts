import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Body, Controller, Get, Post, Query, UseGuards, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger'
import { ClassService } from './class.service'
import { CreateClassDto } from './dto/create-class.dto'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { Roles } from '@decorators/roles.decorator'
import { GetClassesQueryDto } from './dto/get-classes-query.dto'
import { OffsetPaginatedDto } from '@common/dto/offset-pagination/paginated.dto'
import { ClassDTO } from './dto/class.dto'
import { plainToInstance } from 'class-transformer'
import { AssignLecturersDto } from './dto/assign-lecturers.dto'
import { ClassDetailDTO } from './dto/class-detail.dto'

@ApiTags('Classes')
@Controller({
  path: 'classes',
  version: '1'
})
@ApiBearerAuth('Authorization')
@Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
@UseGuards(AccessTokenGuard, RolesGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new class' })
  @ApiBody({
    description: 'Data create class',
    type: CreateClassDto,
    examples: {
      example1: {
        summary: 'Create a new class',
        value: {
          class_code: 'BIO-25-001',
          class_name: 'Biology Class 1',
          class_type: 'city',
          start_date: '2025-01-01',
          end_date: '2025-01-01'
        }
      }
    }
  })
  @ResponseMessage('Class created successfully')
  async create(@Body() createClassDto: CreateClassDto) {
    const created = await this.classService.create(createClassDto)
    return {
      class_id: created.classId,
      class_code: created.classCode,
      class_name: created.className,
      class_type: created.classType,
      start_date: created.startDate,
      end_date: created.endDate,
      is_active: created.isActive,
      created_at: created.createdAt,
      updated_at: created.updatedAt
    }
  }

  @ApiOperation({ summary: 'Get Classes', description: 'Get list of classes with pagination, search and filters' })
  @ApiBearerAuth()
  @Get()
  @ResponseMessage('Get Classes successfully')
  async getClasses(@Query() query: GetClassesQueryDto): Promise<OffsetPaginatedDto<ClassDTO>> {
    const { classes, meta } = await this.classService.getClasses(query)

    const mappedClasses = classes.map((c) =>
      plainToInstance(ClassDTO, {
        class_id: c.classId,
        class_code: c.classCode,
        class_name: c.className,
        class_type: c.classType,
        start_date: c.startDate,
        end_date: c.endDate,
        is_active: c.isActive,
        created_at: c.createdAt,
        updated_at: c.updatedAt
      })
    )

    return new OffsetPaginatedDto<ClassDTO>({
      statusCode: 200,
      message: 'Get Classes successfully',
      data: mappedClasses,
      meta
    })
  }

  @Get(':classId')
  @ApiOperation({ summary: 'Get Class Detail', description: 'Get detailed information about a specific class' })
  @ApiParam({
    name: 'classId',
    description: 'The ID of the class',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ResponseMessage('Get Class detail successfully')
  async getClassById(@Param('classId', new ParseUUIDPipe({ version: '4' })) classId: string): Promise<ClassDetailDTO> {
    return await this.classService.getClassById(classId)
  }

  @Post(':classId/assign-lecturers')
  @ApiOperation({ summary: 'Assign lecturers to a class' })
  @ApiParam({
    name: 'classId',
    description: 'The ID of the class',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiBody({
    description: 'List of lecturer IDs to assign',
    type: AssignLecturersDto,
    examples: {
      example1: {
        summary: 'Assign lecturers to class',
        value: {
          lecturer_ids: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001']
        }
      }
    }
  })
  @ResponseMessage('Lecturers assigned to class successfully')
  async assignLecturers(
    @Param('classId', new ParseUUIDPipe({ version: '4' })) classId: string,
    @Body() assignLecturersDto: AssignLecturersDto
  ) {
    return await this.classService.assignLecturers(classId, assignLecturersDto)
  }
}
