import { Module } from '@nestjs/common'
import { Class } from './entities/class.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClassController } from './class.controller'
import { ClassService } from './class.service'
import { CloudinaryModule } from '@cloudinary/cloudinary.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from '@api/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Class]), CloudinaryModule, JwtModule, AuthModule],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService]
})
export class ClassModule {}
