import { HttpStatus } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { I18nService } from "nestjs-i18n";
import { Event, EventDocument } from "./entities/event.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { User } from "src/users/user.schema";
import { RemindersService } from "src/reminders/reminders.service";
import { Notification } from "src/notifications/entities/notification.entity";
export declare class EventService {
    private readonly eventModel;
    private notificationModel;
    private userModel;
    private readonly i18n;
    private readonly remindersService;
    constructor(eventModel: Model<EventDocument>, notificationModel: Model<Notification>, userModel: Model<User>, i18n: I18nService, remindersService: RemindersService);
    create(userId: string, dto: CreateEventDto): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, EventDocument, {}, {}> & Event & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(userId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (import("mongoose").Document<unknown, {}, EventDocument, {}, {}> & Event & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findById(userId: string, eventId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, EventDocument, {}, {}> & Event & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, dto: UpdateEventDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, EventDocument, {}, {}> & Event & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    delete(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    updateEvent(userId: string, eventId: string, dto: UpdateEventDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, EventDocument, {}, {}> & Event & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    deleteEvent(userId: string, eventId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: never[];
    }>;
}
