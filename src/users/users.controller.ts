import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Put,
  HttpStatus,
  HttpCode,
  Patch,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

import { SocialLoginDto } from "./dto/social-login.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageUploadHelper } from "src/helper/upload.helper";

import { EditProfileDto } from "./dto/edit-profile.dto";
import { RegisterDto } from "./dto/register-profile.dto";
import { LoginDto } from "./dto/login.dto";
import { CheckEmailDto } from "./dto/check-email.dto";

import { I18nService } from "nestjs-i18n";

@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly i18n: I18nService
  ) {}

  @Get("get-all-users")
  async getAllUsers(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.usersService.getAllUsers(Number(page), Number(limit));
  }

  @Post("social-login")
  async socialLogin(@Body() body: SocialLoginDto) {
    return this.usersService.socialLogin(body);
  }
  @Post("upload-image")
  @UseInterceptors(FileInterceptor("file", imageUploadHelper))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: await this.i18n.translate('common.NO_FILE_UPLOADED')
      };
    }
    return {
      statusCode: HttpStatus.OK,
       message: await this.i18n.translate('common.FILE_UPLOAD_SUCCESS'),
      data: {
        fileName: file.filename,
        path: `/uploads/${file.filename}`,
      },
    };
  }

  @Post("register")
  async register(@Body() body: RegisterDto) {
    return this.usersService.register(body);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    return this.usersService.login(body);
  }

  @Put("edit-profile")
  @UseGuards(JwtAuthGuard)
  async editProfile(@Request() req, @Body() body: EditProfileDto) {
    const userId = req.user.userId;
    return this.usersService.editProfile(userId, body);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req) {
    const userId = req.user.userId;
    return this.usersService.logout(userId);
  }

  @Post("check-email")
  @HttpCode(HttpStatus.OK)
  async checkEmail(@Body() body: CheckEmailDto) {
    return this.usersService.checkEmail(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("toggle-notification")
  async toggleNotificationUser(@Request() req: any) {
    const user = await this.usersService.toggleNotificationUser(
      req.user.userId
    );
    return {
      statusCode: 200,
      message: user.isNotification
        ? await this.i18n.translate('common.NOTIFICATIONS_ENABLED')
        : await this.i18n.translate('common.NOTIFICATIONS_DISABLED'),
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    // your JWT payload sets `sub: user._id` in socialLogin
    const userId = req.user.userId;
    return this.usersService.getProfile(userId);
  }
}
