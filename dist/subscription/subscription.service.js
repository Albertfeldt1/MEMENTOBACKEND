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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nestjs_i18n_1 = require("nestjs-i18n");
const subscription_entity_1 = require("./entities/subscription.entity");
let SubscriptionService = class SubscriptionService {
    constructor(subscriptionModel, i18n) {
        this.subscriptionModel = subscriptionModel;
        this.i18n = i18n;
    }
    async insertManySubscriptions() {
        const plans = [
            {
                planName: "PLAN_BASIC",
                price: 99.99,
                billingCycle: "yearly",
                features: [
                    "FEATURE_BASIC_ALBUMS",
                    "FEATURE_BASIC_PHOTOS",
                    "FEATURE_BASIC_EDITING",
                    "FEATURE_STANDARD_PRINTS",
                    "FEATURE_EMAIL_SUPPORT",
                ],
                isActive: true,
            },
            {
                planName: "PLAN_PREMIUM",
                price: 199.99,
                billingCycle: "yearly",
                features: [
                    "FEATURE_UNLIMITED_ALBUMS",
                    "FEATURE_500_PHOTOS",
                    "FEATURE_ADVANCED_EDITING",
                    "FEATURE_HIGH_QUALITY_PRINTS",
                    "FEATURE_PRIORITY_SUPPORT",
                    "FEATURE_CLOUD_BACKUP",
                ],
                isActive: true,
            },
            {
                planName: "PLAN_PRO",
                price: 299.99,
                billingCycle: "yearly",
                features: [
                    "FEATURE_EVERYTHING_PREMIUM",
                    "FEATURE_UNLIMITED_PHOTOS",
                    "FEATURE_PRO_EDITING",
                    "FEATURE_PREMIUM_PRINTS",
                    "FEATURE_247_SUPPORT",
                    "FEATURE_COLLABORATION",
                    "FEATURE_CUSTOM_BRANDING",
                ],
                isActive: true,
            },
            {
                planName: "PLAN_BASIC",
                price: 9.99,
                billingCycle: "monthly",
                features: [
                    "FEATURE_BASIC_ALBUMS",
                    "FEATURE_BASIC_PHOTOS",
                    "FEATURE_BASIC_EDITING",
                    "FEATURE_STANDARD_PRINTS",
                    "FEATURE_EMAIL_SUPPORT",
                ],
                isActive: true,
            },
            {
                planName: "PLAN_PREMIUM",
                price: 19.99,
                billingCycle: "monthly",
                features: [
                    "FEATURE_UNLIMITED_ALBUMS",
                    "FEATURE_500_PHOTOS",
                    "FEATURE_ADVANCED_EDITING",
                    "FEATURE_HIGH_QUALITY_PRINTS",
                    "FEATURE_PRIORITY_SUPPORT",
                    "FEATURE_CLOUD_BACKUP",
                ],
                isActive: true,
            },
            {
                planName: "PLAN_PRO",
                price: 29.99,
                billingCycle: "monthly",
                features: [
                    "FEATURE_EVERYTHING_PREMIUM",
                    "FEATURE_UNLIMITED_PHOTOS",
                    "FEATURE_PRO_EDITING",
                    "FEATURE_PREMIUM_PRINTS",
                    "FEATURE_247_SUPPORT",
                    "FEATURE_COLLABORATION",
                    "FEATURE_CUSTOM_BRANDING",
                ],
                isActive: true,
            },
        ];
        const existing = await this.subscriptionModel.find({
            planName: { $in: plans.map((p) => p.planName) },
            billingCycle: { $in: plans.map((p) => p.billingCycle) },
        });
        if (existing.length) {
            return {
                message: "Plans already exist",
                existingPlans: existing.map((p) => `${p.planName} (${p.billingCycle})`),
            };
        }
        const data = await this.subscriptionModel.insertMany(plans);
        return {
            message: "Subscription plans inserted successfully",
            count: data.length,
            data,
        };
    }
    async create(createSubscriptionDto) {
        const subscription = await this.subscriptionModel.create({
            ...createSubscriptionDto,
        });
        return subscription;
    }
    async findAll() {
        const subscriptions = await this.subscriptionModel
            .find({})
            .sort({ createdAt: -1 });
        return Promise.all(subscriptions.map(async (plan) => ({
            _id: plan._id,
            planName: await this.i18n.translate(`common.${plan.planName}`),
            price: plan.price,
            billingCycle: plan.billingCycle,
            isActive: plan.isActive,
            features: await Promise.all(plan.features.map((featureKey) => this.i18n.translate(`common.${featureKey}`))),
        })));
    }
    async findOne(id) {
        const subscription = await this.subscriptionModel.findOne({
            _id: id,
        });
        if (!subscription) {
            throw new common_1.NotFoundException("Subscription not found");
        }
        return subscription;
    }
    async update(id, updateSubscriptionDto) {
        const subscription = await this.subscriptionModel.findOneAndUpdate({ _id: id }, updateSubscriptionDto, { new: true });
        if (!subscription) {
            throw new common_1.NotFoundException("Subscription not found");
        }
        return subscription;
    }
    async remove(id, userId) {
        const subscription = await this.subscriptionModel.findOneAndDelete({
            _id: id,
            userId,
        });
        if (!subscription) {
            throw new common_1.NotFoundException("Subscription not found");
        }
        return subscription;
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscription_entity_1.Subscription.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        nestjs_i18n_1.I18nService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map