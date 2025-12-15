"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const notification_service_1 = require("./notification.service");
const path_1 = require("path");
console.log('process.env.MAIL_USER', process.env.MAIL_USER, 'process.env.MAIL_PASSWORD', process.env.MAIL_PASSWORD);
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.MAIL_HOST,
                    port: 587,
                    secure: process.env.MAIL_SECURE === 'false',
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASSWORD
                    },
                },
                defaults: {
                    from: `<${process.env.MAIL_USER}>`,
                },
                template: {
                    dir: (0, path_1.join)(__dirname, 'templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        ],
        providers: [notification_service_1.NotificationsService],
        exports: [notification_service_1.NotificationsService],
    })
], NotificationsModule);
//# sourceMappingURL=notification.module.js.map