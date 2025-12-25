import { RemindersService } from "./reminders.service";
import { NotificationsService } from "src/notification/notification.service";
export declare class RemindersScheduler {
    private readonly remindersService;
    private notificationsService;
    constructor(remindersService: RemindersService, notificationsService: NotificationsService);
    handleReminders(): Promise<void>;
}
