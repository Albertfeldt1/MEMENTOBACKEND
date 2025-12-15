import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthSchema ,AdminAuth} from './entities/admin-auth.entity';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: AdminAuth.name, schema: AdminAuthSchema }]),
      JwtModule.register({
        secret: 'your-secret-key',
        signOptions: { expiresIn: '360d' },
      }),
      UsersModule
    ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AdminAuthModule {}
