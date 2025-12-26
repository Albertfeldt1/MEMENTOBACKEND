import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { User,UserSchema } from 'src/users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from 'src/notification/notification.module';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      JwtModule.register({
        secret: 'your-secret-key',
        signOptions: { expiresIn: '360d' },
      }),
      NotificationsModule,
    ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
