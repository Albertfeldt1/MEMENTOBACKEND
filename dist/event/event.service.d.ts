import { HttpStatus } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { Event, EventDocument } from "./entities/event.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
export declare class EventService {
    private eventModel;
    constructor(eventModel: Model<EventDocument>);
    create(userId: string, dto: CreateEventDto): Promise<{
        statusCode: HttpStatus;
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
    update(id: string, dto: UpdateEventDto): Promise<import("mongoose").Document<unknown, {}, EventDocument, {}, {}> & Event & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
