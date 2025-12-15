import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { NotificationsService } from './notification.service';
import { join } from 'path';
console.log(
  'process.env.MAIL_USER',
  process.env.MAIL_USER,
  'process.env.MAIL_PASSWORD',
  process.env.MAIL_PASSWORD,
);
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST ,
        port: 587,
        secure: process.env.MAIL_SECURE === 'false',
        auth: {
          user: process.env.MAIL_USER ,
          pass: process.env.MAIL_PASSWORD
        },
      },
      defaults: {
        from: `<${process.env.MAIL_USER}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
