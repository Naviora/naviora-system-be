import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ClassService } from './class.service'
import { CreateClassDto } from './dto/create-class.dto'
import { ResponseMessage } from '@decorators/response-message.decorator'

@ApiTags('Classes')
@Controller({
  path: 'classes',
  version: '1'
})
@ApiBearerAuth('Authorization')
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
}
