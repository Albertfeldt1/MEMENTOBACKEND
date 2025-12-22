"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const mongoose_1 = require("mongoose");
const user_schema_1 = require("./user.schema");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("@nestjs/mongoose");
const notification_service_1 = require("../notification/notification.service");
const common_1 = require("@nestjs/common");
const response_helper_1 = require("../utility/response.helper");
let UsersService = class UsersService {
    constructor(userModel, jwtService, notificationsService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.notificationsService = notificationsService;
    }
    async socialLogin(body) {
        const { socialId, email, name, device_type, device_token } = body;
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
            return (0, response_helper_1.handleSuccess)({
                statusCode: common_1.HttpStatus.OK,
                message: "Login successful.",
                data: {
                    token: this.jwtService.sign(payload),
                    user,
                },
            });
        }
        if (email) {
            user = await this.userModel.findOne({
                email: email.toLowerCase(),
            });
            if (user) {
                user.socialId = socialId;
                user.device_type = device_type ?? user.device_type;
                user.device_token = device_token ?? user.device_token;
                if (!user.name && name) {
                    user.name = name;
                }
                await user.save();
                const payload = {
                    sub: user._id,
                    email: user.email,
                    loginType: "social",
                };
                return (0, response_helper_1.handleSuccess)({
                    statusCode: common_1.HttpStatus.OK,
                    message: "Social account linked successfully.",
                    data: {
                        token: this.jwtService.sign(payload),
                        user,
                    },
                });
            }
        }
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
        return (0, response_helper_1.handleSuccess)({
            statusCode: common_1.HttpStatus.CREATED,
            message: "Account created using social login.",
            data: {
                token: this.jwtService.sign(payload),
                user,
            },
        });
    }
    async register(body) {
        const { email, password, name, device_type, device_token } = body;
        const existingUser = await this.userModel.findOne({
            email: email.toLowerCase(),
        });
        if (existingUser) {
            throw new common_1.ConflictException("Email already registered");
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
        return (0, response_helper_1.handleSuccess)({
            statusCode: common_1.HttpStatus.CREATED,
            message: "Account created successfully.",
            data: {
                token: this.jwtService.sign(payload),
                user,
            },
        });
    }
    async login(body) {
        const { email, password, device_type, device_token } = body;
        const user = await this.userModel.findOne({
            email: email.toLowerCase(),
        });
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException("Invalid email or password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException("Invalid email or password");
        }
        user.device_type = device_type ?? user.device_type;
        user.device_token = device_token ?? user.device_token;
        await user.save();
        const payload = {
            sub: user._id,
            email: user.email,
            loginType: "email",
        };
        return (0, response_helper_1.handleSuccess)({
            statusCode: common_1.HttpStatus.OK,
            message: "Login successful.",
            data: {
                token: this.jwtService.sign(payload),
                user,
            },
        });
    }
    async checkEmail(body) {
        const email = body.email.toLowerCase();
        const user = await this.userModel.findOne({ email }).select("_id");
        return {
            statusCode: 200,
            message: "Data fetched successfully",
            exists: !!user,
        };
    }
    async getProfile(userId) {
        if (!userId)
            throw new common_1.NotFoundException("User id is required");
        const user = await this.userModel
            .findById(userId)
            .select("-password -__v")
            .lean();
        if (!user) {
            throw new common_1.NotFoundException("The requested user does not exist.");
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Profile fetched successfully.",
            data: { user },
        };
    }
    async editProfile(userId, body) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException("The requested user does not exist.");
        }
        if (body?.name)
            user.name = body.name;
        if (body?.image)
            user.image = body.image;
        if (body?.email)
            user.email = body.email.toLowerCase();
        if (body?.dob)
            user.dob = new Date(body.dob);
        if (body?.device_type)
            user.device_type = body.device_type;
        if (body?.device_token)
            user.device_token = body.device_token;
        await user.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Profile updated successfully",
            data: user,
        };
    }
    async toggleNotificationUser(userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException("The requested user does not exist.");
        }
        user.isNotification = !user.isNotification;
        await user.save();
        return user;
    }
    async logout(userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException("The requested user does not exist.");
        }
        user.device_token = "";
        await user.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "User logged out successfully",
            data: [],
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService,
        notification_service_1.NotificationsService])
], UsersService);
//# sourceMappingURL=users.service.js.map