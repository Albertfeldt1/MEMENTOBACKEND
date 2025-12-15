import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminAuth ,AdminAuthDocument} from './entities/admin-auth.entity';
import { CreateAdminAuthDto } from './dto/create-admin-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(AdminAuth.name) private adminModel: Model<AdminAuthDocument>,
    private jwtService: JwtService,
  ) {}

  async create(createAdminAuthDto: CreateAdminAuthDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createAdminAuthDto.password, saltOrRounds);

    const createdAdmin = new this.adminModel({
      ...createAdminAuthDto,
      password: hashedPassword,
    });

    await createdAdmin.save();

    return {
      statusCode: 201,
      message: 'Admin created successfully',
      data: createdAdmin,
    };
  }

  async login(email: string, password: string) {
    const admin = await this.adminModel.findOne({ email });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin._id, email: admin.email };
    const token = this.jwtService.sign(payload);

    return {
      statusCode: 200,
      message: 'Login successful',
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    };
  }

   async getAdmin(adminId: string) {
    const admin = await this.adminModel.findById(adminId).select('-password');

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return {
      statusCode: 200,
      message: 'Admin retrieved successfully',
      data: admin,
    };
  }
}
