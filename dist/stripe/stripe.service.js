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
exports.StripeService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/user.schema");
const mongoose_2 = require("mongoose");
let StripeService = class StripeService {
    constructor(userModel) {
        this.userModel = userModel;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    }
    async createCustomerForUser(userId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new Error("User not found");
        if (user.stripeCustomerId)
            return user.stripeCustomerId;
        const customer = await this.stripe.customers.create({
            email: user.email,
            name: user.name,
        });
        user.stripeCustomerId = customer.id;
        await user.save();
        return customer.id;
    }
    async createProduct(name, description) {
        return this.stripe.products.create({ name, description });
    }
    async createPrice(planName, amount, interval, description) {
        const product = await this.stripe.products.create({
            name: planName,
            description,
        });
        const unitAmount = Math.round(amount * 100);
        return this.stripe.prices.create({
            product: product.id,
            unit_amount: unitAmount,
            currency: "usd",
            recurring: { interval },
        });
    }
    async createCheckoutSession(userId, priceId) {
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
            success_url: `${process.env.APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.APP_URL}/payment/cancel`,
        });
    }
    retrieveSubscription(subscriptionId) {
        return this.stripe.subscriptions.retrieve(subscriptionId);
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StripeService);
//# sourceMappingURL=stripe.service.js.map