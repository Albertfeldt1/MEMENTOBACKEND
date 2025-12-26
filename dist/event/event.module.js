"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const event_service_1 = require("./event.service");
const jwt_1 = require("@nestjs/jwt");
const reminders_module_1 = require("../reminders/reminders.module");
const event_controller_1 = require("./event.controller");
const event_entity_1 = require("./entities/event.entity");
const notification_module_1 = require("../notification/notification.module");
const user_schema_1 = require("../users/user.schema");
const notification_entity_1 = require("../notifications/entities/notification.entity");
let EventModule = class EventModule {
};
exports.EventModule = EventModule;
exports.EventModule = EventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: event_entity_1.Event.name, schema: event_entity_1.EventSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: notification_entity_1.Notification.name, schema: notification_entity_1.NotificationSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: "your-secret-key",
                signOptions: { expiresIn: "360d" },
            }),
            notification_module_1.NotificationsModule,
            reminders_module_1.RemindersModule,
        ],
        controllers: [event_controller_1.EventController],
        providers: [event_service_1.EventService],
    })
], EventModule);
//# sourceMappingURL=event.module.js.map