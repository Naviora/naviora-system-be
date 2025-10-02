import { Inject, Injectable } from '@nestjs/common'
import { Class } from './entities/class.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { CloudinaryService } from '@cloudinary/cloudinary.service'
import { CreateClassDto } from './dto/create-class.dto'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(createClassDto: CreateClassDto) {
    try {
      const { classCode } = createClassDto

      const existingClass = await this.classRepository.findOne({ where: { classCode } })

      if (existingClass) {
        throw new ValidationException(ErrorCode.CLASS001, 'Class code already exists', [
          {
            property: 'classCode',
            code: ErrorCode.CLASS001
          }
        ])
      }

      const classEntity = this.classRepository.create(createClassDto)

      const newClass = await this.classRepository.save(classEntity)
      if (!newClass) {
        throw new ValidationException(ErrorCode.CLASS002)
      }
      return newClass
    } catch (error) {
      throw error
    }
  }
}
