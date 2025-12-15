import { Model } from 'mongoose';
import { AdminAuth, AdminAuthDocument } from './entities/admin-auth.entity';
import { CreateAdminAuthDto } from './dto/create-admin-auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AdminAuthService {
    private adminModel;
    private jwtService;
    constructor(adminModel: Model<AdminAuthDocument>, jwtService: JwtService);
    create(createAdminAuthDto: CreateAdminAuthDto): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, AdminAuthDocument, {}, {}> & AdminAuth & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    login(email: string, password: string): Promise<{
        statusCode: number;
        message: string;
        token: string;
        admin: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
        };
    }>;
    getAdmin(adminId: string): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, AdminAuthDocument, {}, {}> & AdminAuth & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
