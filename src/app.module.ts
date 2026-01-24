import { Module } from "@nestjs/common";
import {
  I18nModule,
  I18nJsonLoader,
  AcceptLanguageResolver,
} from "nestjs-i18n";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChatGateway } from "./chat/chat.gateway";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ScheduleModule } from "@nestjs/schedule";
import { MailModule } from "./mail/mail.module";
import mongodbConfig from "./config/mongodb.config";
import { ServeStaticModule } from "@nestjs/serve-static";
import path, { join } from "path";
import { AdminAuthModule } from "./admin-auth/admin-auth.module";
// import { NotificationsModules } from "./notifications/notifications.module";
import { PagesModule } from "./pages/pages.module";
import { EventModule } from "./event/event.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { RemindersModule } from './reminders/reminders.module';
import { StripeModule } from './stripe/stripe.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongodbConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("mongodb.uri"),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "frontend", "build"),
    }),
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, "i18n"),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    AuthModule,
    UsersModule,
    MailModule,
    AdminAuthModule,
    // NotificationsModules,
    PagesModule,
    EventModule,
    SubscriptionModule,
    RemindersModule,
    ScheduleModule.forRoot(),
    StripeModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
