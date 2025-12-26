import { Model, Types } from "mongoose";
import { EventReminder } from "src/event/entities/event-reminder.schema";
export declare class RemindersService {
    private reminderModel;
    constructor(reminderModel: Model<EventReminder>);
    createEventReminders(eventId: any, userId: any, eventDate: Date): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, EventReminder, {}, {}> & EventReminder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, Omit<{
        eventId: any;
        userId: any;
        type: string;
        fireAt: Date;
        isSent: false;
    }, "_id">>[]>;
    getDueReminders(): Promise<(import("mongoose").Document<unknown, {}, EventReminder, {}, {}> & EventReminder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    markAsSent(id: string): Promise<import("mongoose").UpdateWriteOpResult>;
}
