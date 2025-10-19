import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MaterialService } from './material.service'
import { CreateMaterialDto } from './dto/create-material.dto'
import { UpdateMaterialDto } from './dto/update-material.dto'
import { JwtPayloadType } from '@api/auth/types/jwt-payload.type'
import { CurrentUser } from '@decorators/current-user.decorator'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { MaterialType } from '@api/material/entities/material.entity'
@Controller('material')
@ApiTags('Material')
@ApiBearerAuth('Authorization')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new material' })
  @ApiBody({
    description: 'Data create material',
    type: CreateMaterialDto,
    examples: {
      example1: {
        summary: 'Create a new material',
        value: {
          material_name: 'Material 1',
          material_type: MaterialType.IMAGE,
          material_path: 'https://example.com/material.pdf'
        }
      }
    }
  })
  @ResponseMessage('Material created successfully')
  async create(@Body() createMaterialDto: CreateMaterialDto, @CurrentUser() currentUser: JwtPayloadType) {
    return await this.materialService.create({ ...createMaterialDto, lecturerId: currentUser.id })
  }

  @Get()
  findAll() {
    return this.materialService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialService.update(+id, updateMaterialDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id)
  }
}
