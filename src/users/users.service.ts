import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user.schema";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { NotificationsModule } from "src/notification/notification.module";
import { NotificationsService } from "src/notification/notification.service";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  HttpStatus,
  Injectable,
  Query,
  UnauthorizedException,
} from "@nestjs/common";
import { handleError, handleSuccess } from "src/utility/response.helper";

import { SocialLoginDto } from "./dto/social-login.dto";
import { RegisterDto } from "./dto/register-profile.dto";
import { LoginDto } from "./dto/login.dto";
import { CheckEmailDto } from "./dto/check-email.dto";
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private notificationsService: NotificationsService
  ) {}
  async socialLogin(body: SocialLoginDto) {
    const { socialId, email, name, device_type, device_token } = body;

    // 1️⃣ Check by socialId (already linked)
    let user = await this.userModel.findOne({ socialId });

    if (user) {
      user.device_type = device_type ?? user.device_type;
      user.device_token = device_token ?? user.device_token;
      await user.save();

      const payload = {
        sub: user._id,
        email: user.email,
        loginType: "social",
      };

      return handleSuccess({
        statusCode: HttpStatus.OK,
        message: "Login successful.",
        data: {
          token: this.jwtService.sign(payload),
          user,
        },
      });
    }

    // 2️⃣ Check by email (link account)
    if (email) {
      user = await this.userModel.findOne({
        email: email.toLowerCase(),
      });

      if (user) {
        // 🔗 Link social account
        user.socialId = socialId;
        user.device_type = device_type ?? user.device_type;
        user.device_token = device_token ?? user.device_token;

        // Optional: update name only if empty
        if (!user.name && name) {
          user.name = name;
        }

        await user.save();

        const payload = {
          sub: user._id,
          email: user.email,
          loginType: "social",
        };

        return handleSuccess({
          statusCode: HttpStatus.OK,
          message: "Social account linked successfully.",
          data: {
            token: this.jwtService.sign(payload),
            user,
          },
        });
      }
    }

    // 3️⃣ Create new user (fresh social signup)
    user = await this.userModel.create({
      name: name ?? "",
      email: email?.toLowerCase() ?? "",
      socialId,
      device_type,
      device_token,
    });

    const payload = {
      sub: user._id,
      email: user.email,
      loginType: "social",
    };

    return handleSuccess({
      statusCode: HttpStatus.CREATED,
      message: "Account created using social login.",
      data: {
        token: this.jwtService.sign(payload),
        user,
      },
    });
  }

  async register(body: RegisterDto) {
    const { email, password, name, device_type, device_token } = body;

    const existingUser = await this.userModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      throw new ConflictException("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name ?? "",
      device_type,
      device_token,
    });

    const payload = {
      sub: user._id,
      email: user.email,
      loginType: "email",
    };

    return handleSuccess({
      statusCode: HttpStatus.CREATED,
      message: "Account created successfully.",
      data: {
        token: this.jwtService.sign(payload),
        user,
      },
    });
  }

  async login(body: LoginDto) {
    const { email, password, device_type, device_token } = body;

    const user = await this.userModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user || !user.password) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Update device info
    user.device_type = device_type ?? user.device_type;
    user.device_token = device_token ?? user.device_token;
    await user.save();

    const payload = {
      sub: user._id,
      email: user.email,
      loginType: "email",
    };

    return handleSuccess({
      statusCode: HttpStatus.OK,
      message: "Login successful.",
      data: {
        token: this.jwtService.sign(payload),
        user,
      },
    });
  }

  async checkEmail(body: CheckEmailDto) {
    const email = body.email.toLowerCase();
    const user = await this.userModel.findOne({ email }).select("_id");
    return {
      statusCode: 200,
      message: "Data fetched successfully",
      exists: !!user,
    };
  }

  async getProfile(userId: string) {
    if (!userId) throw new NotFoundException("User id is required");

    // find user, remove password and mongoose internal fields
    const user = await this.userModel
      .findById(userId)
      .select("-password -__v")
      .lean();

    if (!user) {
      throw new NotFoundException("The requested user does not exist.");
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Profile fetched successfully.",
      data: { user },
    };
  }

  async editProfile(userId: string, body: any) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException("The requested user does not exist.");
    }
    if (body?.name) user.name = body.name;
    if (body?.image) user.image = body.image;
    if (body?.email) user.email = body.email.toLowerCase();
    if (body?.dob) user.dob = new Date(body.dob);
    if (body?.device_type) user.device_type = body.device_type;
    if (body?.device_token) user.device_token = body.device_token;

    await user.save();
    return {
      statusCode: HttpStatus.OK,
      message: "Profile updated successfully",
      data: user,
    };
  }

  async toggleNotificationUser(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException("The requested user does not exist.");
    }
    user.isNotification = !user.isNotification;
    await user.save();
    return user;
  }

  async logout(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException("The requested user does not exist.");
    }

    // Clear device token
    user.device_token = "";

    await user.save();

    return {
      statusCode: HttpStatus.OK,
      message: "User logged out successfully",
      data: [],
    };
  }

  async getAllUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userModel
        .find()
        .select("-password -__v")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      this.userModel.countDocuments({ isDeleted: false }),
    ]);

    return {
      statusCode: HttpStatus.OK,
      message: "Users fetched successfully.",
      data: {
        users,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    }
  }
}