import { Injectable } from "@nestjs/common";
import { RemindersService } from "./reminders.service";
import { Cron } from "@nestjs/schedule";
import { NotificationsService } from "src/notification/notification.service";
@Injectable()
export class RemindersScheduler {
  constructor(
    private readonly remindersService: RemindersService,
    private notificationsService: NotificationsService
  ) {}

  @Cron("* * * * *")
  async handleReminders() {
    const reminders = await this.remindersService.getDueReminders();
    console.log("===>>>reminders",reminders)
    for (const r of reminders) {
      const token = (r.userId as any)?.device_token;
      if (!token) continue;
        console.log("====>>>>token",token)
      console.log(`Sending ${r.type} reminder for ${(r.eventId as any).title}`);

      await this.notificationsService.sendPushNotification(
        token,
        "Event Reminder",
        `${r.type.replace("_", " ")}: ${(r.eventId as any).title}`,
        { eventId: r.eventId._id.toString() }
      );
      
      await this.remindersService.markAsSent(r._id.toString());
    }
  }
}
