import { HttpStatus } from "@nestjs/common";
import { StripeService } from "./stripe.service";
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createProduct(body: {
        name: string;
        description?: string;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("stripe").Stripe.Response<import("stripe").Stripe.Product>;
    }>;
    createPrice(body: {
        planName: string;
        amount: number;
        interval: "month" | "year";
        description: string;
        stripeCustomerId: string;
        startSubscriptionDate: string;
        endSubscriptionDate: string;
        subscriptionPlan: string;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("stripe").Stripe.Response<import("stripe").Stripe.Price>;
    }>;
    checkout(req: any, priceId: string): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Checkout.Session>>;
    getSubscription(id: string): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Subscription>>;
    createCustomer(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: string;
    }>;
}
