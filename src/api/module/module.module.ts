import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CloudinaryModule } from '@cloudinary/cloudinary.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from '@api/auth/auth.module'
import { ModuleEntity } from './entities/module.entity'
import { ModulesService } from './module.service'
import { ModulesController } from './module.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity]), CloudinaryModule, JwtModule, AuthModule],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService]
})
export class ModulesModule {}
