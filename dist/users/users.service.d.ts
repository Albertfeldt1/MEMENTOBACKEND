import { Model } from "mongoose";
import { User } from "./user.schema";
import { JwtService } from "@nestjs/jwt";
import { NotificationsService } from "src/notification/notification.service";
import { HttpStatus } from "@nestjs/common";
import { SocialLoginDto } from "./dto/social-login.dto";
import { RegisterDto } from "./dto/register-profile.dto";
import { LoginDto } from "./dto/login.dto";
import { CheckEmailDto } from "./dto/check-email.dto";
export declare class UsersService {
    private userModel;
    private jwtService;
    private notificationsService;
    constructor(userModel: Model<User>, jwtService: JwtService, notificationsService: NotificationsService);
    socialLogin(body: SocialLoginDto): Promise<import("src/utility/response.helper").ResponseStructure<{
        statusCode: HttpStatus;
        message: string;
        data: {
            token: string;
            user: import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            };
        };
    }>>;
    register(body: RegisterDto): Promise<import("src/utility/response.helper").ResponseStructure<{
        statusCode: HttpStatus;
        message: string;
        data: {
            token: string;
            user: import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            };
        };
    }>>;
    login(body: LoginDto): Promise<import("src/utility/response.helper").ResponseStructure<{
        statusCode: HttpStatus;
        message: string;
        data: {
            token: string;
            user: import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            };
        };
    }>>;
    checkEmail(body: CheckEmailDto): Promise<{
        statusCode: number;
        message: string;
        exists: boolean;
    }>;
    getProfile(userId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            user: import("mongoose").FlattenMaps<User> & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            };
        };
    }>;
    editProfile(userId: string, body: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    logout(userId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: never[];
    }>;
}
