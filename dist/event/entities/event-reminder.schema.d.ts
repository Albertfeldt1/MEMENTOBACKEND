import { Document, Types } from 'mongoose';
export declare class EventReminder {
    eventId: Types.ObjectId;
    userId: Types.ObjectId;
    fireAt: Date;
    isSent: boolean;
    type: string;
}
export declare const EventReminderSchema: import("mongoose").Schema<EventReminder, import("mongoose").Model<EventReminder, any, any, any, Document<unknown, any, EventReminder, any, {}> & EventReminder & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventReminder, Document<unknown, {}, import("mongoose").FlatRecord<EventReminder>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<EventReminder> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
