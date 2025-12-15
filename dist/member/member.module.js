"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberModule = void 0;
const common_1 = require("@nestjs/common");
const member_service_1 = require("./member.service");
const member_controller_1 = require("./member.controller");
const schedule_1 = require("@nestjs/schedule");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../users/user.schema");
const member_entity_1 = require("./entities/member.entity");
const payments_scheduler_service_1 = require("./payments-scheduler.service");
let MemberModule = class MemberModule {
};
exports.MemberModule = MemberModule;
exports.MemberModule = MemberModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: member_entity_1.Member.name, schema: member_entity_1.MemberSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            schedule_1.ScheduleModule.forRoot(),
            jwt_1.JwtModule.register({
                secret: 'your-secret-key',
                signOptions: { expiresIn: '360d' },
            }),
        ],
        controllers: [member_controller_1.MemberController],
        providers: [member_service_1.MemberService, payments_scheduler_service_1.PaymentsSchedulerService],
    })
], MemberModule);
//# sourceMappingURL=member.module.js.map