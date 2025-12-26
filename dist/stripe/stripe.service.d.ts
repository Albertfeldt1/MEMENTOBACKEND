import Stripe from "stripe";
import { User } from "src/users/user.schema";
import { Model } from "mongoose";
export declare class StripeService {
    private userModel;
    stripe: Stripe;
    constructor(userModel: Model<User>);
    createCustomerForUser(userId: string): Promise<string>;
    createProduct(name: string, description?: string): Promise<Stripe.Response<Stripe.Product>>;
    createPrice(planName: string, amount: number, interval: 'month' | 'year', description?: string): Promise<Stripe.Response<Stripe.Price>>;
    createCheckoutSession(userId: string, priceId: string): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    retrieveSubscription(subscriptionId: string): Promise<Stripe.Response<Stripe.Subscription>>;
}
