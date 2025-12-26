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
const nestjs_i18n_1 = require("nestjs-i18n");
const event_entity_1 = require("./entities/event.entity");
const user_schema_1 = require("../users/user.schema");
const reminders_service_1 = require("../reminders/reminders.service");
const notification_service_1 = require("../notification/notification.service");
const notification_entity_1 = require("../notifications/entities/notification.entity");
let EventService = class EventService {
    constructor(eventModel, notificationModel, userModel, i18n, notificationsService, remindersService) {
        this.eventModel = eventModel;
        this.notificationModel = notificationModel;
        this.userModel = userModel;
        this.i18n = i18n;
        this.notificationsService = notificationsService;
        this.remindersService = remindersService;
    }
    async create(userId, dto) {
        const [hours, minutes] = dto.time.split(":").map(Number);
        const istDate = new Date(dto.date);
        istDate.setHours(hours, minutes, 0, 0);
        const utcDate = new Date(istDate.getTime() - 5.5 * 60 * 60 * 1000);
        const event = await this.eventModel.create({
            userId: new mongoose_2.Types.ObjectId(userId),
            title: dto.title,
            image: dto.image,
            date: utcDate,
            time: dto.time,
            location: dto.location,
        });
        const userData = await this.userModel.findById(userId);
        if (!userData) {
            throw new common_1.NotFoundException('User Not Found');
        }
        const token = userData?.device_token;
        await this.notificationsService.sendPushNotification(token, "Event Reminder", `New Event created`);
        await this.notificationModel.create({
            userId: new mongoose_2.Types.ObjectId(userId),
            title: "Event Reminder",
            message: `New Event Created`,
        });
        await this.remindersService.createEventReminders(event._id, userId, utcDate);
        return {
            statusCode: 200,
            message: "Event created successfully",
            data: event,
        };
    }
    async findAll(userId) {
        const data = await this.eventModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate("userId", "-password")
            .sort({ createdAt: -1 });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: await this.i18n.translate("common.EVENTS_FETCHED"),
            data,
        };
    }
    async findById(userId, eventId) {
        const event = await this.eventModel
            .findOne({
            _id: new mongoose_2.Types.ObjectId(eventId),
            userId: new mongoose_2.Types.ObjectId(userId),
        })
            .populate("userId", "-password");
        if (!event) {
            throw new common_1.NotFoundException(await this.i18n.translate("common.EVENT_NOT_FOUND"));
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: await this.i18n.translate("common.EVENT_DETAILS_FETCHED"),
            data: event,
        };
    }
    async update(id, dto) {
        const event = await this.eventModel.findByIdAndUpdate(id, dto, {
            new: true,
        });
        if (!event) {
            throw new common_1.NotFoundException(await this.i18n.translate("common.EVENT_NOT_FOUND"));
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: await this.i18n.translate("common.DATA_FETCHED"),
            data: event,
        };
    }
    async delete(id) {
        const event = await this.eventModel.findByIdAndDelete(id);
        if (!event) {
            throw new common_1.NotFoundException(await this.i18n.translate("common.EVENT_NOT_FOUND"));
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: await this.i18n.translate("common.EVENT_DELETED"),
        };
    }
    async updateEvent(userId, eventId, dto) {
        const event = await this.eventModel.findOneAndUpdate({
            _id: new mongoose_2.Types.ObjectId(eventId),
            userId: new mongoose_2.Types.ObjectId(userId),
        }, {
            ...dto,
            ...(dto.date && { date: new Date(dto.date) }),
        }, { new: true });
        if (!event) {
            throw new common_1.NotFoundException(await this.i18n.translate("common.EVENT_NOT_FOUND"));
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: await this.i18n.translate("common.EVENT_UPDATED"),
            data: event,
        };
    }
    async deleteEvent(userId, eventId) {
        const event = await this.eventModel.findOneAndDelete({
            _id: new mongoose_2.Types.ObjectId(eventId),
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        if (!event) {
            throw new common_1.NotFoundException(await this.i18n.translate("common.EVENT_NOT_FOUND"));
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: await this.i18n.translate("common.EVENT_DELETED"),
            data: [],
        };
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_entity_1.Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(notification_entity_1.Notification.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        nestjs_i18n_1.I18nService,
        notification_service_1.NotificationsService,
        reminders_service_1.RemindersService])
], EventService);
//# sourceMappingURL=event.service.js.map