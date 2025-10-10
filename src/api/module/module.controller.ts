import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Body, Controller, Post, Patch, UseGuards, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger'
import { ModulesService } from './module.service'
import { CreateModuleDto } from './dto/create-module.dto'
import { UpdateModuleDto } from './dto/update-module.dto'
import { ResponseMessage } from '@decorators/response-message.decorator'

@ApiTags('Modules')
@Controller({
  path: 'modules',
  version: '1'
})
@ApiBearerAuth('Authorization')
@UseGuards(AccessTokenGuard, RolesGuard)
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new module' })
  @ApiBody({
    description: 'Data create module',
    type: CreateModuleDto,
    examples: {
      example1: {
        summary: 'Create a new module',
        value: {
          module_code: 'CD1',
          module_name: 'Cơ bản về cơ thể người',
          module_description: 'Module 1 description'
        }
      }
    }
  })
  @ResponseMessage('Module created successfully')
  async create(@Body() createModuleDto: CreateModuleDto) {
    return await this.modulesService.create(createModuleDto)
  }

  @Patch(':moduleId')
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
}
