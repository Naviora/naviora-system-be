import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  ParseUUIDPipe
} from '@nestjs/common'
import { MaterialService } from './material.service'
import { MaterialUploadService } from './material-upload.service'
import { CreateMaterialDto } from './dto/create-material.dto'
import { CurrentUser } from '@decorators/current-user.decorator'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags, ApiConsumes, ApiParam } from '@nestjs/swagger'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { RolesGuard } from '@guards/roles.guard'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { Roles } from '@decorators/roles.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { User } from '@api/user/entities/user.entity'
import { MaterialType } from '@common/enums/material.enum'
@Controller({
  path: 'materials',
  version: '1'
})
@ApiTags('Material')
@ApiBearerAuth('Authorization')
@UseGuards(RolesGuard)
@Roles(RoleInAccount.Admin, RoleInAccount.Lecturer, RoleInAccount.Principal)
export class MaterialController {
  constructor(
    private readonly materialService: MaterialService,
    private readonly materialUploadService: MaterialUploadService
  ) {}

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
  async create(@Body() createMaterialDto: CreateMaterialDto, @CurrentUser() currentUser: User) {
    return await this.materialService.create({ ...createMaterialDto, lecturer_id: currentUser.id })
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload file and create material' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file and create material',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload'
        },
        material_name: {
          type: 'string',
          description: 'Name of the material',
          example: 'Lecture Video 1'
        },
        material_type: {
          type: 'string',
          enum: Object.values(MaterialType),
          description: 'Type of the material',
          example: MaterialType.VIDEO
        }
      },
      required: ['file', 'material_name', 'material_type']
    }
  })
  @ResponseMessage('File uploaded and material created successfully')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('material_name') materialName: string,
    @Body('material_type') materialType: MaterialType,
    @CurrentUser() currentUser: User
  ) {
    return await this.materialUploadService.uploadAndCreateMaterial(file, {
      material_name: materialName,
      material_type: materialType,
      lecturer_id: currentUser.id
    })
  }

  @Post('upload-to-folder')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload file to specific folder and create material' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file to specific folder and create material',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload'
        },
        material_name: {
          type: 'string',
          description: 'Name of the material',
          example: 'Lecture Video 1'
        },
        material_type: {
          type: 'string',
          enum: Object.values(MaterialType),
          description: 'Type of the material',
          example: MaterialType.VIDEO
        },
        folder: {
          type: 'string',
          description: 'Cloudinary folder name',
          example: 'lecture-materials',
          default: 'materials'
        }
      },
      required: ['file', 'material_name', 'material_type']
    }
  })
  @ResponseMessage('File uploaded to folder and material created successfully')
  async uploadFileToFolder(
    @UploadedFile() file: Express.Multer.File,
    @Body('material_name') materialName: string,
    @Body('material_type') materialType: MaterialType,
    @Body('folder') folder: string = 'materials',
    @CurrentUser() currentUser: User
  ) {
    return await this.materialUploadService.uploadAndCreateMaterialWithCustomFolder(
      file,
      {
        material_name: materialName,
        material_type: materialType,
        lecturer_id: currentUser.id
      },
      folder
    )
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete material and its file from Cloudinary' })
  @ApiParam({
    name: 'id',
    description: 'Material ID to delete',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ResponseMessage('Material and file deleted successfully')
  async deleteMaterial(@Param('id', new ParseUUIDPipe({ version: '4' })) materialId: string) {
    return await this.materialUploadService.deleteMaterialAndFile(materialId)
  }
}
