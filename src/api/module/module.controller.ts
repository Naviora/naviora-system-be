import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ModulesService } from './module.service'
import { CreateModuleDto } from './dto/create-module.dto'
import { ApiResponse as ApiResponseSuccess } from '@common/dto/api-response.dto'

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
          moduleCode: 'CD1',
          moduleName: 'Cơ bản về cơ thể người',
          moduleDescription: 'Module 1 description'
        }
      }
    }
  })
  create(@Body() createModuleDto: CreateModuleDto) {
    const newModule = this.modulesService.create(createModuleDto)
    return new ApiResponseSuccess()
      .setCode(201)
      .setMessage('Module created successfully')
      .setData(newModule)
      .setMessage('Created successfully')
  }
}
