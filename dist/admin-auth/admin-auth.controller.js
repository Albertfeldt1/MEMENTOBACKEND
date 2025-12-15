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
exports.AdminAuthController = void 0;
const common_1 = require("@nestjs/common");
const admin_auth_service_1 = require("./admin-auth.service");
const create_admin_auth_dto_1 = require("./dto/create-admin-auth.dto");
const users_service_1 = require("../users/users.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let AdminAuthController = class AdminAuthController {
    constructor(adminAuthService, usersService) {
        this.adminAuthService = adminAuthService;
        this.usersService = usersService;
    }
    create(createAdminAuthDto) {
        return this.adminAuthService.create(createAdminAuthDto);
    }
    login(body) {
        return this.adminAuthService.login(body.email, body.password);
    }
    async getAdmin(req) {
        console.log(req.user.userId);
        return this.adminAuthService.getAdmin(req.user.userId);
    }
};
exports.AdminAuthController = AdminAuthController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_auth_dto_1.CreateAdminAuthDto]),
    __metadata("design:returntype", void 0)
], AdminAuthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('loginAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminAuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getAdmin'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "getAdmin", null);
exports.AdminAuthController = AdminAuthController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_auth_service_1.AdminAuthService,
        users_service_1.UsersService])
], AdminAuthController);
//# sourceMappingURL=admin-auth.controller.js.map