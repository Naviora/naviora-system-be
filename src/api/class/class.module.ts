import { Module } from '@nestjs/common'
import { Class } from './entities/class.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClassController } from './class.controller'
import { ClassService } from './class.service'
import { CloudinaryModule } from '@cloudinary/cloudinary.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from '@api/auth/auth.module'
import { TeachingAssignment } from './entities/teaching-assignment.entity'
import { User } from '@api/user/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Class, TeachingAssignment, User]), CloudinaryModule, JwtModule, AuthModule],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService]
})
export class ClassModule {}
