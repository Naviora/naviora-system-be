import { Inject, Injectable } from '@nestjs/common'
import { ModuleEntity } from './entities/module.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { CloudinaryService } from '@cloudinary/cloudinary.service'
import { CreateModuleDto } from './dto/create-module.dto'
import { ValidationException } from '@exceptions/validation.exception'
import { ErrorCode } from '@constants/error-code.constant'
import { Cache } from 'cache-manager'

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    try {
      const { moduleCode } = createModuleDto
      const existingModule = await this.moduleRepository.findOne({ where: { moduleCode } })
      if (existingModule) {
        throw new ValidationException(ErrorCode.MODULE001, 'Module code already exists', [
          {
            property: 'moduleCode',
            code: ErrorCode.MODULE001
          }
        ])
      }
      const moduleEntity = await this.moduleRepository.create(createModuleDto)
      const newModule = await this.moduleRepository.save(moduleEntity)
      if (!newModule) {
        throw new ValidationException(ErrorCode.MODULE002)
      }
      return newModule
    } catch (error) {
      throw error
    }
  }
}
