import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query, Put } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { CreateAdminAuthDto } from './dto/create-admin-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('admin')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService,
    private readonly usersService: UsersService
  ) { }

  @Post()
  create(@Body() createAdminAuthDto: CreateAdminAuthDto) {
    return this.adminAuthService.create(createAdminAuthDto);
  }

  @Post('loginAdmin')
  login(@Body() body: { email: string; password: string }) {
    return this.adminAuthService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAdmin')
  async getAdmin(@Request() req: any) {
    console.log(req.user.userId)
    return this.adminAuthService.getAdmin(req.user.userId);
  }


}
