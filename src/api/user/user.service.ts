import { BadRequestException, Inject, Injectable, UploadedFile } from '@nestjs/common'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'
import { convertToSeconds, hashString } from '@utils/auth.util'
import { ChangePasswordAuthDto, ForgotPasswordDTO } from '@api/auth/dto/change-password-auth'
import { compareString } from '@utils/auth.util'
import { AccountStatus } from '@common/enums/account-role.enum'
import { User } from '@api/user/entities/user.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { ConfigService } from '@nestjs/config'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { ProfileDTO } from './dto/profile-dto'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { getDefaultPublicIdAvatar, getPublicIdAvatar } from '@utils/common.util'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cloudinaryService: CloudinaryService
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
      return newAccount
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

  async getAll() {
    const response = await this.userRepository.find({ relations: ['role'] })
    // response = plainToInstance(User, response)
    // const response = 'Get all accounts successfully'
    return response
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
        accountId: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        status: user.status,
        role: user.role?.name
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
}
