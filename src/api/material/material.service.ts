import { Injectable } from '@nestjs/common'
import { CreateMaterialDto } from './dto/create-material.dto'
import { UpdateMaterialDto } from './dto/update-material.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { MaterialEntity } from '@api/material/entities/material.entity'
import { Repository } from 'typeorm'
import { CreateMaterialResDto } from '@api/material/dto/create-material.res.dto'
import { plainToInstance } from 'class-transformer'
import { ModuleEntity } from '@api/module/entities/module.entity'

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>,
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>
  ) {}
  async create(createMaterialDto: CreateMaterialDto & { lecturer_id: string }): Promise<CreateMaterialResDto> {
    const material = this.materialRepository.create({
      materialName: createMaterialDto.material_name,
      materialType: createMaterialDto.material_type,
      materialPath: createMaterialDto.material_path,
      lecturerId: createMaterialDto.lecturer_id
    })
    const savedMaterial = await this.materialRepository.save(material)
    return plainToInstance(CreateMaterialResDto, savedMaterial)
  }

  findAll() {
    return `This action returns all material`
  }

  findOne(id: number) {
    return `This action returns a #${id} material`
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return `This action updates a #${id} material`
  }

  remove(id: number) {
    return `This action removes a #${id} material`
  }
}
