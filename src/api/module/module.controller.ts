import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ModulesService } from './module.service'
import { CreateModuleDto } from './dto/create-module.dto'
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
          moduleCode: 'CD1',
          moduleName: 'Cơ bản về cơ thể người',
          moduleDescription: 'Module 1 description'
        }
      }
    }
  })
  @ResponseMessage('Module created successfully')
  async create(@Body() createModuleDto: CreateModuleDto) {
    return await this.modulesService.create(createModuleDto)
  }
}
