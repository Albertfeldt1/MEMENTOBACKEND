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
exports.StripeController = void 0;
const common_1 = require("@nestjs/common");
const stripe_service_1 = require("./stripe.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let StripeController = class StripeController {
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    async createProduct(body) {
        const data = await this.stripeService.createProduct(body.name, body.description);
        const response = {
            statusCode: common_1.HttpStatus?.OK,
            message: "Product created successfully",
            data
        };
        return response;
    }
    async createPrice(body) {
        const data = await this.stripeService.createPrice(body.planName, body.amount, body.interval, body.description);
        const response = {
            statusCode: common_1.HttpStatus?.OK,
            message: "Price Created successfully",
            data
        };
        return response;
    }
    async checkout(req, priceId, subscriptionId) {
        return this.stripeService.createCheckoutSession(req.user.userId, priceId, subscriptionId);
    }
    async getSubscription(id) {
        return this.stripeService.retrieveSubscription(id);
    }
    async createCustomer(req) {
        const customerId = await this.stripeService.createCustomerForUser(req.user.userId);
        const response = {
            statusCode: common_1.HttpStatus?.OK,
            message: "Customer Id is created",
            data: customerId
        };
        return response;
    }
    ;
};
exports.StripeController = StripeController;
__decorate([
    (0, common_1.Post)("product"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Post)("price"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createPrice", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("checkout"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)("priceId")),
    __param(2, (0, common_1.Body)('subscriptionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "checkout", null);
__decorate([
    (0, common_1.Get)("subscription"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "getSubscription", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("customer"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createCustomer", null);
exports.StripeController = StripeController = __decorate([
    (0, common_1.Controller)("stripe"),
    __metadata("design:paramtypes", [stripe_service_1.StripeService])
], StripeController);
//# sourceMappingURL=stripe.controller.js.map