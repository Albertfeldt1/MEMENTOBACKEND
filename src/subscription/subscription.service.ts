import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
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
    private readonly subscriptionModel: Model<SubscriptionDocument>
  ) {}

  async insertManySubscriptions() {
    const plans = [
      {
        planName: "Basic",
        price: 99.99,
        billingCycle: "yearly",
        features: [
          "Up to 5 photo albums",
          "100 photos per album",
          "Basic editing tools",
          "Standard quality prints",
          "Email support",
        ],
        isActive: true,
      },
      {
        planName: "Premium",
        price: 199.99,
        billingCycle: "yearly",
        features: [
          "Unlimited photo albums",
          "500 photos per album",
          "Advanced editing tools",
          "High quality prints",
          "Priority support",
          "Cloud backup",
        ],
        isActive: true,
      },
      {
        planName: "Pro",
        price: 299.99,
        billingCycle: "yearly",
        features: [
          "Everything in Premium",
          "Unlimited photos per album",
          "Professional editing suite",
          "Premium quality prints",
          "24/7 dedicated support",
          "Collaboration features",
          "Custom branding",
        ],
        isActive: true,
      },
    ];
    const existing = await this.subscriptionModel.find({
      planName: { $in: plans.map((p) => p.planName) },
    });

    if (existing.length) {
      return {
        message: "Plans already exist",
        existingPlans: existing.map((p) => p.planName),
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

  async findAll() {
    return this.subscriptionModel.find({}).sort({ createdAt: -1 });
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
