import { AdminAuthService } from './admin-auth.service';
import { CreateAdminAuthDto } from './dto/create-admin-auth.dto';
import { UsersService } from 'src/users/users.service';
export declare class AdminAuthController {
    private readonly adminAuthService;
    private readonly usersService;
    constructor(adminAuthService: AdminAuthService, usersService: UsersService);
    create(createAdminAuthDto: CreateAdminAuthDto): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/admin-auth.entity").AdminAuthDocument, {}, {}> & import("./entities/admin-auth.entity").AdminAuth & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        statusCode: number;
        message: string;
        token: string;
        admin: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
        };
    }>;
    getAdmin(req: any): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/admin-auth.entity").AdminAuthDocument, {}, {}> & import("./entities/admin-auth.entity").AdminAuth & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
