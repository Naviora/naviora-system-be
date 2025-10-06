import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Query
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { GetLecturersQueryDto } from './dto/get-lecturers-query.dto'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { ApiResponse as ApiResponseSuccess } from '@common/dto/api-response.dto'
import { OffsetPaginatedDto } from '@common/dto/offset-pagination/paginated.dto'
import { RolesGuard } from '@guards/roles.guard'
// import { Roles } from '@decorators/roles.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
// import { RoleInAccount } from '@common/enums/account-role.enum'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { Public } from '@decorators/auth.decorator'
import { plainToInstance } from 'class-transformer'
import { ProfileDTO } from './dto/profile-dto'

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1'
})
@ApiBearerAuth('Authorization')
@UseGuards(AccessTokenGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @Roles(RoleInAccount.Admin, RoleInAccount.User)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'Data create user',
    type: CreateAccountDto,
    examples: {
      example1: {
        summary: 'Create a new user',
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'P@ssw0rd123'
        }
      }
    }
  })
  @Public()
  async create(@Body() createAccountDto: CreateAccountDto) {
    const account = await this.userService.create(createAccountDto)
    return new ApiResponseSuccess().setCode(201).setData(account).setMessage('Create successfully.')
  }

  @Get()
  @ResponseMessage('Get all accounts successfully')
  async getAll() {
    const data = await this.userService.getAll()
    return data
  }

  @ApiOperation({ summary: 'Get Lecturers', description: 'Get list of lecturers with pagination, search and filters' })
  @ApiBearerAuth()
  @Get('lecturers')
  @ResponseMessage('Get Lecturers successfully')
  async getLecturers(@Query() query: GetLecturersQueryDto): Promise<OffsetPaginatedDto<ProfileDTO>> {
    const { lecturers, meta } = await this.userService.getLecturers(query)

    const mappedLecturers = lecturers.map((lecturer) =>
      plainToInstance(ProfileDTO, {
        accountId: lecturer.id,
        name: lecturer.name,
        email: lecturer.email,
        avatar: lecturer.avatar,
        phone: lecturer.phone,
        address: lecturer.address,
        gender: lecturer.gender,
        dateOfBirth: lecturer.dateOfBirth,
        status: lecturer.status,
        role: lecturer.role?.name
      })
    )

    return new OffsetPaginatedDto<ProfileDTO>({
      statusCode: 200,
      message: 'Get Lecturers successfully',
      data: mappedLecturers,
      meta
    })
  }

  @ApiOperation({ summary: 'Get user profile', description: 'Retrieve profile information of the authenticated user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully', type: ApiResponseSuccess })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('profile')
  async getProfile(@Req() req: unknown) {
    const idUser = (req as any).user.id
    const data = await this.userService.getProfile(idUser)
    return new ApiResponseSuccess().setCode(200).setMessage('Get profile successfully').setData(data)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const data = await this.userService.findById(id)
    return new ApiResponseSuccess().setCode(200).setMessage('Get account by id successfully').setData(data)
  }

  @Patch('/profile')
  @ApiOperation({ summary: ' Update my profile' })
  @ApiBody({
    description: 'Data create account',
    type: CreateAccountDto,
    examples: {
      example1: {
        summary: 'Update profile',
        value: {
          name: 'Trinh Quoc Thang',
          phone: '0123456789',
          address: 'HCM',
          dateOfBirth: '1999-01-01',
          gender: 'other'
        }
      }
    }
  })
  async update(@Req() req: any, @Body() updateProfileDto: UpdateProfileDto) {
    const id = req.user.id
    await this.userService.updateProfile(id, updateProfileDto)
    return new ApiResponseSuccess().setCode(200).setMessage('Update profile successfully')
  }

  @Patch('/upload-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload avatar' })
  @ApiBody({
    description: 'Upload avatar',
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    const id = req.user.id
    await this.userService.uploadAvatar(id, file)
    return new ApiResponseSuccess().setCode(200).setMessage('Upload avatar successfully')
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
