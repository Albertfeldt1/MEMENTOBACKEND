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
var PaymentsSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const member_entity_1 = require("./entities/member.entity");
let PaymentsSchedulerService = PaymentsSchedulerService_1 = class PaymentsSchedulerService {
    constructor(memberModel) {
        this.memberModel = memberModel;
        this.logger = new common_1.Logger(PaymentsSchedulerService_1.name);
    }
    async addMonthlyEntries() {
        this.logger.log('Monthly payment job started');
        const now = new Date();
        now.setDate(1);
        now.setHours(0, 0, 0, 0);
        const cursor = this.memberModel.find({ recurringMonthlyPayment: true }).cursor();
        for await (const member of cursor) {
            try {
                const alreadyExists = (member.paymentHistory || []).some((ph) => {
                    const d = new Date(ph.date);
                    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
                });
                if (alreadyExists) {
                    continue;
                }
                const amount = Number(member.pendingAmount ?? member.pendingAmount ?? 0);
                await this.memberModel.updateOne({ _id: member._id }, { $push: { paymentHistory: { amount, date: now, isPaid: false } } });
            }
            catch (err) {
                this.logger.error(`Error processing member ${member._id}: ${err.message}`);
            }
        }
        this.logger.log('Monthly payment job completed');
    }
};
exports.PaymentsSchedulerService = PaymentsSchedulerService;
__decorate([
    (0, schedule_1.Cron)('5 0 1 * *', { timeZone: 'Asia/Kolkata' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsSchedulerService.prototype, "addMonthlyEntries", null);
exports.PaymentsSchedulerService = PaymentsSchedulerService = PaymentsSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(member_entity_1.Member.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PaymentsSchedulerService);
//# sourceMappingURL=payments-scheduler.service.js.map