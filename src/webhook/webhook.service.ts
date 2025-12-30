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

  // ================= ENTRY POINT =================

  async handleStripeWebhook(signature: string, rawBody: Buffer) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      throw new BadRequestException("Invalid Stripe signature");
    }

    // 🔒 Idempotency guard (Stripe retries events)
    const alreadyProcessed = await this.notificationModel.exists({
      stripeEventId: event.id,
    });
    if (alreadyProcessed) {
      return { received: true };
    }

    switch (event.type) {
      case "checkout.session.completed":
        await this.checkoutCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "invoice.payment_succeeded":
        await this.paymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await this.paymentFailed(event.data.object as Stripe.Invoice);
        break;

      case "customer.subscription.updated":
      case "customer.subscription.created":
        await this.subscriptionUpdated(
          event.data.object as Stripe.Subscription
        );
        break;

      case "customer.subscription.deleted":
        await this.subscriptionCancelled(
          event.data.object as Stripe.Subscription
        );
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Save processed event
    await this.notificationModel.create({
      stripeEventId: event.id,
      title: "Stripe Event Processed",
      message: `Processed event: ${event.type}`,
    });

    return { received: true };
  }

  // ================= HANDLERS =================

  /**
   * Fired once when checkout finishes successfully
   */
private async checkoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const stripeSubscriptionId = session.subscription as string;

  const userId = session.metadata?.userId;
  const internalSubscriptionId = session.metadata?.subscriptionId;

  const subscription = await this.stripe.subscriptions.retrieve(
    stripeSubscriptionId
  );

  const start = (subscription as any).current_period_start;
  const end = (subscription as any).current_period_end;

  const data = await this.userModel.findOneAndUpdate(
    { _id: userId }, 
    {
      stripeCustomerId: customerId,
      stripeSubscriptionId: stripeSubscriptionId,
      subscriptionStatus: subscription.status,
      isSubscriptionActive: subscription.status === "active",
      subscriptionStart: start ? new Date(start * 1000) : null,
      subscriptionEnd: end ? new Date(end * 1000) : null,
      internalSubscriptionId, 
    },{new:true}
  );
  console.log("=====>>>>data",data)
}


  private async paymentSucceeded(invoice: Stripe.Invoice) {
    const subscriptionId = this.extractSubscriptionId(invoice);
    if (!subscriptionId) return;

    await this.userModel.findOneAndUpdate(
      { stripeSubscriptionId: subscriptionId },
      {
        isSubscriptionActive: true,
        subscriptionStatus: "active",
      }
    );
  }

  /**
   * Fired when payment fails
   */
  private async paymentFailed(invoice: Stripe.Invoice) {
    const subscriptionId = this.extractSubscriptionId(invoice);
    if (!subscriptionId) return;

    const user = await this.userModel.findOneAndUpdate(
      { stripeSubscriptionId: subscriptionId },
      {
        isSubscriptionActive: false,
        subscriptionStatus: "past_due",
      },
      { new: true }
    );

    if (!user) return;

    // Save notification
    await this.notificationModel.create({
      userId: user._id,
      title: "Payment Failed",
      message:
        "Your subscription payment failed. Please update your payment method to avoid interruption.",
    });

    // Push notification
    if (user.device_token) {
      await this.notificationsService.sendPushNotification(
        user.device_token as any,
        "Payment Failed",
        "Your subscription payment failed. Please update your payment method."
      );
    }
  }

  /**
   * Fired on plan change, renewals, pause, resume
   */
  private async subscriptionUpdated(subscription: Stripe.Subscription) {
    await this.userModel.findOneAndUpdate(
      { stripeSubscriptionId: subscription.id },
      {
        subscriptionStatus: subscription.status,
        isSubscriptionActive: subscription.status === "active",
        subscriptionStart: new Date(
          (subscription as any).current_period_start * 1000
        ),
        subscriptionEnd: new Date(
          (subscription as any).current_period_end * 1000
        ),
      }
    );
  }

  /**
   * Fired when subscription is cancelled
   */
  private async subscriptionCancelled(subscription: Stripe.Subscription) {
    await this.userModel.findOneAndUpdate(
      { stripeSubscriptionId: subscription.id },
      {
        isSubscriptionActive: false,
        subscriptionStatus: "cancelled",
      }
    );
  }

  // ================= HELPERS =================

  /**
   * Safely extract subscription ID from invoice
   */
  private extractSubscriptionId(invoice: Stripe.Invoice): string | null {
    const sub = (invoice as any).subscription;
    if (typeof sub === "string") return sub;

    const line = invoice.lines?.data.find(
      (l) =>
        typeof l.subscription === "string" ||
        typeof l.subscription?.id === "string"
    );

    if (!line) return null;

    return typeof line.subscription === "string"
      ? line.subscription
      : (line.subscription?.id ?? null);
  }
}
