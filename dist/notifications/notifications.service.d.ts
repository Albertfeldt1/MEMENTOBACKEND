import { HttpStatus } from '@nestjs/common';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import mongoose, { Model, Types } from 'mongoose';
export declare class NotificationsServices {
    private NotificationModel;
    constructor(NotificationModel: Model<Notification>);
    create(createNotificationDto: any): Promise<mongoose.Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    bulkCreate(bulkData: any): Promise<mongoose.MergeType<mongoose.Document<unknown, {}, Notification, {}, {}> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, Omit<any, "_id">>[]>;
    deleteManyForUser(ids: string[]): Promise<{
        requested: number;
        deletedCount: number;
        deletedIds: never[];
        statusCode?: undefined;
        message?: undefined;
        data?: undefined;
    } | {
        statusCode: number;
        message: string;
        data: {
            requested: number;
            deletedCount: number;
            deletedIds: string[];
        };
        requested?: undefined;
        deletedCount?: undefined;
        deletedIds?: undefined;
    }>;
    findAll(userId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (mongoose.Document<unknown, {}, Notification, {}, {}> & Notification & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    getAllForAdmin(page?: number, limit?: number): Promise<{
        statusCode: number;
        message: string;
        data: (mongoose.FlattenMaps<{
            title: string;
            message: string;
            isRead: boolean;
            userId: Types.ObjectId;
            type: string;
        }> & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): string;
    update(id: number, updateNotificationDto: UpdateNotificationDto): string;
    remove(id: number): string;
    markAsRead(userId: string, notificationId?: string, notificationIds?: string[]): Promise<{
        success: boolean;
        message: string;
        data: mongoose.Document<unknown, {}, Notification, {}, {}> & Notification & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        };
    } | {
        success: boolean;
        message: string;
        data: never[];
    }>;
}
