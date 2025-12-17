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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const social_login_dto_1 = require("./dto/social-login.dto");
const platform_express_1 = require("@nestjs/platform-express");
const upload_helper_1 = require("../helper/upload.helper");
const edit_profile_dto_1 = require("./dto/edit-profile.dto");
const check_email_dto_1 = require("./dto/check-email.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async socialLogin(body) {
        return this.usersService.socialLogin(body);
    }
    async uploadImage(file) {
        if (!file) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "No file uploaded",
            };
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "File uploaded successfully",
            data: {
                fileName: file.filename,
                path: `/uploads/${file.filename}`,
            },
        };
    }
    async editProfile(req, body) {
        const userId = req.user.userId;
        return this.usersService.editProfile(userId, body);
    }
    async logout(req) {
        const userId = req.user.userId;
        return this.usersService.logout(userId);
    }
    async checkEmail(body) {
        return this.usersService.checkEmail(body);
    }
    async getProfile(req) {
        const userId = req.user.userId;
        return this.usersService.getProfile(userId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)("social-login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [social_login_dto_1.SocialLoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "socialLogin", null);
__decorate([
    (0, common_1.Post)("upload-image"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", upload_helper_1.imageUploadHelper)),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Put)("edit-profile"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_profile_dto_1.EditProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editProfile", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)("check-email"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_email_dto_1.CheckEmailDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkEmail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("profile"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map