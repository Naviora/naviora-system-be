import { Controller, Get, UseGuards, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { StreakService } from './streak.service'
import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Roles } from '@decorators/roles.decorator'
import { RoleInAccount } from '@common/enums/account-role.enum'
import { ResponseMessage } from '@decorators/response-message.decorator'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@api/user/entities/user.entity'
import { StreakResponseDto } from './dto/streak-response.dto'
import { Public } from '@decorators/auth.decorator'

@ApiTags('Streaks')
@Controller({
  path: 'streaks',
  version: '1'
})
@ApiBearerAuth('Authorization')
@UseGuards(AccessTokenGuard)
// @Public()
export class StreakController {
  constructor(private readonly streakService: StreakService) {}

  @Get('me')
  // @Roles(RoleInAccount.Student)
  @ApiOperation({
    summary: 'Get my streak',
    description: 'Get the current streak information for the authenticated student'
  })
  @ResponseMessage('Lấy chuỗi ngày học thành công')
  async getMyStreak(@CurrentUser() currentUser: User): Promise<StreakResponseDto> {
    return await this.streakService.getMyStreak(currentUser)
  }

  @Get('student/:studentId')
  // @Roles(RoleInAccount.Admin, RoleInAccount.Principal, RoleInAccount.Lecturer)
  @ApiOperation({
    summary: 'Get streak by student ID',
    description: 'Get streak information for a specific student. Available for Admin, Principal, and Lecturer roles.'
  })
  @ApiParam({
    name: 'studentId',
    description: 'The ID of the student',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ResponseMessage('Lấy chuỗi ngày học thành công')
  async getStreakByStudentId(
    @Param('studentId', new ParseUUIDPipe({ version: '4' })) studentId: string
  ): Promise<StreakResponseDto> {
    return await this.streakService.getStreakByStudentId(studentId)
  }
}
