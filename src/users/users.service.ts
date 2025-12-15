import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationsModule } from 'src/notification/notification.module';
import { NotificationsService } from 'src/notification/notification.service';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  HttpStatus,
  Injectable,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { handleError, handleSuccess } from 'src/utility/response.helper';

import { SocialLoginDto } from './dto/social-login.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private notificationsService: NotificationsService,
  ) {}
  async socialLogin(body: SocialLoginDto) {
    const { socialId, email, name, device_type, device_token } = body;
    let user = await this.userModel.findOne({ socialId });
    if (user) {
      const payload = { ...user, sub: user._id };
      const access_token = this.jwtService.sign(payload);
      user.device_type = device_type ?? user.device_type ?? '';
      user.device_token = device_token ?? user.device_token ?? '';
      await user.save();
      return handleSuccess({
        statusCode: HttpStatus.OK,
        message: 'Login successful.',
        data: { token: access_token, user },
      });
    }
    if (email) {
      const emailExists = await this.userModel.findOne({ email });
      if (emailExists)
        throw new ConflictException(
          'This email is already registered with another account.',
        );
    }
    user = await this.userModel.create({
      name: name ?? '',
      email: email ?? '',
      socialId,
      device_type,
      device_token,
    });
    const payload = { ...user, sub: user._id };
    const access_token = this.jwtService.sign(payload);
    return handleSuccess({
      statusCode: HttpStatus.CREATED,
      message: 'Account created using social login.',
      data: { token: access_token, user },
    });
  }

   async getProfile(userId: string) {
    if (!userId) throw new NotFoundException('User id is required');

    // find user, remove password and mongoose internal fields
    const user = await this.userModel
      .findById(userId)
      .select('-password -__v')
      .lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return{
      statusCode: HttpStatus.OK,
      message: 'Profile fetched successfully.',
      data: { user },
    };
  }
  async editProfile(userId: string, body: any) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (body?.name) user.name = body.name;
    if (body?.email) user.email = body.email.toLowerCase();
    if (body?.dob) user.dob = new Date(body.dob);
    if (body?.device_type) user.device_type = body.device_type;
    if (body?.device_token) user.device_token = body.device_token;
    if (body?.qrCode) user.qrCode = body.qrCode;

    await user.save();
    return {
      statusCode: HttpStatus.OK,
      message: 'Profile updated successfully',
      data: user,
    };
  }

  async logout(userId: string) {
  const user = await this.userModel.findById(userId);
  if (!user) {
    throw new NotFoundException('User not found');
  }

  // Clear device token
  user.device_token = '';

  await user.save();

  return {
    statusCode: HttpStatus.OK,
    message: 'User logged out successfully',
    data:[]
  };
}
}
