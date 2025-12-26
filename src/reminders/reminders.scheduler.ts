import { Injectable } from "@nestjs/common";
import { RemindersService } from "./reminders.service";
import { Cron } from "@nestjs/schedule";
import { NotificationsService } from "src/notification/notification.service";
import { Notification } from "src/notifications/entities/notification.entity";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
@Injectable()
export class RemindersScheduler {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    private readonly remindersService: RemindersService,
    private notificationsService: NotificationsService,
  ) {}

  // @Cron("* * * * *")
  // async handleReminders() {
  //   const reminders = await this.remindersService.getDueReminders();
  //   for (const r of reminders) {
  //     const token = (r.userId as any)?.device_token;
  //     if (!token) continue;
  //     console.log(`Sending ${r.type} reminder for ${(r.eventId as any).title}`);

  //     await this.notificationsService.sendPushNotification(
  //       token,
  //       "Event Reminder",
  //       `${r.type.replace("_", " ")}: ${(r.eventId as any).title}`,
  //       { eventId: r.eventId._id.toString() }
  //     );
  //     await this.notificationModel.create({userId:new Types.ObjectId(r.userId),title:'Event Reminder', message:`${r.type.replace("_", " ")}: ${(r.eventId as any).title}`})
  //     await this.remindersService.markAsSent(r._id.toString());
  //   }
  // }
  @Cron('* * * * *')
async handleReminders() {
  while (true) {
    const r = await this.remindersService.getDueReminders();
    if (!r) break;

    const token = (r.userId as any)?.device_token;
    if (!token) {
      await this.remindersService.markAsSent(r._id.toString());
      continue;
    }

    await this.notificationsService.sendPushNotification(
      token,
      'Event Reminder',
      `${r.type.replace('_', ' ')}: ${(r.eventId as any).title}`,
      { eventId: r.eventId._id.toString() },
    );

    await this.notificationModel.create({
      userId: r.userId,
      title: 'Event Reminder',
      message: `${r.type.replace('_', ' ')}: ${(r.eventId as any).title}`,
    });

    await this.remindersService.markAsSent(r._id.toString());
  }
}

}
