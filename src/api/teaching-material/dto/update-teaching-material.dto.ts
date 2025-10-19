import { PartialType } from '@nestjs/swagger'
import { CreateTeachingMaterialDto } from './create-teaching-material.dto'

export class UpdateTeachingMaterialDto extends PartialType(CreateTeachingMaterialDto) {}
