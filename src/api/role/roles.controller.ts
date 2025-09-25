import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { Public } from 'src/decorators/auth.decorator'
import { RoleInGroup } from '@common/enums/account-role.enum'

@ApiTags('roles')
@Controller({
  path: 'roles',
  version: '1'
})
@ApiBearerAuth('Authorization')
@UseGuards(AccessTokenGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'user role', description: 'create user role' })
  @ApiBody({
    description: 'account role',
    type: CreateRoleDto,
    examples: {
      example1: {
        summary: 'account role',
        value: {
          name: RoleInGroup.Admin,
          description: 'Leader of group'
        }
      }
    }
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto)
  }

  @Public()
  @Get()
  findAll() {
    return this.rolesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id)
  }
}
