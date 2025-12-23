import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { I18nService } from "nestjs-i18n";
import {
  Subscription,
  SubscriptionDocument,
} from "./entities/subscription.entity";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
    private readonly i18n: I18nService
  ) {}

  async insertManySubscriptions() {
    const plans = [
      // ===== YEARLY PLANS =====
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

      // ===== MONTHLY PLANS =====
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

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const subscription = await this.subscriptionModel.create({
      ...createSubscriptionDto,
    });

    return subscription;
  }

  async findAll(billingCycle:string) {
    const subscriptions = await this.subscriptionModel
      .find({billingCycle})
      .sort({ createdAt: -1 });

    return Promise.all(
      subscriptions.map(async (plan) => ({
        _id: plan._id,
        planName: await this.i18n.translate(`common.${plan.planName}`),
        price: plan.price,
        billingCycle: plan.billingCycle,
        isActive: plan.isActive,
        features: await Promise.all(
          plan.features.map((featureKey) =>
            this.i18n.translate(`common.${featureKey}`)
          )
        ),
      }))
    );
  }

  async findOne(id: string) {
    const subscription = await this.subscriptionModel.findOne({
      _id: id,
    });

    if (!subscription) {
      throw new NotFoundException("Subscription not found");
    }

    return subscription;
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.subscriptionModel.findOneAndUpdate(
      { _id: id },
      updateSubscriptionDto,
      { new: true }
    );

    if (!subscription) {
      throw new NotFoundException("Subscription not found");
    }

    return subscription;
  }

  async remove(id: string, userId: string) {
    const subscription = await this.subscriptionModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!subscription) {
      throw new NotFoundException("Subscription not found");
    }

    return subscription;
  }
}
