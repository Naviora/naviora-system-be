import { User } from '@api/user/entities/user.entity'
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { DataSource } from 'typeorm'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private dataSource: DataSource
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) return true
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) throw new ForbiddenException('You have not logged into this website!')

    const account = await this.dataSource.getRepository(User).findOne({
      where: { id: user.id },
      relations: ['role']
    })

    if (!account || !account.role || !requiredRoles.includes(account.role.name)) {
      throw new ForbiddenException('You do not have permission to do this!')
    }

    return true
  }
}
