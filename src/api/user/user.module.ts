import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { User } from '@api/user/entities/user.entity'
import { CloudinaryModule } from '@cloudinary/cloudinary.module'
import { SessionEntity } from '@api/user/entities/session.entity'
import { AuthModule } from '@api/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([User, SessionEntity]), JwtModule, CloudinaryModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
