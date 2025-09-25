import { UserContextService } from '@api/user-context/user-context.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [UserContextService],
  exports: [UserContextService]
})
export class UserContextModule {}
