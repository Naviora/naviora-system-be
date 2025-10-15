import { RolesGuard } from '@guards/roles.guard'
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Query,
  UseGuards,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags, ApiParam, ApiConsumes } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { ModulesService } from './module.service'
import { CreateModuleDto } from './dto/create-module.dto'
import { UpdateModuleDto } from './dto/update-module.dto'
import { GetModulesQueryDto } from './dto/get-modules-query.dto'
import { AssignLecturersToModuleDto } from './dto/assign-lecturers-to-module.dto'
import { ModuleDTO } from './dto/module.dto'
import { ModuleWithLessonsDTO } from './dto/module-with-lessons.dto'
import { OffsetPaginatedDto } from '@common/dto/offset-pagination/paginated.dto'
import { plainToInstance } from 'class-transformer'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { Roles } from '@decorators/roles.decorator'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'

@ApiTags('Modules')
@Controller({
  path: 'modules',
  version: '1'
})
@ApiBearerAuth('Authorization')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('banner'))
  @ApiOperation({ summary: 'Create a new module' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Data create module with optional banner image',
    schema: {
      type: 'object',
      properties: {
        module_code: {
          type: 'string',
          description: 'The code of the module',
          example: 'CD1'
        },
        module_name: {
          type: 'string',
          description: 'The name of the module',
          example: 'Cơ bản về cơ thể người'
        },
        module_description: {
          type: 'string',
          description: 'The description of the module',
          example: 'Module 1 description'
        },
        banner: {
          type: 'string',
          format: 'binary',
          description: 'Banner image file for the module'
        },
        class_id: {
          type: 'string',
          description: 'The ID of the class',
          example: '550e8400-e29b-41d4-a716-446655440000'
        }
      },
      required: ['module_code', 'module_name']
    }
  })
  @ResponseMessage('Module created successfully')
  async create(@Body() createModuleDto: CreateModuleDto, @UploadedFile() banner?: Express.Multer.File) {
    return await this.modulesService.create(createModuleDto, banner)
  }

  @ApiOperation({ summary: 'Get Modules', description: 'Get list of modules with pagination, search and filters' })
  @Get()
  @ResponseMessage('Get Modules successfully')
  async getModules(@Query() query: GetModulesQueryDto): Promise<OffsetPaginatedDto<ModuleDTO>> {
    const { modules, meta } = await this.modulesService.getModules(query)

    const mappedModules = modules.map((m) =>
      plainToInstance(ModuleDTO, {
        module_id: m.moduleId,
        module_code: m.moduleCode,
        module_name: m.moduleName,
        module_description: m.moduleDescription,
        banner: m.banner,
        created_at: m.createdAt,
        updated_at: m.updatedAt
      })
    )

    return new OffsetPaginatedDto<ModuleDTO>({
      statusCode: 200,
      message: 'Get Modules successfully',
      data: mappedModules,
      meta
    })
  }

  @Get(':moduleId')
  @ApiOperation({ summary: 'Get a module detail' })
  @ApiParam({
    name: 'moduleId',
    description: 'The ID of the module to get detail',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ResponseMessage('Get Module Detail successfully')
  async getModuleDetail(
    @Param('moduleId', new ParseUUIDPipe({ version: '4' })) moduleId: string,
    @CurrentUser() currentUser: User
  ) {
    return await this.modulesService.getModuleById(moduleId, currentUser)
  }

  @Get(':moduleId/lessons')
  @ApiOperation({
    summary: 'Get module with lessons',
    description: 'Get module details with all corresponding lessons'
  })
  @ApiParam({
    name: 'moduleId',
    description: 'The ID of the module to get lessons',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ResponseMessage('Get Module with Lessons successfully')
  async getModuleWithLessons(
    @Param('moduleId', new ParseUUIDPipe({ version: '4' })) moduleId: string
  ): Promise<ModuleWithLessonsDTO> {
    const moduleWithLessons = await this.modulesService.getModuleWithLessons(moduleId)
    return plainToInstance(ModuleWithLessonsDTO, moduleWithLessons)
  }

  @Patch(':moduleId')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update a module' })
  @ApiParam({
    name: 'moduleId',
    description: 'The ID of the module to update',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiBody({
    description: 'Data to update module',
    type: UpdateModuleDto,
    examples: {
      example1: {
        summary: 'Update module information',
        value: {
          module_name: 'Updated Module Name',
          module_description: 'Updated description'
        }
      }
    }
  })
  @ResponseMessage('Module updated successfully')
  async update(
    @Param('moduleId', new ParseUUIDPipe({ version: '4' })) moduleId: string,
    @Body() updateModuleDto: UpdateModuleDto
  ) {
    return await this.modulesService.update(moduleId, updateModuleDto)
  }

  @Post(':moduleId/assign-lecturers')
  @Roles(RoleInAccount.Admin, RoleInAccount.Principal)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Assign lecturers to a module' })
  @ApiParam({
    name: 'moduleId',
    description: 'The ID of the module to assign lecturers to',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiBody({
    description: 'List of lecturer IDs to assign to the module',
    type: AssignLecturersToModuleDto,
    examples: {
      example1: {
        summary: 'Assign lecturers to module',
        value: {
          lecturer_ids: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
          end_date: '2024-12-31'
        }
      }
    }
  })
  @ResponseMessage('Lecturers assigned to module successfully')
  async assignLecturersToModule(
    @Param('moduleId', new ParseUUIDPipe({ version: '4' })) moduleId: string,
    @Body() assignLecturersDto: AssignLecturersToModuleDto
  ) {
    return await this.modulesService.assignLecturersToModule(moduleId, assignLecturersDto)
  }
}
