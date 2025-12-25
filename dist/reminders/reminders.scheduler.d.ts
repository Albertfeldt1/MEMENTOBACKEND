import { RemindersService } from "./reminders.service";
import { NotificationsService } from "src/notification/notification.service";
import { Notification } from "src/notifications/entities/notification.entity";
import { Model } from "mongoose";
export declare class RemindersScheduler {
    private notificationModel;
    private readonly remindersService;
    private notificationsService;
    constructor(notificationModel: Model<Notification>, remindersService: RemindersService, notificationsService: NotificationsService);
    handleReminders(): Promise<void>;
}
