"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
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
            const payload = { ...user, sub: user._id };
            const access_token = this.jwtService.sign(payload);
            user.device_type = device_type ?? user.device_type ?? '';
            user.device_token = device_token ?? user.device_token ?? '';
            await user.save();
            return (0, response_helper_1.handleSuccess)({
                statusCode: common_1.HttpStatus.OK,
                message: 'Login successful.',
                data: { token: access_token, user },
            });
        }
        if (email) {
            const emailExists = await this.userModel.findOne({ email });
            if (emailExists)
                throw new common_1.ConflictException('This email is already registered with another account.');
        }
        user = await this.userModel.create({
            name: name ?? '',
            email: email ?? '',
            socialId,
            device_type,
            device_token,
        });
        const payload = { ...user, sub: user._id };
        const access_token = this.jwtService.sign(payload);
        return (0, response_helper_1.handleSuccess)({
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Account created using social login.',
            data: { token: access_token, user },
        });
    }
    async getProfile(userId) {
        if (!userId)
            throw new common_1.NotFoundException('User id is required');
        const user = await this.userModel
            .findById(userId)
            .select('-password -__v')
            .lean();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Profile fetched successfully.',
            data: { user },
        };
    }
    async editProfile(userId, body) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (body?.name)
            user.name = body.name;
        if (body?.email)
            user.email = body.email.toLowerCase();
        if (body?.dob)
            user.dob = new Date(body.dob);
        if (body?.device_type)
            user.device_type = body.device_type;
        if (body?.device_token)
            user.device_token = body.device_token;
        if (body?.qrCode)
            user.qrCode = body.qrCode;
        await user.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Profile updated successfully',
            data: user,
        };
    }
    async logout(userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.device_token = '';
        await user.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'User logged out successfully',
            data: []
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