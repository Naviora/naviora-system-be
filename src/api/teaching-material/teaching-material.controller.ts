import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { TeachingMaterialService } from './teaching-material.service'
import { CreateTeachingMaterialDto } from './dto/create-teaching-material.dto'
import { UpdateTeachingMaterialDto } from './dto/update-teaching-material.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from '@guards/roles.guard'
import { Roles } from '@decorators/roles.decorator'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { TeachingMaterialResDto } from '@api/teaching-material/dto/teaching-material.res.dto'
@Controller({
  path: 'teaching-material',
  version: '1'
})
@ApiTags('Teaching Material')
@ApiBearerAuth('Authorization')
@UseGuards(RolesGuard)
@Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
export class TeachingMaterialController {
  constructor(private readonly teachingMaterialService: TeachingMaterialService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new teaching material' })
  @ApiBody({
    description: 'Data create teaching material',
    type: CreateTeachingMaterialDto,
    examples: {
      example1: {
        summary: 'Create a new teaching material',
        value: {
          lesson_id: '123e4567-e89b-12d3-a456-426614174000',
          material_id: '123e4567-e89b-12d3-a456-426614174000',
          content: 'This is the content of the teaching material'
        }
      }
    }
  })
  @ResponseMessage('Teaching material created successfully')
  async create(@Body() createTeachingMaterialDto: CreateTeachingMaterialDto): Promise<TeachingMaterialResDto> {
    return await this.teachingMaterialService.create(createTeachingMaterialDto)
  }

  @Get()
  findAll() {
    return this.teachingMaterialService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachingMaterialService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeachingMaterialDto: UpdateTeachingMaterialDto) {
    return this.teachingMaterialService.update(+id, updateTeachingMaterialDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachingMaterialService.remove(+id)
  }
}
