import { NotificationsServices } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsServices);
    create(createNotificationDto: CreateNotificationDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification, {}, {}> & import("./entities/notification.entity").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(userId: string): Promise<"This action returns all notifications" | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification, {}, {}> & import("./entities/notification.entity").Notification & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    findOne(id: string): string;
    update(id: string, updateNotificationDto: UpdateNotificationDto): string;
    remove(id: string): string;
}
