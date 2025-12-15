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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const page_entity_1 = require("./entities/page.entity");
let PagesService = class PagesService {
    constructor(pageModel) {
        this.pageModel = pageModel;
    }
    async create(createPageDto) {
        const page = new this.pageModel(createPageDto);
        const savedPage = await page.save();
        return {
            statusCode: 201,
            message: 'Page created successfully',
            data: savedPage,
        };
    }
    async findAll() {
        const pages = await this.pageModel.find().sort({ createdAt: 1 });
        return {
            statusCode: 200,
            message: 'All pages fetched successfully',
            data: pages,
        };
    }
    async findByType(type) {
        const page = await this.pageModel.findOne({ type });
        if (!page)
            throw new common_1.NotFoundException(`Page with type '${type}' not found`);
        return {
            statusCode: 200,
            message: 'Page fetched successfully',
            data: page,
        };
    }
    async update(id, updatePageDto) {
        const updatedPage = await this.pageModel.findByIdAndUpdate(id, { $set: updatePageDto }, { new: true });
        if (!updatedPage)
            throw new common_1.NotFoundException('Page not found');
        return {
            statusCode: 200,
            message: 'Page updated successfully',
            data: updatedPage,
        };
    }
    async remove(id) {
        const deletedPage = await this.pageModel.findByIdAndDelete(id);
        if (!deletedPage)
            throw new common_1.NotFoundException('Page not found');
        return {
            statusCode: 200,
            message: 'Page deleted successfully',
        };
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(page_entity_1.Page.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PagesService);
//# sourceMappingURL=pages.service.js.map