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
      {
        planName: "Basic",
        price: 9.99,
        language: "en",
        billingCycle: "monthly",
        isActive: true,
        features: [
          "Up to 5 photo albums",
          "100 photos per album",
          "Basic editing tools",
          "Standard quality prints",
          "Email support",
        ],
      },
      {
        planName: "Basic",
        price: 9.99,
        language: "es",
        billingCycle: "monthly",
        isActive: true,
        features: [
          "Hasta 5 álbumes de fotos",
          "100 fotos por álbum",
          "Herramientas básicas de edición",
          "Impresiones de calidad estándar",
          "Soporte por correo electrónico",
        ],
      },
      {
        planName: "Premium",
        price: 19.99,
        language: "en",
        billingCycle: "monthly",
        isActive: true,
        features: [
          "Unlimited photo albums",
          "500 photos per album",
          "Advanced editing tools",
          "High quality prints",
          "Priority support",
          "Cloud backup",
        ],
      },
      {
        planName: "Premium",
        price: 19.99,
        language: "es",
        billingCycle: "monthly",
        isActive: true,
        features: [
          "Álbumes de fotos ilimitados",
          "500 fotos por álbum",
          "Herramientas avanzadas de edición",
          "Impresiones de alta calidad",
          "Soporte prioritario",
          "Copia de seguridad en la nube",
        ],
      },
      {
        planName: "Pro",
        price: 29.99,
        language: "en",
        billingCycle: "monthly",
        isActive: true,
        features: [
          "Everything in Premium",
          "Unlimited photos per album",
          "Professional editing suite",
          "Premium quality prints",
          "24/7 dedicated support",
          "Collaboration features",
          "Custom branding",
        ],
      },
      {
        planName: "Pro",
        price: 29.99,
        language: "es",
        billingCycle: "monthly",
        isActive: true,
        features: [
          "Todo lo incluido en Premium",
          "Fotos ilimitadas por álbum",
          "Suite de edición profesional",
          "Impresiones de calidad premium",
          "Soporte dedicado 24/7",
          "Funciones de colaboración",
          "Marca personalizada",
        ],
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

  async findAll(lang?: string) {
    const filter: any = {};
    if (lang) {
      filter.language = lang;
    }
    const subscriptions = await this.subscriptionModel
      .find(filter)
      .sort({ createdAt: -1 });
    return subscriptions;
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
