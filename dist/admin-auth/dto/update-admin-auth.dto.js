"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_admin_auth_dto_1 = require("./create-admin-auth.dto");
class UpdateAdminAuthDto extends (0, swagger_1.PartialType)(create_admin_auth_dto_1.CreateAdminAuthDto) {
}
exports.UpdateAdminAuthDto = UpdateAdminAuthDto;
//# sourceMappingURL=update-admin-auth.dto.js.map