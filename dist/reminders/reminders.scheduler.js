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
exports.RemindersScheduler = void 0;
const common_1 = require("@nestjs/common");
const reminders_service_1 = require("./reminders.service");
const schedule_1 = require("@nestjs/schedule");
const notification_entity_1 = require("../notifications/entities/notification.entity");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/user.schema");
let RemindersScheduler = class RemindersScheduler {
    constructor(notificationModel, userModel, remindersService) {
        this.notificationModel = notificationModel;
        this.userModel = userModel;
        this.remindersService = remindersService;
    }
    async handleReminders() {
        while (true) {
            const r = await this.remindersService.getDueReminders();
            if (!r)
                break;
            try {
                const token = r.userId?.device_token;
                if (!token) {
                    await this.remindersService.markAsSent(r._id.toString(), false);
                    continue;
                }
                await this.notificationModel.create({
                    userId: new mongoose_1.Types.ObjectId(r.userId),
                    title: "Event Reminder",
                    message: `${r.type.replace("_", " ")}: ${r.eventId.title}`,
                });
                await this.remindersService.markAsSent(r._id.toString(), true);
            }
            catch (err) {
                await this.remindersService.resetProcessing(r._id.toString());
                break;
            }
        }
    }
};
exports.RemindersScheduler = RemindersScheduler;
__decorate([
    (0, schedule_1.Cron)("* * * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemindersScheduler.prototype, "handleReminders", null);
exports.RemindersScheduler = RemindersScheduler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(notification_entity_1.Notification.name)),
    __param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        reminders_service_1.RemindersService])
], RemindersScheduler);
//# sourceMappingURL=reminders.scheduler.js.map