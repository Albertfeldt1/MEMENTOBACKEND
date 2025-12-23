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
    async create(createSubscriptionDto) {
        const subscription = await this.subscriptionModel.create({
            ...createSubscriptionDto,
        });
        return subscription;
    }
    async findAll(lang) {
        const filter = {};
        if (lang) {
            filter.language = lang;
        }
        const subscriptions = await this.subscriptionModel
            .find(filter)
            .sort({ createdAt: -1 });
        return subscriptions;
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