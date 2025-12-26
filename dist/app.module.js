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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const chat_gateway_1 = require("./chat/chat.gateway");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const schedule_1 = require("@nestjs/schedule");
const mail_module_1 = require("./mail/mail.module");
const mongodb_config_1 = __importDefault(require("./config/mongodb.config"));
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = __importStar(require("path"));
const admin_auth_module_1 = require("./admin-auth/admin-auth.module");
const notifications_module_1 = require("./notifications/notifications.module");
const pages_module_1 = require("./pages/pages.module");
const event_module_1 = require("./event/event.module");
const subscription_module_1 = require("./subscription/subscription.module");
const reminders_module_1 = require("./reminders/reminders.module");
const stripe_module_1 = require("./stripe/stripe.module");
const webhook_module_1 = require("./webhook/webhook.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [mongodb_config_1.default],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get("mongodb.uri"),
                }),
                inject: [config_1.ConfigService],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, "..", "frontend", "build"),
            }),
            nestjs_i18n_1.I18nModule.forRoot({
                fallbackLanguage: "en",
                loader: nestjs_i18n_1.I18nJsonLoader,
                loaderOptions: {
                    path: path_1.default.join(__dirname, "i18n"),
                    watch: true,
                },
                resolvers: [nestjs_i18n_1.AcceptLanguageResolver],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            mail_module_1.MailModule,
            admin_auth_module_1.AdminAuthModule,
            notifications_module_1.NotificationsModules,
            pages_module_1.PagesModule,
            event_module_1.EventModule,
            subscription_module_1.SubscriptionModule,
            reminders_module_1.RemindersModule,
            schedule_1.ScheduleModule.forRoot(),
            stripe_module_1.StripeModule,
            webhook_module_1.WebhookModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, chat_gateway_1.ChatGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map