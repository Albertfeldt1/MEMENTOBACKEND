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
exports.RemindersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_reminder_schema_1 = require("../event/entities/event-reminder.schema");
let RemindersService = class RemindersService {
    constructor(reminderModel) {
        this.reminderModel = reminderModel;
    }
    async createEventReminders(eventId, userId, eventDate) {
        const reminders = [
            {
                label: "1_DAY_BEFORE",
                fireAt: new Date(eventDate.getTime() - 24 * 60 * 60 * 1000),
            },
            {
                label: "1_HOUR_BEFORE",
                fireAt: new Date(eventDate.getTime() - 60 * 60 * 1000),
            },
            {
                label: "15_MIN_BEFORE",
                fireAt: new Date(eventDate.getTime() - 15 * 60 * 1000),
            },
            {
                label: "ON_EVENT",
                fireAt: eventDate,
            },
        ];
        return this.reminderModel.insertMany(reminders.map((r) => ({
            eventId,
            userId,
            type: r.label,
            fireAt: r.fireAt,
            isSent: false,
        })));
    }
    async getDueReminders() {
        return this.reminderModel
            .findOneAndUpdate({
            fireAt: { $lte: new Date() },
            isSent: false,
            isProcessing: false,
        }, {
            $set: { isProcessing: true },
        }, {
            new: true,
        })
            .populate("eventId userId");
    }
    async markAsSent(id) {
        return this.reminderModel.updateOne({ _id: id }, { isSent: true });
    }
};
exports.RemindersService = RemindersService;
exports.RemindersService = RemindersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_reminder_schema_1.EventReminder.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RemindersService);
//# sourceMappingURL=reminders.service.js.map