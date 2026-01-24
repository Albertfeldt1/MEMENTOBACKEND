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
const notification_entity_1 = require("../notifications/entities/notification.entity");
let WebhookService = class WebhookService {
    constructor(userModel, notificationModel) {
        this.userModel = userModel;
        this.notificationModel = notificationModel;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    }
    async handleStripeWebhook(signature, rawBody) {
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
        }
        catch (err) {
            throw new common_1.BadRequestException("Invalid Stripe signature");
        }
        const alreadyProcessed = await this.notificationModel.exists({
            stripeEventId: event.id,
        });
        if (alreadyProcessed) {
            return { received: true };
        }
        switch (event.type) {
            case "checkout.session.completed":
                await this.checkoutCompleted(event.data.object);
                break;
            case "invoice.payment_succeeded":
                await this.paymentSucceeded(event.data.object);
                break;
            case "invoice.payment_failed":
                await this.paymentFailed(event.data.object);
                break;
            case "customer.subscription.updated":
            case "customer.subscription.created":
                await this.subscriptionUpdated(event.data.object);
                break;
            case "customer.subscription.deleted":
                await this.subscriptionCancelled(event.data.object);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
        await this.notificationModel.create({
            stripeEventId: event.id,
            title: "Stripe Event Processed",
            message: `Processed event: ${event.type}`,
        });
        return { received: true };
    }
    async checkoutCompleted(session) {
        const customerId = session.customer;
        const stripeSubscriptionId = session.subscription;
        const userId = session.metadata?.userId;
        const internalSubscriptionId = session.metadata?.subscriptionId;
        const subscription = await this.stripe.subscriptions.retrieve(stripeSubscriptionId);
        const start = subscription.current_period_start;
        const end = subscription.current_period_end;
        const data = await this.userModel.findOneAndUpdate({ _id: userId }, {
            stripeCustomerId: customerId,
            stripeSubscriptionId: stripeSubscriptionId,
            subscriptionStatus: subscription.status,
            isSubscriptionActive: subscription.status === "active",
            subscriptionStart: start ? new Date(start * 1000) : null,
            subscriptionEnd: end ? new Date(end * 1000) : null,
            internalSubscriptionId,
        }, { new: true });
        console.log("=====>>>>data", data);
    }
    async paymentSucceeded(invoice) {
        const subscriptionId = this.extractSubscriptionId(invoice);
        if (!subscriptionId)
            return;
        await this.userModel.findOneAndUpdate({ stripeSubscriptionId: subscriptionId }, {
            isSubscriptionActive: true,
            subscriptionStatus: "active",
        });
    }
    async paymentFailed(invoice) {
        const subscriptionId = this.extractSubscriptionId(invoice);
        if (!subscriptionId)
            return;
        const user = await this.userModel.findOneAndUpdate({ stripeSubscriptionId: subscriptionId }, {
            isSubscriptionActive: false,
            subscriptionStatus: "past_due",
        }, { new: true });
        if (!user)
            return;
        await this.notificationModel.create({
            userId: user._id,
            title: "Payment Failed",
            message: "Your subscription payment failed. Please update your payment method to avoid interruption.",
        });
    }
    async subscriptionUpdated(subscription) {
        await this.userModel.findOneAndUpdate({ stripeSubscriptionId: subscription.id }, {
            subscriptionStatus: subscription.status,
            isSubscriptionActive: subscription.status === "active",
            subscriptionStart: new Date(subscription.current_period_start * 1000),
            subscriptionEnd: new Date(subscription.current_period_end * 1000),
        });
    }
    async subscriptionCancelled(subscription) {
        await this.userModel.findOneAndUpdate({ stripeSubscriptionId: subscription.id }, {
            isSubscriptionActive: false,
            subscriptionStatus: "cancelled",
        });
    }
    extractSubscriptionId(invoice) {
        const sub = invoice.subscription;
        if (typeof sub === "string")
            return sub;
        const line = invoice.lines?.data.find((l) => typeof l.subscription === "string" ||
            typeof l.subscription?.id === "string");
        if (!line)
            return null;
        return typeof line.subscription === "string"
            ? line.subscription
            : (line.subscription?.id ?? null);
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(notification_entity_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map