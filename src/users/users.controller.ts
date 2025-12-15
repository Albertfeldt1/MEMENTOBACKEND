import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Get,
  UseGuards,
  Request,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  Put,
  Query,
  HttpStatus,
  Render,
  Delete,
  UploadedFiles,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { SocialLoginDto } from './dto/social-login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadHelper } from 'src/helper/upload.helper';

import { EditProfileDto } from './dto/edit-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('social-login')
  async socialLogin(@Body() body: SocialLoginDto) {
    return this.usersService.socialLogin(body);
  }
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file', imageUploadHelper))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'No file uploaded',
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'File uploaded successfully',
      data: {
        fileName: file.filename,
        path: `/uploads/${file.filename}`,
      },
    };
  }

  @Put('edit-profile')
  @UseGuards(JwtAuthGuard)
  async editProfile(@Request() req, @Body() body: EditProfileDto) {
    const userId = req.user.userId; // from JWT
    return this.usersService.editProfile(userId, body);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req) {
    const userId = req.user.userId; // JWT payload contains 'sub'
    return this.usersService.logout(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // your JWT payload sets `sub: user._id` in socialLogin
    const userId = req.user.userId;
    return this.usersService.getProfile(userId);
  }
}
