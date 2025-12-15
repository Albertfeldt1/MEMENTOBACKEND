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
exports.BusinessService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const business_entity_1 = require("./entities/business.entity");
let BusinessService = class BusinessService {
    constructor(businessModel) {
        this.businessModel = businessModel;
    }
    async createBusiness(userId, body) {
        const { businessName, ownerName } = body;
        if (!businessName || !ownerName) {
            throw new common_1.NotFoundException('businessName and ownerName are required');
        }
        const newBusiness = await this.businessModel.create({
            businessName,
            ownerName,
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Business created successfully',
            data: newBusiness,
        };
    }
    async getUserBusinesses(userId) {
        const userObjectId = new mongoose_2.default.Types.ObjectId(userId);
        const businesses = await this.businessModel.find({ userId: userObjectId });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Businesses fetched successfully',
            data: businesses,
        };
    }
    async createOrUpdateBusiness(userId, data, businessId) {
        if (businessId) {
            const updated = await this.businessModel.findByIdAndUpdate(businessId, data, { new: true });
            if (!updated) {
                throw new common_1.NotFoundException('Business not found.');
            }
            return {
                statusCode: 200,
                message: 'Business updated successfully.',
                data: updated,
            };
        }
        const newBusiness = await this.businessModel.create({
            ...data,
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        return {
            statusCode: 201,
            message: 'Business created successfully.',
            data: newBusiness,
        };
    }
    async deleteBusiness(businessId) {
        const business = await this.businessModel.findByIdAndDelete(businessId);
        if (!business) {
            throw new common_1.NotFoundException('Business not found or already deleted.');
        }
        return {
            statusCode: 200,
            message: 'Business deleted successfully.',
            data: []
        };
    }
};
exports.BusinessService = BusinessService;
exports.BusinessService = BusinessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(business_entity_1.Business.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BusinessService);
//# sourceMappingURL=business.service.js.map