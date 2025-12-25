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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventReminderSchema = exports.EventReminder = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let EventReminder = class EventReminder {
};
exports.EventReminder = EventReminder;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Event' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], EventReminder.prototype, "eventId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], EventReminder.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], EventReminder.prototype, "fireAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], EventReminder.prototype, "isSent", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventReminder.prototype, "type", void 0);
exports.EventReminder = EventReminder = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], EventReminder);
exports.EventReminderSchema = mongoose_1.SchemaFactory.createForClass(EventReminder);
//# sourceMappingURL=event-reminder.schema.js.map