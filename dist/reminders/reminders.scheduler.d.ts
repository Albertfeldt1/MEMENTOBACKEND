import { RemindersService } from "./reminders.service";
import { Notification } from "src/notifications/entities/notification.entity";
import { Model } from "mongoose";
import { User } from "src/users/user.schema";
export declare class RemindersScheduler {
    private notificationModel;
    private userModel;
    private readonly remindersService;
    constructor(notificationModel: Model<Notification>, userModel: Model<User>, remindersService: RemindersService);
    handleReminders(): Promise<void>;
}
