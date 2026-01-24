import { Model } from "mongoose";
import { User } from "src/users/user.schema";
import { Notification } from "src/notifications/entities/notification.entity";
export declare class WebhookService {
    private userModel;
    private notificationModel;
    private stripe;
    constructor(userModel: Model<User>, notificationModel: Model<Notification>);
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
