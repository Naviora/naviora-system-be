import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ApiResponse } from '@common/dto/api-response.dto'
import { Role } from '@api/role/entities/role.entity'
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<ApiResponse<Role>> {
    const existingRole = await this.roleRepo.findOne({ where: { name: createRoleDto.name } })

    if (existingRole) {
      return new ApiResponse<Role>('Role name is already existed', undefined, 400)
    }
    const role = this.roleRepo.create(createRoleDto)
    const savedRole = await this.roleRepo.save(role)
    return new ApiResponse<Role>('Role created successfully', savedRole, 201)
  }

  async findAll(): Promise<ApiResponse<Role[]>> {
    const roles = await this.roleRepo.find()

    return new ApiResponse<Role[]>('Roles fetched successfully', roles, 200)
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { id } })
    if (!role) throw new NotFoundException(`Role with ID ${id} not found`)
    return role
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id)
    Object.assign(role, updateRoleDto)
    return await this.roleRepo.save(role)
  }

  async remove(id: number): Promise<ApiResponse<void>> {
    const role = await this.findOne(id)
    await this.roleRepo.remove(role)
    return new ApiResponse<void>('Role deleted successfully', undefined, 200)
  }
}
