import { Module } from '@nestjs/common';
import { NotificationsServices } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import {
  Notification,
  NotificationSchema,
} from 'src/notifications/entities/notification.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    NotificationsModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsServices],
  exports: [NotificationsServices],
})
export class NotificationsModules {}
