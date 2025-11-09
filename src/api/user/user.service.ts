import { BadRequestException, Inject, Injectable, Logger, UploadedFile } from '@nestjs/common'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { GetLecturersQueryDto } from './dto/get-lecturers-query.dto'
import { GetUsersQueryDto } from './dto/get-users-query.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'
import { convertToSeconds, hashString } from '@utils/auth.util'
import { ChangePasswordAuthDto, ForgotPasswordDTO } from '@api/auth/dto/change-password-auth'
import { compareString } from '@utils/auth.util'
import { AccountStatus, RoleInAccount } from '@common/enums/account-role.enum'
import { User } from '@api/user/entities/user.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { ConfigService } from '@nestjs/config'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { ProfileDTO } from './dto/profile-dto'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { getDefaultPublicIdAvatar, getPublicIdAvatar } from '@utils/common.util'
import { paginate } from '@utils/offset-pagination'
import { MailService } from '@mail/mail.service'
import { Role } from '@api/role/entities/role.entity'
import { CreateAccountByAdminDto } from './dto/create-account-by-admin.dto'
import { CreateAccountByAdminResponseDto } from './dto/create-account-by-admin.res.dto'
import { BulkCreateAccountByAdminDto } from './dto/bulk-create-account-by-admin.dto'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { QueueName, JobName } from '@constants/job.constant'
import { IAccountInfoJob } from '@common/interfaces/job.interface'
import * as ExcelJS from 'exceljs'
import { BulkCreateAccountsResponseDto, BulkCreateAccountResultDto } from './dto/bulk-create-accounts-response.dto'
import { StreakService } from '@api/streak/streak.service'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cloudinaryService: CloudinaryService,
    private readonly mailService: MailService,
    @InjectQueue(QueueName.EMAIL)
    private readonly emailQueue: Queue,
    private readonly streakService: StreakService
  ) {}

  isExist = async (email: string): Promise<boolean> => {
    const account = await this.findByEmail(email)
    return !!account
  }

  async create(createAccountDto: CreateAccountDto) {
    try {
      const { email, password } = createAccountDto

      if (await this.isExist(email)) {
        throw new ValidationException(ErrorCode.E003, 'Email already exists', [
          {
            property: 'email',
            code: ErrorCode.E003
          }
        ])
      }

      const hashPass = await hashString(password)

      const user = this.userRepository.create({ ...createAccountDto, password: hashPass })
      const newAccount = await this.userRepository.save(user)
      if (!newAccount) {
        throw new ValidationException(ErrorCode.A001)
      }

      // Load role relation to check if user is a student
      const accountWithRole = await this.userRepository.findOne({
        where: { id: newAccount.id },
        relations: ['role']
      })

      // Create streak for student accounts
      if (accountWithRole?.role?.name === RoleInAccount.Student) {
        try {
          await this.streakService.updateStreak(newAccount.id)
        } catch (error) {
          // Log error but don't fail user creation
          this.logger.error(`Failed to create streak for student ${newAccount.id}:`, error)
        }
      }

      return accountWithRole || newAccount
    } catch (error) {
      throw error
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      if (!email) {
        throw new ValidationException(ErrorCode.E003, 'Email already exists', [
          {
            property: 'email',
            code: 'user.validation.email_already_exists',
            message: 'The email is already registered in the system.'
          }
        ])
      }
      const response = await this.userRepository.findOne({
        where: { email },
        relations: ['role']
      })
      return response
    } catch (error) {
      throw error
    }
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    try {
      const hashRefreshToken = await hashString(refreshToken)
      const ttl = convertToSeconds(this.configService.get<string>('REFRESH_EXPIRES_IN'))
      await this.cacheManager.set(`RT:${id}`, hashRefreshToken, ttl * 1000)
    } catch (error) {
      throw error
    }
  }

  async findById(id: string) {
    try {
      const response = await this.userRepository.findOne({ where: { id }, relations: ['role'] })
      return response
    } catch (error) {
      throw error
    }
  }

  async getAll(queryDto: GetUsersQueryDto) {
    const query = this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.role', 'role')

    // Apply search query if provided (search in name, email, username, phone)
    if (queryDto.q) {
      query.andWhere(
        '(user.name ILIKE :search OR user.email ILIKE :search OR user.username ILIKE :search OR user.phone ILIKE :search)',
        { search: `%${queryDto.q}%` }
      )
    }

    // Apply role filter
    if (queryDto.role) {
      query.andWhere('role.name = :roleName', { roleName: queryDto.role })
    }

    // Apply gender filter
    if (queryDto.gender) {
      query.andWhere('user.gender = :gender', { gender: queryDto.gender })
    }

    // Apply status filter
    if (queryDto.status) {
      query.andWhere('user.status = :status', { status: queryDto.status })
    }

    // Apply sorting
    const sortBy = queryDto.sortBy || 'createdAt'
    const validSortFields = ['name', 'email', 'createdAt', 'updatedAt', 'dateOfBirth']
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt'
    query.orderBy(`user.${sortField}`, queryDto.order)

    const [users, metaDto] = await paginate(query, queryDto, {
      skipCount: false,
      takeAll: false
    })

    return {
      users,
      pagination: metaDto
    }
  }

  async getLecturers(queryDto: GetLecturersQueryDto) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('role.name = :roleName', { roleName: RoleInAccount.Lecturer })

    // Apply search query if provided (search in name, email, username, phone)
    if (queryDto.q) {
      query.andWhere(
        '(user.name ILIKE :search OR user.email ILIKE :search OR user.username ILIKE :search OR user.phone ILIKE :search)',
        { search: `%${queryDto.q}%` }
      )
    }

    // Apply gender filter
    if (queryDto.gender) {
      query.andWhere('user.gender = :gender', { gender: queryDto.gender })
    }

    // Apply status filter
    if (queryDto.status) {
      query.andWhere('user.status = :status', { status: queryDto.status })
    }

    // Apply sorting
    const sortBy = queryDto.sortBy || 'createdAt'
    const validSortFields = ['name', 'email', 'createdAt', 'updatedAt', 'dateOfBirth']
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt'
    query.orderBy(`user.${sortField}`, queryDto.order)

    const [lecturers, metaDto] = await paginate(query, queryDto, {
      skipCount: false,
      takeAll: false
    })

    return {
      lecturers,
      meta: metaDto
    }
  }

  async getProfile(idUser: string): Promise<ProfileDTO> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: idUser },
        relations: ['role']
      })

      if (!user) {
        throw new ValidationException(ErrorCode.E002)
      }

      return plainToInstance(ProfileDTO, {
        account_id: user.id,
        name: user.name,
        email: user.email,
        staff_id: user.id, // Assuming staff_id maps to the same as account_id
        avatar: user.avatar,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        date_of_birth: user.dateOfBirth,
        status: user.status,
        department: '', // Add default values for missing fields
        rank: '',
        role: user.role?.name,
        salary: 0
      })
    } catch (error) {
      throw error
    }
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    const account = await this.findById(id)
    if (!account) {
      throw new ValidationException(ErrorCode.E002)
    }

    // Check unique phone
    if (updateProfileDto.phone && account.phone !== updateProfileDto.phone) {
      const accountPhone = await this.userRepository.findOne({
        where: { phone: updateProfileDto.phone }
      })

      if (accountPhone) {
        throw new ValidationException(ErrorCode.E009, 'Phone number already exists', [
          {
            property: 'phone',
            code: ErrorCode.E009
          }
        ])
      }
    }

    await this.userRepository.update(id, updateProfileDto)
  }

  async uploadAvatar(id: string, @UploadedFile() file: Express.Multer.File) {
    try {
      const account = await this.findById(id)
      if (!account) {
        throw new ValidationException(ErrorCode.E002)
      }

      // Delete old avatar
      const oldAvatar = account.avatar
      if (oldAvatar) {
        const publicId = getPublicIdAvatar(oldAvatar)
        const defaultPublicId = getDefaultPublicIdAvatar()

        // If the first update, do not delete the default avatar
        if (publicId !== defaultPublicId) {
          await this.cloudinaryService.deleteFile(publicId)
        }
      }

      const response = await this.cloudinaryService.uploadFile(file)
      if (!response || !response.url) {
        throw new ValidationException(ErrorCode.A003)
      }

      account.avatar = response.url
      await this.userRepository.save(account)
    } catch (error) {
      throw error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} account`
  }

  async changePassword(id: string, data: ChangePasswordAuthDto) {
    try {
      const user = await this.findById(id)
      if (!user) {
        throw new ValidationException(ErrorCode.E002)
      }

      const isMatch = await compareString(data.currentPassword, user.password)
      if (!isMatch) {
        throw new ValidationException(ErrorCode.E006)
      }

      if (data.confirmPassword !== data.newPassword) {
        throw new BadRequestException('New password and confirm password do not match')
      }

      const newPassword = await hashString(data.newPassword)
      user.password = newPassword
      await this.userRepository.save(user)
    } catch (error) {
      throw error
    }
  }

  async createOtp(id: string, otp: string, expired_otp: Date) {
    try {
      const ttl = Math.floor((expired_otp.getTime() - Date.now()) / 1000)
      await this.cacheManager.set(`otp:${id}`, otp, ttl * 1000)
    } catch (error) {
      throw error
    }
  }

  async activeAccount(id: string) {
    try {
      const response = await this.userRepository.update(id, { status: AccountStatus.Active })
      if (response.affected === 0) {
        throw new ValidationException(ErrorCode.A002)
      }
      return response
    } catch (error) {
      throw error
    }
  }

  async forgotPassword(payload: ForgotPasswordDTO) {
    try {
      const { id, newPassword } = payload
      const hashPass = await hashString(newPassword)
      const response = await this.userRepository.update(id, { password: hashPass })
      if (response.affected === 0) {
        throw new ValidationException(ErrorCode.A002)
      }
      if (response.affected === 1) {
        const account = await this.findById(id)
        if (account.status === AccountStatus.Unactive) {
          await this.activeAccount(id)
        }
      }
    } catch (error) {
      throw error
    }
  }

  async createAccountByAdmin(createAccountDto: CreateAccountByAdminDto) {
    const { email, name, role_id, password } = createAccountDto
    try {
      if (await this.isExist(email)) {
        throw new ValidationException(ErrorCode.E003, 'Email already exists')
      }

      // Validate role if provided
      let role: Role | null = null
      if (role_id) {
        role = await this.roleRepository.findOne({ where: { id: role_id } })
        if (!role) {
          throw new ValidationException(ErrorCode.E002, 'Role not found', [
            {
              property: 'role_id',
              code: ErrorCode.E002
            }
          ])
        }

        // Ensure role is below Admin level (Admin cannot be assigned)
        if (role.name === RoleInAccount.Admin) {
          throw new ValidationException(ErrorCode.A001, 'Cannot create account with Admin role', [
            {
              property: 'role_id',
              code: ErrorCode.A001,
              message: 'Admin role cannot be assigned through this endpoint'
            }
          ])
        }
      }

      // Hash password for storage
      const hashPass = await hashString(password)

      // Create user
      const user = this.userRepository.create({
        name,
        email,
        password: hashPass,
        role: role || null,
        status: AccountStatus.Active
      })

      const newAccount = await this.userRepository.save(user)
      if (!newAccount) {
        throw new ValidationException(ErrorCode.A001)
      }

      // Load role relation for response
      const accountWithRole = await this.userRepository.findOne({
        where: { id: newAccount.id },
        relations: ['role']
      })

      // Create streak for student accounts
      if (accountWithRole?.role?.name === RoleInAccount.Student) {
        try {
          await this.streakService.updateStreak(newAccount.id)
        } catch (error) {
          // Log error but don't fail user creation
          this.logger.error(`Failed to create streak for student ${newAccount.id}:`, error)
        }
      }

      // Send email with account info (email and plain password)
      // === Can be move to background job ===
      try {
        await this.mailService.sendAccountInfo(email, {
          name,
          email,
          password
        })
        this.logger.log(`Account info email sent successfully to ${email}`)
      } catch (mailError) {
        this.logger.error(`Failed to send account info email to ${email}:`, mailError)
        // Don't throw - account is already created, email failure is non-critical
      }

      return plainToInstance(CreateAccountByAdminResponseDto, accountWithRole || newAccount, {
        excludeExtraneousValues: true
      })
    } catch (error) {
      throw error
    }
  }

  async bulkCreateAccountByAdmin(bulkCreateDto: BulkCreateAccountByAdminDto) {
    const { accounts } = bulkCreateDto
    const results: {
      success: CreateAccountByAdminResponseDto[]
      failed: Array<{ account: CreateAccountByAdminDto; error: string }>
    } = {
      success: [],
      failed: []
    }

    // Process accounts sequentially to avoid race conditions
    for (const accountDto of accounts) {
      try {
        const { email, name, role_id, password } = accountDto

        // Check if email already exists
        if (await this.isExist(email)) {
          results.failed.push({
            account: accountDto,
            error: 'Email already exists'
          })
          continue
        }

        // Validate role if provided
        let role: Role | null = null
        if (role_id) {
          role = await this.roleRepository.findOne({ where: { id: role_id } })
          if (!role) {
            results.failed.push({
              account: accountDto,
              error: 'Role not found'
            })
            continue
          }

          // Ensure role is below Admin level
          if (role.name === RoleInAccount.Admin) {
            results.failed.push({
              account: accountDto,
              error: 'Cannot create account with Admin role'
            })
            continue
          }
        }

        // Hash password for storage
        const hashPass = await hashString(password)

        // Create user
        const user = this.userRepository.create({
          name,
          email,
          password: hashPass,
          role: role || null,
          // ==== Temporary active account for first create
          status: AccountStatus.Active
        })

        const newAccount = await this.userRepository.save(user)
        if (!newAccount) {
          results.failed.push({
            account: accountDto,
            error: 'Failed to create account'
          })
          continue
        }

        // Load role relation for response
        const accountWithRole = await this.userRepository.findOne({
          where: { id: newAccount.id },
          relations: ['role']
        })

        // Create streak for student accounts
        if (accountWithRole?.role?.name === RoleInAccount.Student) {
          try {
            await this.streakService.updateStreak(newAccount.id)
          } catch (error) {
            // Log error but don't fail user creation
            this.logger.error(`Failed to create streak for student ${newAccount.id}:`, error)
          }
        }

        // Add email job to background queue
        try {
          await this.emailQueue.add(
            JobName.ACCOUNT_INFO,
            {
              email,
              name,
              password
            } as IAccountInfoJob,
            {
              attempts: 3,
              backoff: {
                type: 'exponential',
                delay: 2000
              }
            }
          )
          this.logger.log(`Account info email job queued for ${email}`)
        } catch (queueError) {
          this.logger.error(`Failed to queue email job for ${email}:`, queueError)
          // Don't fail the account creation if queue fails
        }

        const responseDto = plainToInstance(CreateAccountByAdminResponseDto, accountWithRole || newAccount, {
          excludeExtraneousValues: true
        })

        results.success.push(responseDto)
      } catch (error) {
        this.logger.error(`Error creating account for ${accountDto.email}:`, error)
        results.failed.push({
          account: accountDto,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return results
  }

  // async bulkCreateAccountsFromExcel(file: Express.Multer.File): Promise<BulkCreateAccountsResponseDto> {
  //   try {
  //     const workbook = new ExcelJS.Workbook()
  //     // Convert Multer buffer to Node.js Buffer for ExcelJS compatibility
  //     const buffer = Buffer.from(new Uint8Array(file.buffer))
  //     // TypeScript type incompatibility between Buffer types - safe to ignore at runtime
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     await workbook.xlsx.load(buffer)

  //     const worksheet = workbook.worksheets[0]
  //     if (!worksheet) {
  //       throw new ValidationException(ErrorCode.A001, 'Excel file is empty or invalid')
  //     }

  //     const results: BulkCreateAccountResultDto[] = []
  //     let successCount = 0
  //     let failureCount = 0

  //     // Skip header row (row 1) and process from row 2
  //     for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
  //       const row = worksheet.getRow(rowNumber)

  //       // Get values from columns (assuming: A=name, B=email, C=role)
  //       const name = row.getCell(1).value?.toString()?.trim()
  //       const email = row.getCell(2).value?.toString()?.trim()
  //       const roleName = row.getCell(3).value?.toString()?.trim()

  //       // Skip empty rows
  //       if (!name && !email && !roleName) {
  //         continue
  //       }

  //       // Validate required fields
  //       if (!name || !email || !roleName) {
  //         results.push({
  //           email: email || '',
  //           name: name || '',
  //           role: roleName || '',
  //           success: false,
  //           error: 'Missing required fields: name, email, or role'
  //         })
  //         failureCount++
  //         continue
  //       }

  //       // Validate email format
  //       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  //       if (!emailRegex.test(email)) {
  //         results.push({
  //           email,
  //           name,
  //           role: roleName,
  //           success: false,
  //           error: 'Invalid email format'
  //         })
  //         failureCount++
  //         continue
  //       }

  //       try {
  //         // Find role by name
  //         const role = await this.roleRepository.findOne({
  //           where: { name: roleName }
  //         })

  //         if (!role) {
  //           results.push({
  //             email,
  //             name,
  //             role: roleName,
  //             success: false,
  //             error: `Role "${roleName}" not found`
  //           })
  //           failureCount++
  //           continue
  //         }

  //         // Check if Admin role is being assigned
  //         if (role.name === RoleInAccount.Admin) {
  //           results.push({
  //             email,
  //             name,
  //             role: roleName,
  //             success: false,
  //             error: 'Cannot create account with Admin role'
  //           })
  //           failureCount++
  //           continue
  //         }

  //         // Check if email already exists
  //         if (await this.isExist(email)) {
  //           results.push({
  //             email,
  //             name,
  //             role: roleName,
  //             success: false,
  //             error: 'Email already exists'
  //           })
  //           failureCount++
  //           continue
  //         }

  //         // Create account
  //         const createAccountDto: CreateAccountByAdminDto = {
  //           name,
  //           email,
  //           role_id: role.id,
  //         }

  //         await this.createAccountByAdmin(createAccountDto)

  //         results.push({
  //           email,
  //           name,
  //           role: roleName,
  //           success: true
  //         })
  //         successCount++
  //       } catch (error) {
  //         this.logger.error(`Error creating account for ${email} at row ${rowNumber}:`, error)
  //         results.push({
  //           email,
  //           name,
  //           role: roleName,
  //           success: false,
  //           error: error instanceof ValidationException ? error.message : 'Failed to create account'
  //         })
  //         failureCount++
  //       }
  //     }

  //     return {
  //       total: results.length,
  //       successCount,
  //       failureCount,
  //       results
  //     }
  //   } catch (error) {
  //     this.logger.error('Error processing Excel file:', error)
  //     if (error instanceof ValidationException) {
  //       throw error
  //     }
  //     throw new ValidationException(ErrorCode.A001, 'Failed to process Excel file', [
  //       {
  //         property: 'file',
  //         code: ErrorCode.A001,
  //         message: error instanceof Error ? error.message : 'Unknown error occurred'
  //       }
  //     ])
  // }

  // }
}
