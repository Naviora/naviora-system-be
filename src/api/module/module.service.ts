import { Inject, Injectable } from '@nestjs/common'
import { ModuleEntity } from './entities/module.entity'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { CloudinaryService } from '@cloudinary/cloudinary.service'
import { CreateModuleDto } from './dto/create-module.dto'
import { UpdateModuleDto } from './dto/update-module.dto'
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
      const { module_code } = createModuleDto
      const existingModule = await this.moduleRepository.findOne({ where: { moduleCode: module_code } })
      if (existingModule) {
        throw new ValidationException(ErrorCode.MODULE001, 'Module code already exists', [
          {
            property: 'module_code',
            code: ErrorCode.MODULE001
          }
        ])
      }
      const moduleEntity = this.moduleRepository.create({
        moduleCode: createModuleDto.module_code,
        moduleName: createModuleDto.module_name,
        moduleDescription: createModuleDto.module_description
      })
      const newModule = await this.moduleRepository.save(moduleEntity)
      if (!newModule) {
        throw new ValidationException(ErrorCode.MODULE002)
      }
      return {
        module_id: newModule.moduleId,
        module_code: newModule.moduleCode,
        module_name: newModule.moduleName,
        module_description: newModule.moduleDescription,
        created_at: newModule.createdAt,
        updated_at: newModule.updatedAt
      }
    } catch (error) {
      throw error
    }
  }

  async update(moduleId: string, updateModuleDto: UpdateModuleDto) {
    try {
      // Check if module exists
      const moduleEntity = await this.moduleRepository.findOne({ where: { moduleId } })

      if (!moduleEntity) {
        throw new ValidationException(ErrorCode.MODULE003, 'Module not found', [
          {
            property: 'module_id',
            code: ErrorCode.MODULE003
          }
        ])
      }

      // Check if module code is being updated and if it conflicts
      if (updateModuleDto.module_code && updateModuleDto.module_code !== moduleEntity.moduleCode) {
        const existingModule = await this.moduleRepository.findOne({
          where: { moduleCode: updateModuleDto.module_code }
        })
        if (existingModule) {
          throw new ValidationException(ErrorCode.MODULE001, 'Module code already exists', [
            {
              property: 'module_code',
              code: ErrorCode.MODULE001
            }
          ])
        }
      }

      // Update the module with provided fields (map snake_case to entity fields)
      if (updateModuleDto.module_code !== undefined) moduleEntity.moduleCode = updateModuleDto.module_code
      if (updateModuleDto.module_name !== undefined) moduleEntity.moduleName = updateModuleDto.module_name
      if (updateModuleDto.module_description !== undefined)
        moduleEntity.moduleDescription = updateModuleDto.module_description

      const updatedModule = await this.moduleRepository.save(moduleEntity)

      if (!updatedModule) {
        throw new ValidationException(ErrorCode.MODULE002, 'Failed to update module')
      }

      return {
        module_id: updatedModule.moduleId,
        module_code: updatedModule.moduleCode,
        module_name: updatedModule.moduleName,
        module_description: updatedModule.moduleDescription,
        created_at: updatedModule.createdAt,
        updated_at: updatedModule.updatedAt
      }
    } catch (error) {
      throw error
    }
  }
}
