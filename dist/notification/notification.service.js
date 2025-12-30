"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const admin = __importStar(require("firebase-admin"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let NotificationsService = NotificationsService_1 = class NotificationsService {
    constructor(mailerService) {
        this.mailerService = mailerService;
        this.logger = new common_2.Logger(NotificationsService_1.name);
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.PROJECT_ID,
                    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
                    clientEmail: process.env.CLIENT_EMAIL,
                }),
            });
        }
    }
    async sendEmail(to, subject, template, context) {
        try {
            const response = await this.mailerService.sendMail({
                from: "contact@dhaniq.co.uk",
                to,
                subject,
                template,
                context,
            });
            this.logger.log(`Email sent to ${to} | Subject: "${subject}" | MessageId: ${response.messageId}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to} | Subject: "${subject}" | Error: ${error.message}`, error.stack);
            console.error("Mailer Error:", error);
        }
    }
    async sendPushNotification(deviceToken, title, body, data) {
        try {
            const message = {
                token: deviceToken,
                notification: {
                    title,
                    body,
                },
                data: data || {},
                apns: {
                    headers: {
                        "apns-priority": "10",
                    },
                    payload: {
                        aps: {
                            alert: {
                                title,
                                body,
                            },
                            sound: "default",
                            badge: 1,
                            "content-available": 1,
                        },
                    },
                },
            };
            const response = await admin.messaging().send(message);
            return {
                success: true,
                message: "iOS push notification sent successfully",
                response,
            };
        }
        catch (error) {
            console.error("FCM Error:", error);
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async sendBulkPushNotification(deviceTokens, title, body, data) {
        try {
            const message = {
                notification: {
                    title,
                    body,
                },
                data: data || {},
                tokens: deviceTokens,
            };
            const response = await admin.messaging().sendEachForMulticast(message);
            return {
                success: true,
                message: "Bulk push notifications sent successfully",
                response,
            };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], NotificationsService);
//# sourceMappingURL=notification.service.js.map