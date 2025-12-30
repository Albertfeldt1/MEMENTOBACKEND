import { Injectable } from "@nestjs/common";
import { RemindersService } from "./reminders.service";
import { Cron } from "@nestjs/schedule";
import { NotificationsService } from "src/notification/notification.service";
import { Notification } from "src/notifications/entities/notification.entity";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserSchema, User } from "src/users/user.schema";
@Injectable()
export class RemindersScheduler {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly remindersService: RemindersService,
    private notificationsService: NotificationsService
  ) {}

  // @Cron("* * * * *")
  // async handleReminders() {
  //   while (true) {
  //     const r = await this.remindersService.getDueReminders();
  //     if (!r) break;

  //     const token = (r.userId as any)?.device_token;
  //     const userTimeZone = (r.userId as any)?.timezone;
  //     if (!token) {
  //       await this.remindersService.markAsSent(r._id.toString());
  //       continue;
  //     }

  //     await this.notificationsService.sendPushNotification(
  //       token,
  //       "Event Reminder",
  //       `${r.type.replace("_", " ")}: ${(r.eventId as any).title}`,
  //       { eventId: r.eventId._id.toString() }
  //     );

  //     await this.notificationModel.create({
  //       userId: new Types.ObjectId(r.userId),
  //       title: "Event Reminder",
  //       message: `${r.type.replace("_", " ")}: ${(r.eventId as any).title}`,
  //     });

  //     await this.remindersService.markAsSent(r._id.toString());
  //   }
  // }

  @Cron("* * * * *")
async handleReminders() {
  while (true) {
    const r = await this.remindersService.getDueReminders();
    if (!r) break;

    try {
      const token = (r.userId as any)?.device_token;

      if (!token) {
        await this.remindersService.markAsSent(r._id.toString(), false);
        continue;
      }

      await this.notificationsService.sendPushNotification(
        token,
        "Event Reminder",
        `${r.type.replace("_", " ")}: ${(r.eventId as any).title}`,
        { eventId: r.eventId._id.toString() }
      );

      await this.notificationModel.create({
        userId: new Types.ObjectId(r.userId),
        title: "Event Reminder",
        message: `${r.type.replace("_", " ")}: ${(r.eventId as any).title}`,
      });

      await this.remindersService.markAsSent(r._id.toString(), true);
    } catch (err) {
      // 🔁 Allow retry in next cron
      await this.remindersService.resetProcessing(r._id.toString());
      break;
    }
  }
}

}
