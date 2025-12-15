import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from './mail/mail.module';
import mongodbConfig from './config/mongodb.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { NotificationsModules } from './notifications/notifications.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [
     ScheduleModule.forRoot(), 
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongodbConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'build'),
    }),
    AuthModule,
    UsersModule,
    MailModule,
    AdminAuthModule,
    NotificationsModules,
    PagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
