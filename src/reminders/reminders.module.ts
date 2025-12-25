import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from 'src/notification/notification.module';
import { EventReminder, EventReminderSchema } from 'src/event/entities/event-reminder.schema';
import { EventSchema } from 'src/event/entities/event.entity';
import { RemindersScheduler } from './reminders.scheduler';
import { User, UserSchema } from 'src/users/user.schema';
import { Notification, NotificationSchema } from 'src/notifications/entities/notification.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventReminder.name, schema: EventReminderSchema },
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
    NotificationsModule
  ],
  providers: [RemindersService, RemindersScheduler],
  exports: [RemindersService]
})
export class RemindersModule {}
