import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationsServices } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

class DeleteNotificationsDto {
  ids: string[];
}

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsServices) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Patch('mark-read')
  async markAsRead(
    @Body()
    body: {
      userId: string;
      notificationId?: string;
      notificationIds?: string[];
    },
  ) {
    return this.notificationsService.markAsRead(
      body.userId,
      body.notificationId,
      body.notificationIds,
    );
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.notificationsService.findAll(userId);
  }
  @Get('admin/all')
  getAllForAdmin(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.notificationsService.getAllForAdmin(
      Number(page),
      Number(limit),
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }
  
  @Delete('delete-many')
  async deleteManyDelete(@Body() dto: DeleteNotificationsDto) {
    return this.notificationsService.deleteManyForUser(dto.ids);
  }
}
