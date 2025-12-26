import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventService } from "./event.service";
import { JwtModule } from "@nestjs/jwt";

import { RemindersModule } from "src/reminders/reminders.module";

import { EventController } from "./event.controller";
import { Event, EventSchema } from "./entities/event.entity";
import { NotificationsModule } from "src/notification/notification.module";
import { User, UserSchema } from "src/users/user.schema";
import { Notification, NotificationSchema } from 'src/notifications/entities/notification.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),

    JwtModule.register({
      secret: "your-secret-key",
      signOptions: { expiresIn: "360d" },
    }),
    NotificationsModule,
    RemindersModule,
  ],

  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
