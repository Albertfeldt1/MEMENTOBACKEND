// stripe.service.ts
import Stripe from "stripe";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/users/user.schema";
import { Model } from "mongoose";

@Injectable()
export class StripeService {
  stripe: Stripe;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }

  /* Create Stripe customer and store in DB */
  async createCustomerForUser(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error("User not found");

    if (user.stripeCustomerId) return user.stripeCustomerId;

    const customer = await this.stripe.customers.create({
      email: user.email,
      name: user.name,
    });

    user.stripeCustomerId = customer.id;
    await user.save();

    return customer.id;
  }

  /* Create Stripe Product */
  async createProduct(name: string, description?: string) {
    return this.stripe.products.create({ name, description });
  }

  /* Create Stripe Price */
  async createPrice(
    planName: string,
    amount: number,
    interval: "month" | "year",
    description?: string,
    // stripeCustomerId?:string,
    // startSubscriptionDate?:string,
    // endSubscriptionDate?:string,
    // subscriptionPlan?:string
  ) {
    const product = await this.stripe.products.create({
      name: planName,
      description,
    });
    // await this.userModel.findOneAndUpdate({stripeCustomerId},{$set:{startSubscriptionDate,endSubscriptionDate,subscriptionPlan}},{new:true})
    const unitAmount = Math.round(amount * 100); 
    return this.stripe.prices.create({
      product: product.id,
      unit_amount: unitAmount,
      currency: "usd",
      recurring: { interval },
    });
  }

  /* Create Checkout Subscription Session */
  async createCheckoutSession(userId: string, priceId: string,subscriptionId:string) {
    const customerId = await this.createCustomerForUser(userId);
    return this.stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, 
          quantity: 1,
        },
      ],
      metadata:{userId,subscriptionId},
      success_url: `${process.env.APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/payment/cancel`,
    });
  }

  retrieveSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.retrieve(subscriptionId);
  }
}
