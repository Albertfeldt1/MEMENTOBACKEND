"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = __importDefault(require("stripe"));
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/user.schema");
const notification_service_1 = require("../notification/notification.service");
const notification_entity_1 = require("../notifications/entities/notification.entity");
let WebhookService = class WebhookService {
    constructor(userModel, notificationModel, notificationsService) {
        this.userModel = userModel;
        this.notificationModel = notificationModel;
        this.notificationsService = notificationsService;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    }
    async handleStripeWebhook(signature, rawBody) {
        console.log("🔔 Webhook received");
        console.log("Signature:", signature);
        console.log("Body type:", rawBody.constructor.name);
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
        }
        catch (err) {
            console.error("❌ Signature verification failed:", err.message);
            throw err;
        }
        console.log("✅ Event verified:", event.type);
    }
    async checkoutCompleted(session) {
        const customerId = session.customer;
        const subscriptionId = session.subscription;
        await this.userModel.findOneAndUpdate({ stripeCustomerId: customerId }, {
            stripeSubscriptionId: subscriptionId,
            isSubscriptionActive: true,
            subscriptionStatus: "active",
        });
    }
    async paymentSucceeded(invoice) {
        const line = invoice.lines?.data?.[0];
        const subscriptionId = typeof line?.subscription === "string"
            ? line.subscription
            : line?.subscription?.id;
        if (!subscriptionId)
            return;
        await this.userModel.findOneAndUpdate({ stripeSubscriptionId: subscriptionId }, {
            isSubscriptionActive: true,
            subscriptionStatus: "active",
        });
    }
    async paymentFailed(invoice) {
        const line = invoice.lines?.data?.[0];
        const subscriptionId = typeof line?.subscription === "string"
            ? line.subscription
            : line?.subscription?.id;
        if (!subscriptionId)
            return;
        const user = await this.userModel.findOneAndUpdate({ stripeSubscriptionId: subscriptionId }, {
            subscriptionStatus: "past_due",
            isSubscriptionActive: false,
        }, { new: true });
        if (!user)
            return;
        await this.notificationModel.create({
            userId: user._id,
            title: "Payment Issue Detected",
            message: "We couldn’t process your subscription payment. Please update your payment details to avoid service interruption.",
        });
        if (user.device_token) {
            await this.notificationsService.sendPushNotification(user.device_token, "Payment Issue Detected", "We couldn’t process your subscription payment. Please update your payment details to avoid service interruption.");
        }
    }
    async subscriptionCancelled(subscription) {
        await this.userModel.findOneAndUpdate({ stripeSubscriptionId: subscription.id }, {
            isSubscriptionActive: false,
            subscriptionStatus: "cancelled",
        });
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(notification_entity_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        notification_service_1.NotificationsService])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map