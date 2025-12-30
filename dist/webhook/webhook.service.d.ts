import { Model } from "mongoose";
import { User } from "src/users/user.schema";
import { NotificationsService } from "src/notification/notification.service";
import { Notification } from "src/notifications/entities/notification.entity";
export declare class WebhookService {
    private userModel;
    private notificationModel;
    private notificationsService;
    private stripe;
    constructor(userModel: Model<User>, notificationModel: Model<Notification>, notificationsService: NotificationsService);
    handleStripeWebhook(signature: string, rawBody: Buffer): Promise<{
        received: boolean;
    }>;
    private checkoutCompleted;
    private paymentSucceeded;
    private paymentFailed;
    private subscriptionUpdated;
    private subscriptionCancelled;
    private extractSubscriptionId;
}
