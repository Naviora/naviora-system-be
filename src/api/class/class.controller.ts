import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Body, Controller, Get, Post, Patch, Query, UseGuards, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger'
import { ClassService } from './class.service'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { Roles } from '@decorators/roles.decorator'
import { GetClassesQueryDto } from './dto/get-classes-query.dto'
import { AssignLecturersDto } from './dto/assign-lecturers-to-class.dto'
import { ClassDetailDTO } from './dto/class-detail.dto'
import { ArrangeStudentsDto, ClassArrangementResultDto } from './dto/arrange-students.dto'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'

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
  async getClasses(@Query() query: GetClassesQueryDto) {
    return await this.classService.getClasses(query)
  }

  @Get('my-classes')
  @Roles(RoleInAccount.Lecturer)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOperation({
    summary: 'Get my assigned classes',
    description: 'Get list of classes assigned to the current lecturer with pagination, search and filters'
  })
  @ResponseMessage('Get my assigned classes successfully')
  async getMyClasses(@Query() query: GetClassesQueryDto, @CurrentUser() currentUser: User) {
    return await this.classService.getClassesForLecturer(currentUser.id, query)
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

  @Patch(':classId')
  @ApiOperation({ summary: 'Update a class' })
  @ApiParam({
    name: 'classId',
    description: 'The ID of the class to update',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiBody({
    description: 'Data to update class',
    type: UpdateClassDto,
    examples: {
      example1: {
        summary: 'Update class information',
        value: {
          class_name: 'Updated Biology Class 1',
          class_type: 'national',
          end_date: '2025-12-31',
          is_active: true
        }
      }
    }
  })
  @ResponseMessage('Class updated successfully')
  async update(
    @Param('classId', new ParseUUIDPipe({ version: '4' })) classId: string,
    @Body() updateClassDto: UpdateClassDto
  ) {
    return await this.classService.update(classId, updateClassDto)
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

  @Post('arrange-students')
  @ApiOperation({ summary: 'Arrange students into classes based on entry test scores' })
  @ApiBody({
    description: 'Entry test ID and class distribution mapping',
    type: ArrangeStudentsDto,
    examples: {
      example1: {
        summary: 'Arrange students by score ranges',
        value: {
          entryTestId: '123e4567-e89b-12d3-a456-426614174000',
          classDistribution: [
            {
              range: '0-5',
              classId: '550e8400-e29b-41d4-a716-446655440000'
            },
            {
              range: '5-7',
              classId: '550e8400-e29b-41d4-a716-446655440001'
            },
            {
              range: '7-10',
              classId: '550e8400-e29b-41d4-a716-446655440002'
            }
          ]
        }
      }
    }
  })
  @ResponseMessage('Students arranged into classes successfully')
  async arrangeStudents(@Body() arrangeStudentsDto: ArrangeStudentsDto): Promise<ClassArrangementResultDto> {
    return await this.classService.arrangeStudents(arrangeStudentsDto)
  }
}
