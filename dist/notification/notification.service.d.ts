import { MailerService } from '@nestjs-modules/mailer';
export declare class NotificationsService {
    private readonly mailerService;
    private readonly logger;
    constructor(mailerService: MailerService);
    sendEmail(to: string, subject: string, template: string, context: any): Promise<void>;
    sendPushNotification(deviceToken: string, title: string, body: string, data?: any): Promise<{
        success: boolean;
        message: string;
        response: string;
    } | {
        success: boolean;
        message: any;
        response?: undefined;
    }>;
    sendBulkPushNotification(deviceTokens: string[], title: string, body: string, data?: any): Promise<{
        success: boolean;
        message: string;
        response: import("firebase-admin/lib/messaging/messaging-api").BatchResponse;
    } | {
        success: boolean;
        message: any;
        response?: undefined;
    }>;
}
