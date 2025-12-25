import { NotificationsServices } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
declare class DeleteNotificationsDto {
    ids: string[];
}
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsServices);
    create(createNotificationDto: CreateNotificationDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification, {}, {}> & import("./entities/notification.entity").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    markAsRead(body: {
        userId: string;
        notificationId?: string;
        notificationIds?: string[];
    }): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification, {}, {}> & import("./entities/notification.entity").Notification & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    } | {
        success: boolean;
        message: string;
        data: never[];
    }>;
    findAll(userId: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification, {}, {}> & import("./entities/notification.entity").Notification & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    getAllForAdmin(page?: number, limit?: number): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").FlattenMaps<{
            title: string;
            message: string;
            isRead: boolean;
            userId: import("mongoose").Types.ObjectId;
            type: string;
        }> & {
            _id: import("mongoose").Types.ObjectId;
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
    findOne(id: string): string;
    update(id: string, updateNotificationDto: UpdateNotificationDto): string;
    deleteManyDelete(dto: DeleteNotificationsDto): Promise<{
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
}
export {};
