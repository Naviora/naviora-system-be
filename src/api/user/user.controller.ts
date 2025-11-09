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
  Query,
  BadRequestException
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { CreateAccountByAdminDto } from './dto/create-account-by-admin.dto'
import { CreateAccountByAdminResponseDto } from './dto/create-account-by-admin.res.dto'
import { BulkCreateAccountByAdminDto } from './dto/bulk-create-account-by-admin.dto'
import { BulkCreateAccountByAdminResponseDto } from './dto/bulk-create-account-by-admin.res.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { GetLecturersQueryDto } from './dto/get-lecturers-query.dto'
import { GetUsersQueryDto } from './dto/get-users-query.dto'
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
import { BulkCreateAccountsResponseDto } from './dto/bulk-create-accounts-response.dto'

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
  @ApiOperation({ summary: 'Get Users', description: 'Get list of users with pagination, search and filters' })
  @ResponseMessage('Get all users successfully')
  async getAll(@Query() query: GetUsersQueryDto) {
    return await this.userService.getAll(query)
  }

  @ApiOperation({ summary: 'Get Lecturers', description: 'Get list of lecturers with pagination, search and filters' })
  @ApiBearerAuth()
  @Get('lecturers')
  @ResponseMessage('Get Lecturers successfully')
  async getLecturers(@Query() query: GetLecturersQueryDto): Promise<OffsetPaginatedDto<ProfileDTO>> {
    const { lecturers, meta } = await this.userService.getLecturers(query)

    const mappedLecturers = lecturers.map((lecturer) =>
      plainToInstance(ProfileDTO, {
        account_id: lecturer.id,
        name: lecturer.name,
        email: lecturer.email,
        staff_id: lecturer.id, // Assuming staff_id maps to the same as account_id
        avatar: lecturer.avatar,
        phone: lecturer.phone,
        address: lecturer.address,
        gender: lecturer.gender,
        date_of_birth: lecturer.dateOfBirth,
        status: lecturer.status,
        department: '', // Add default values for missing fields
        rank: '',
        role: lecturer.role?.name,
        salary: 0
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

  @Post('admin/create')
  @ApiOperation({ summary: 'Admin: Create account and send credentials via email' })
  @ApiBody({
    description: 'Create account with role, password will be auto-generated and sent via email',
    type: CreateAccountByAdminDto,
    examples: {
      example1: {
        summary: 'Create account with role',
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          role_id: 2
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Account created successfully', type: CreateAccountByAdminResponseDto })
  @ResponseMessage('Account created successfully, credentials sent via email')
  async createAccountByAdmin(@Body() createAccountDto: CreateAccountByAdminDto) {
    return await this.userService.createAccountByAdmin(createAccountDto)
  }

  @Post('admin/bulk-create')
  @ApiOperation({
    summary: 'Admin: Bulk create accounts and send credentials via email (background job)'
  })
  @ApiBody({
    description:
      'Create multiple accounts with roles, passwords will be auto-generated and sent via email in background',
    type: BulkCreateAccountByAdminDto,
    examples: {
      example1: {
        summary: 'Bulk create accounts',
        value: {
          accounts: [
            {
              name: 'John Doe',
              email: 'john.doe@example.com',
              role_id: 2,
              password: 'Password@123'
            },
            {
              name: 'Jane Smith',
              email: 'jane.smith@example.com',
              role_id: 3,
              password: 'Password@456'
            }
          ]
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Bulk account creation completed',
    type: BulkCreateAccountByAdminResponseDto
  })
  @ResponseMessage('Bulk account creation completed, emails will be sent in background')
  async bulkCreateAccountByAdmin(@Body() bulkCreateDto: BulkCreateAccountByAdminDto) {
    return await this.userService.bulkCreateAccountByAdmin(bulkCreateDto)
  }

  // @Post('admin/import-excel')
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiConsumes('multipart/form-data')
  // @ApiOperation({
  //   summary: 'Admin: Bulk create user accounts from Excel file',
  //   description: `
  //     Upload an Excel file (.xlsx) to create multiple user accounts at once.

  //     **Excel File Format:**
  //     - The file must have a header row in the first row
  //     - Columns should be in this order: Name, Email, Role
  //     - Column A: Name (required) - User's full name
  //     - Column B: Email (required) - User's email address (must be unique and valid format)
  //     - Column C: Role (required) - Role name (e.g., "Student", "Lecturer", "Principal", "User")

  //     **Example Excel Structure:**
  //     | Name          | Email                  | Role     |
  //     |---------------|------------------------|----------|
  //     | John Doe      | john.doe@example.com   | Student  |
  //     | Jane Smith    | jane.smith@example.com | Lecturer |

  //     **Notes:**
  //     - Passwords will be auto-generated and sent to each user via email
  //     - Admin role cannot be assigned through this endpoint
  //     - Duplicate emails will be skipped with an error message
  //     - Invalid roles will be skipped with an error message
  //     - The response includes detailed results for each row processed
  //   `
  // })
  // @ApiBody({
  //   description: 'Excel file containing user accounts to create',
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //         description: 'Excel file (.xlsx) with columns: Name, Email, Role'
  //       }
  //     },
  //     required: ['file']
  //   }
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Bulk account creation completed. Returns summary and detailed results for each account.',
  //   type: BulkCreateAccountsResponseDto
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Bad request - Invalid file format or missing file'
  // })
  // @ApiResponse({
  //   status: 422,
  //   description: 'Validation error - Excel file structure is invalid'
  // })
  // @ResponseMessage('Bulk account creation completed')
  // async bulkCreateAccountsFromExcel(
  //   @UploadedFile() file: Express.Multer.File
  // ): Promise<ApiResponseSuccess<BulkCreateAccountsResponseDto>> {
  //   if (!file) {
  //     throw new BadRequestException('Excel file is required')
  //   }

  //   // Validate file type
  //   const allowedMimeTypes = [
  //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //     'application/vnd.ms-excel'
  //   ]
  //   if (!allowedMimeTypes.includes(file.mimetype)) {
  //     throw new BadRequestException('Invalid file type. Please upload an Excel file (.xlsx)')
  //   }

  //   const result = await this.userService.bulkCreateAccountsFromExcel(file)
  //   return new ApiResponseSuccess<BulkCreateAccountsResponseDto>()
  //     .setCode(200)
  //     .setData(result)
  //     .setMessage(`Bulk creation completed: ${result.successCount} succeeded, ${result.failureCount} failed`)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
