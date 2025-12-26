import { Injectable, BadRequestException } from "@nestjs/common";
import Stripe from "stripe";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/user.schema";
import { NotificationsService } from "src/notification/notification.service";
import { Notification } from "src/notifications/entities/notification.entity";

@Injectable()
export class WebhookService {
  private stripe: Stripe;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    private notificationsService: NotificationsService
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }

  async handleStripeWebhook(signature: string, rawBody: Buffer) {
    console.log("🔔 Webhook received");
    console.log("Signature:", signature);
    console.log("Body type:", rawBody.constructor.name);

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error("❌ Signature verification failed:", err.message);
      throw err;
    }

    console.log("✅ Event verified:", event.type);
  }

  // ================= HANDLERS =================

  private async checkoutCompleted(session: Stripe.Checkout.Session) {
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    await this.userModel.findOneAndUpdate(
      { stripeCustomerId: customerId },
      {
        stripeSubscriptionId: subscriptionId,
        isSubscriptionActive: true,
        subscriptionStatus: "active",
      }
    );
  }

  private async paymentSucceeded(invoice: Stripe.Invoice) {
    const line = invoice.lines?.data?.[0];
    const subscriptionId =
      typeof line?.subscription === "string"
        ? line.subscription
        : line?.subscription?.id;

    if (!subscriptionId) return;

    await this.userModel.findOneAndUpdate(
      { stripeSubscriptionId: subscriptionId },
      {
        isSubscriptionActive: true,
        subscriptionStatus: "active",
      }
    );
  }

  private async paymentFailed(invoice: Stripe.Invoice) {
    // ✅ SAME extraction logic as paymentSucceeded
    const line = invoice.lines?.data?.[0];
    const subscriptionId =
      typeof line?.subscription === "string"
        ? line.subscription
        : line?.subscription?.id;

    if (!subscriptionId) return;

    // 1️⃣ Update subscription status
    const user = await this.userModel.findOneAndUpdate(
      { stripeSubscriptionId: subscriptionId },
      {
        subscriptionStatus: "past_due",
        isSubscriptionActive: false,
      },
      { new: true }
    );

    if (!user) return;

    // 2️⃣ Save notification in DB
    await this.notificationModel.create({
      userId: user._id,
      title: "Payment Issue Detected",
      message:
        "We couldn’t process your subscription payment. Please update your payment details to avoid service interruption.",
    });

    // 3️⃣ Send push notification (if token exists)
    if (user.device_token) {
      await this.notificationsService.sendPushNotification(
        user.device_token as any,
        "Payment Issue Detected",
        "We couldn’t process your subscription payment. Please update your payment details to avoid service interruption."
      );
    }
  }

  private async subscriptionCancelled(subscription: Stripe.Subscription) {
    await this.userModel.findOneAndUpdate(
      { stripeSubscriptionId: subscription.id },
      {
        isSubscriptionActive: false,
        subscriptionStatus: "cancelled",
      }
    );
  }
}
