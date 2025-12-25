import { HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SocialLoginDto } from "./dto/social-login.dto";
import { EditProfileDto } from "./dto/edit-profile.dto";
import { RegisterDto } from "./dto/register-profile.dto";
import { LoginDto } from "./dto/login.dto";
import { CheckEmailDto } from "./dto/check-email.dto";
import { I18nService } from "nestjs-i18n";
export declare class UsersController {
    private usersService;
    private readonly i18n;
    constructor(usersService: UsersService, i18n: I18nService);
    getAllUsers(page?: number, limit?: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            users: (import("mongoose").FlattenMaps<import("./user.schema").User> & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            })[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                totalPages: number;
            };
        };
    }>;
    socialLogin(body: SocialLoginDto): Promise<import("../utility/response.helper").ResponseStructure<{
        statusCode: HttpStatus;
        message: string;
        data: {
            token: string;
            user: any;
        };
    }>>;
    uploadImage(file: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: {
            fileName: string;
            path: string;
        };
    }>;
    sendTestNotification(deviceToken: string): Promise<{
        success: boolean;
        message: string;
        response: string;
    } | {
        success: boolean;
        message: any;
        response?: undefined;
    }>;
    register(body: RegisterDto): Promise<import("../utility/response.helper").ResponseStructure<{
        statusCode: HttpStatus;
        message: string;
        data: {
            token: string;
            user: import("mongoose").Document<unknown, {}, import("./user.schema").User, {}, {}> & import("./user.schema").User & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            };
        };
    }>>;
    login(body: LoginDto): Promise<import("../utility/response.helper").ResponseStructure<{
        statusCode: HttpStatus;
        message: string;
        data: {
            token: string;
            user: import("mongoose").Document<unknown, {}, import("./user.schema").User, {}, {}> & import("./user.schema").User & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            };
        };
    }>>;
    editProfile(req: any, body: EditProfileDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./user.schema").User, {}, {}> & import("./user.schema").User & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    logout(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: never[];
    }>;
    checkEmail(body: CheckEmailDto): Promise<{
        statusCode: number;
        message: string;
        exists: boolean;
    }>;
    toggleNotificationUser(req: any): Promise<{
        statusCode: number;
        message: string;
        data: import("./user.schema").User;
    }>;
    getProfile(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            user: import("mongoose").FlattenMaps<import("./user.schema").User> & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            };
        };
    }>;
}
