import { RemindersService } from './reminders.service';
export declare class RemindersScheduler {
    private readonly remindersService;
    constructor(remindersService: RemindersService);
    handleReminders(): Promise<void>;
}
