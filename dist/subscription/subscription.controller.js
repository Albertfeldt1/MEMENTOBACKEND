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
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const subscription_service_1 = require("./subscription.service");
const create_subscription_dto_1 = require("./dto/create-subscription.dto");
const update_subscription_dto_1 = require("./dto/update-subscription.dto");
let SubscriptionController = class SubscriptionController {
    constructor(subscriptionService, i18n) {
        this.subscriptionService = subscriptionService;
        this.i18n = i18n;
    }
    async seedSubscriptions() {
        const result = await this.subscriptionService.insertManySubscriptions();
        return {
            statusCode: 201,
            message: result.message,
            data: result,
        };
    }
    async create(req, createSubscriptionDto) {
        const data = await this.subscriptionService.create(createSubscriptionDto);
        return {
            statusCode: 201,
            message: "Subscription created successfully",
            data,
        };
    }
    async findAll(req) {
        const data = await this.subscriptionService.findAll();
        return {
            statusCode: 200,
            message: await this.i18n.translate(`common.SUBSCRIPTIONS_FETCHED`),
            data,
        };
    }
    async findOne(req, id) {
        const data = await this.subscriptionService.findOne(id);
        return {
            statusCode: 200,
            message: "Subscription fetched successfully",
            data,
        };
    }
    async update(req, id, updateSubscriptionDto) {
        const data = await this.subscriptionService.update(id, updateSubscriptionDto);
        return {
            statusCode: 200,
            message: "Subscription updated successfully",
            data,
        };
    }
    async remove(req, id) {
        const data = await this.subscriptionService.remove(id, req.user.userId);
        return {
            statusCode: 200,
            message: "Subscription deleted successfully",
            data,
        };
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.Post)("seed"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "seedSubscriptions", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_subscription_dto_1.CreateSubscriptionDto]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_subscription_dto_1.UpdateSubscriptionDto]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "remove", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, common_1.Controller)("subscription"),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService,
        nestjs_i18n_1.I18nService])
], SubscriptionController);
//# sourceMappingURL=subscription.controller.js.map