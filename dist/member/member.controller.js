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
exports.MemberController = void 0;
const common_1 = require("@nestjs/common");
const member_service_1 = require("./member.service");
const create_member_dto_1 = require("./dto/create-member.dto");
const update_member_dto_1 = require("./dto/update-member.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let MemberController = class MemberController {
    constructor(memberService) {
        this.memberService = memberService;
    }
    async paymentSummary(userId) {
        const data = await this.memberService.getPaymentSummaryByUserId(userId);
        const response = {
            statsuCode: 200,
            message: 'Retrived all payment history',
            data,
        };
        return response;
    }
    async markPaymentPaid(paymentId) {
        return this.memberService.markPaymentPaid(paymentId);
    }
    async createOrUpdateMember(req, createMemberDto, memberId) {
        return this.memberService.createOrUpdate(req.user.userId, createMemberDto, memberId);
    }
    async markAllPaid(memberId) {
        return this.memberService.markAllPaid(memberId);
    }
    async findAll(req, search, businessId, filterType, startDate, endDate, paymentStatus) {
        const userId = req.user.userId || req.user.id || req.user._id;
        return this.memberService.findAll(userId, search, businessId, filterType, startDate, endDate, paymentStatus);
    }
    async findOne(id) {
        return this.memberService.findOne(id);
    }
    async update(id, updateMemberDto) {
        return this.memberService.update(id, updateMemberDto);
    }
    async remove(id) {
        return this.memberService.remove(id);
    }
    async deleteMember(memberId) {
        return this.memberService.deleteMember(memberId);
    }
};
exports.MemberController = MemberController;
__decorate([
    (0, common_1.Get)('payment-summary'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "paymentSummary", null);
__decorate([
    (0, common_1.Patch)('payment/mark-paid'),
    __param(0, (0, common_1.Query)('paymentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "markPaymentPaid", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_member_dto_1.CreateMemberDto, String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "createOrUpdateMember", null);
__decorate([
    (0, common_1.Post)('mark-all-paid'),
    __param(0, (0, common_1.Query)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "markAllPaid", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('businessId')),
    __param(3, (0, common_1.Query)('filterType')),
    __param(4, (0, common_1.Query)('startDate')),
    __param(5, (0, common_1.Query)('endDate')),
    __param(6, (0, common_1.Query)('paymentStatus')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_member_dto_1.UpdateMemberDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "deleteMember", null);
exports.MemberController = MemberController = __decorate([
    (0, common_1.Controller)('member'),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberController);
//# sourceMappingURL=member.controller.js.map