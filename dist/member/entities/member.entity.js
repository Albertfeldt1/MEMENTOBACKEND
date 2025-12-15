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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberSchema = exports.Member = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Member = class Member extends mongoose_2.Document {
};
exports.Member = Member;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Member.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Business' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Member.prototype, "businessId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Member.prototype, "memberName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Member.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0 }),
    __metadata("design:type", Number)
], Member.prototype, "feeAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Member.prototype, "admissionDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Member.prototype, "recurringMonthlyPayment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0 }),
    __metadata("design:type", Number)
], Member.prototype, "pendingAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0 }),
    __metadata("design:type", Number)
], Member.prototype, "paidAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                amount: { type: Number },
                date: { type: Date },
                isPaid: { type: Boolean, default: true },
                paymentDate: { type: Date, default: null }
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Member.prototype, "paymentHistory", void 0);
exports.Member = Member = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Member);
exports.MemberSchema = mongoose_1.SchemaFactory.createForClass(Member);
//# sourceMappingURL=member.entity.js.map