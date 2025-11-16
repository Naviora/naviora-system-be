import { Controller, Get, Delete, Param, UseGuards, Request, Patch, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse as SwaggerResponse } from '@nestjs/swagger'
import { NotificationService } from './notification.service'
import { AccessTokenGuard } from '@api/auth/passport/accessToken.guard'
import { ListNotificationReqDto } from './dto/list-notification.req.dto'
import { ApiResponse } from '@common/dto/api-response.dto'
import { OffsetPaginatedDto } from '@common/dto/offset-pagination/paginated.dto'
import { CreateNotifyResDto } from './dto/notifications-response.dto'

@ApiTags('Notifications')
@Controller({
  path: 'notifications',
  version: '1'
})
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('Authorization')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications for current user with pagination' })
  @SwaggerResponse({
    status: 200,
    description: 'Return list of notifications with pagination metadata'
  })
  async findAll(
    @Request() req: any,
    @Query() reqDto: ListNotificationReqDto
  ): Promise<OffsetPaginatedDto<CreateNotifyResDto>> {
    const userId = req.user.id
    const { notifications, meta } = await this.notificationService.findAll(userId, reqDto)

    // Map NotificationSystem[] to CreateNotifyResDto[]
    const mappedNotifications = notifications.map((notification) => {
      const dto = new CreateNotifyResDto()
      dto.id = notification.id
      dto.type = notification.type
      dto.body = notification.body
      dto.status = notification.status
      dto.createdAt = notification.createdAt
      return dto
    })

    return new OffsetPaginatedDto<CreateNotifyResDto>({
      statusCode: 200,
      message: 'Lấy danh sách thông báo thành công',
      data: mappedNotifications,
      meta
    })
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Read notification' })
  @SwaggerResponse({ status: 200, description: 'Notification deleted successfully' })
  async update(@Param('id') id: string): Promise<ApiResponse<void>> {
    await this.notificationService.update(id)
    return new ApiResponse<void>().setCode(200).setMessage('Thay đổi thành công')
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification' })
  @SwaggerResponse({ status: 200, description: 'Notification deleted successfully' })
  async remove(@Param('id') id: string): Promise<ApiResponse<void>> {
    await this.notificationService.remove(id)
    return new ApiResponse<void>().setCode(200).setMessage('Xóa thông báo thành công')
  }
}
