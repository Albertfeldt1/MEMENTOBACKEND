import { Injectable } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { Cron } from '@nestjs/schedule';
import { User } from 'src/users/user.schema';
import { Notification } from 'src/notifications/entities/notification.entity';
@Injectable()
export class RemindersScheduler {
  constructor(private readonly remindersService: RemindersService) {}

  @Cron('* * * * *')
  async handleReminders() {
    const reminders = await this.remindersService.getDueReminders();
    console.log("=======>>>>>>>>>>>reminders",reminders)
    for (const r of reminders) {
      // 🔔 send push here
      console.log(`Sending ${r.type} reminder for ${(r.eventId as any).title}`);
      await this.remindersService.markAsSent(r._id.toString());
    }
  }
}
