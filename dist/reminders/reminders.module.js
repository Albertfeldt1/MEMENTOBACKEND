"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemindersModule = void 0;
const common_1 = require("@nestjs/common");
const reminders_service_1 = require("./reminders.service");
const mongoose_1 = require("@nestjs/mongoose");
const event_reminder_schema_1 = require("../event/entities/event-reminder.schema");
const event_entity_1 = require("../event/entities/event.entity");
const reminders_scheduler_1 = require("./reminders.scheduler");
const user_schema_1 = require("../users/user.schema");
const notification_entity_1 = require("../notifications/entities/notification.entity");
let RemindersModule = class RemindersModule {
};
exports.RemindersModule = RemindersModule;
exports.RemindersModule = RemindersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: event_reminder_schema_1.EventReminder.name, schema: event_reminder_schema_1.EventReminderSchema },
                { name: Event.name, schema: event_entity_1.EventSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: notification_entity_1.Notification.name, schema: notification_entity_1.NotificationSchema },
            ]),
        ],
        providers: [reminders_service_1.RemindersService, reminders_scheduler_1.RemindersScheduler],
        exports: [reminders_service_1.RemindersService]
    })
], RemindersModule);
//# sourceMappingURL=reminders.module.js.map