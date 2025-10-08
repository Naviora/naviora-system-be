import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ClassService } from './class.service'
import { CreateClassDto } from './dto/create-class.dto'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { Roles } from '@decorators/roles.decorator'
import { GetClassesQueryDto } from './dto/get-classes-query.dto'
import { OffsetPaginatedDto } from '@common/dto/offset-pagination/paginated.dto'
import { ClassDTO } from './dto/class-dto'
import { plainToInstance } from 'class-transformer'

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

  @ApiOperation({ summary: 'Get Classes', description: 'Get list of classes with pagination, search and filters' })
  @ApiBearerAuth()
  @Get()
  @ResponseMessage('Get Classes successfully')
  async getClasses(@Query() query: GetClassesQueryDto): Promise<OffsetPaginatedDto<ClassDTO>> {
    const { classes, meta } = await this.classService.getClasses(query)

    const mappedClasses = classes.map((c) =>
      plainToInstance(ClassDTO, {
        classId: c.classId,
        classCode: c.classCode,
        className: c.className,
        classType: c.classType,
        startDate: c.startDate,
        endDate: c.endDate,
        isActive: c.isActive
      })
    )

    return new OffsetPaginatedDto<ClassDTO>({
      statusCode: 200,
      message: 'Get Classes successfully',
      data: mappedClasses,
      meta
    })
  }
}
