import { HttpStatus } from '@nestjs/common';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import mongoose, { Model } from 'mongoose';
export declare class NotificationsServices {
    private NotificationModel;
    constructor(NotificationModel: Model<Notification>);
    create(createNotificationDto: any): Promise<mongoose.Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    bulkCreate(bulkData: any): Promise<mongoose.MergeType<mongoose.Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, Omit<any, "_id">>[]>;
    findAll(userId: string): Promise<"This action returns all notifications" | {
        statusCode: HttpStatus;
        message: string;
        data: (mongoose.Document<unknown, {}, Notification, {}, {}> & Notification & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    findOne(id: number): string;
    update(id: number, updateNotificationDto: UpdateNotificationDto): string;
    remove(id: number): string;
}
