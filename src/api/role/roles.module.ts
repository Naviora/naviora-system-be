import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from '@api/role/entities/role.entity'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from '@api/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Role]), JwtModule, AuthModule],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
