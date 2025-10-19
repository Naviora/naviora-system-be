import { Injectable } from '@nestjs/common'
import { CreateMaterialDto } from './dto/create-material.dto'
import { UpdateMaterialDto } from './dto/update-material.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { MaterialEntity } from '@api/material/entities/material.entity'
import { Repository } from 'typeorm'
import { CreateMaterialResDto } from '@api/material/dto/create-material.res.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>
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
}
