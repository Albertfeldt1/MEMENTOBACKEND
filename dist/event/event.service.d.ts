import { HttpStatus } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { I18nService } from "nestjs-i18n";
import { Event, EventDocument } from "./entities/event.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { RemindersService } from "src/reminders/reminders.service";
import { NotificationsService } from "src/notification/notification.service";
export declare class EventService {
    private readonly eventModel;
    private readonly i18n;
    private notificationsService;
    private readonly remindersService;
    constructor(eventModel: Model<EventDocument>, i18n: I18nService, notificationsService: NotificationsService, remindersService: RemindersService);
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
