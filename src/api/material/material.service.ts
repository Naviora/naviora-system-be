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
  async create(createMaterialDto: CreateMaterialDto & { lecturerId: string }): Promise<CreateMaterialResDto> {
    const material = this.materialRepository.create(createMaterialDto)
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
