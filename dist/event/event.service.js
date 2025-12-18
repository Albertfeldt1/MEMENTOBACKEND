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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_entity_1 = require("./entities/event.entity");
let EventService = class EventService {
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    async create(userId, dto) {
        const data = await this.eventModel.create({
            userId: new mongoose_2.Types.ObjectId(userId),
            ...dto,
            date: new Date(dto.date),
        });
        const response = {
            statusCode: common_1.HttpStatus.OK,
            message: "Event created successfully",
            data,
        };
        return response;
    }
    async findAll(userId) {
        const data = await this.eventModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate("userId", "-password")
            .sort({ createdAt: -1 });
        const response = {
            statusCode: common_1.HttpStatus.OK,
            message: "All events fetched successfully",
            data,
        };
        return response;
    }
    async findById(userId, eventId) {
        const event = await this.eventModel
            .findOne({
            _id: new mongoose_2.Types.ObjectId(eventId),
            userId: new mongoose_2.Types.ObjectId(userId),
        })
            .populate("userId", "-password");
        if (!event) {
            throw new common_1.NotFoundException("Event not found");
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Event details fetched successfully",
            data: event,
        };
    }
    async update(id, dto) {
        const event = await this.eventModel.findByIdAndUpdate(id, dto, {
            new: true,
        });
        if (!event)
            throw new common_1.NotFoundException("Event not found");
        return event;
    }
    async delete(id) {
        const event = await this.eventModel.findByIdAndDelete(id);
        if (!event)
            throw new common_1.NotFoundException("Event not found");
        return { message: "Event deleted successfully" };
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_entity_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventService);
//# sourceMappingURL=event.service.js.map