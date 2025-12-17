import { HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SocialLoginDto } from "./dto/social-login.dto";
import { EditProfileDto } from "./dto/edit-profile.dto";
import { RegisterDto } from "./dto/register-profile.dto";
import { LoginDto } from "./dto/login.dto";
import { CheckEmailDto } from "./dto/check-email.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
    socialLogin(body: SocialLoginDto): Promise<import("../utility/response.helper").ResponseStructure<{
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
