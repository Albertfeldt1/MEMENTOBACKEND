import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
// import { NotificationsModule } from 'src/notification/notification.module';
import { Subscription,SubscriptionSchema } from './entities/subscription.entity';
@Module({
       imports: [
         MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),
         JwtModule.register({
           secret: 'your-secret-key',
           signOptions: { expiresIn: '360d' },
         }),
         // NotificationsModule,
       ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
