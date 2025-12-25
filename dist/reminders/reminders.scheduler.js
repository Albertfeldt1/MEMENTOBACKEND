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
exports.RemindersScheduler = void 0;
const common_1 = require("@nestjs/common");
const reminders_service_1 = require("./reminders.service");
const schedule_1 = require("@nestjs/schedule");
const notification_service_1 = require("../notification/notification.service");
let RemindersScheduler = class RemindersScheduler {
    constructor(remindersService, notificationsService) {
        this.remindersService = remindersService;
        this.notificationsService = notificationsService;
    }
    async handleReminders() {
        const reminders = await this.remindersService.getDueReminders();
        for (const r of reminders) {
            const token = r.userId?.device_token;
            if (!token)
                continue;
            console.log(`Sending ${r.type} reminder for ${r.eventId.title}`);
            await this.notificationsService.sendPushNotification(token, "Event Reminder", `${r.type.replace("_", " ")}: ${r.eventId.title}`, { eventId: r.eventId._id.toString() });
            await this.remindersService.markAsSent(r._id.toString());
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
    __metadata("design:paramtypes", [reminders_service_1.RemindersService,
        notification_service_1.NotificationsService])
], RemindersScheduler);
//# sourceMappingURL=reminders.scheduler.js.map