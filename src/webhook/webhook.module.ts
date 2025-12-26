import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookController } from './webhook.controller';
import { NotificationsModule } from "src/notification/notification.module";
import { WebhookService } from './webhook.service';
import { User, UserSchema } from 'src/users/user.schema';
import { Notification, NotificationSchema } from 'src/notifications/entities/notification.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
    NotificationsModule
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
