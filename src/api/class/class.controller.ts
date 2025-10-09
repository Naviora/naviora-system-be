import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Body, Controller, Post, Patch, UseGuards, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger'
import { ClassService } from './class.service'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { Roles } from '@decorators/roles.decorator'
import { AssignLecturersDto } from './dto/assign-lecturers.dto'

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
          classCode: 'BIO-25-001',
          className: 'Biology Class 1',
          classType: 'city',
          startDate: '2025-01-01',
          endDate: '2025-01-01'
        }
      }
    }
  })
  @ResponseMessage('Class created successfully')
  async create(@Body() createClassDto: CreateClassDto) {
    return await this.classService.create(createClassDto)
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
          className: 'Updated Biology Class 1',
          classType: 'national',
          endDate: '2025-12-31',
          isActive: true
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
          lecturerIds: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001']
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
