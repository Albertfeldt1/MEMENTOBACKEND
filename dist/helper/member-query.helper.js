"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMemberQuery = void 0;
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const buildMemberQuery = (userId, search, filterType, startDate, endDate, paymentStatus) => {
    const userObjectId = new mongoose_1.Types.ObjectId(userId);
    const query = { userId: userObjectId };
    if (search && search.trim() !== '') {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [{ memberName: regex }, { phoneNumber: regex }];
    }
    let start;
    let end;
    if (filterType) {
        const today = (0, moment_1.default)().startOf('day');
        switch (filterType.toLowerCase()) {
            case 'today':
                start = today.toDate();
                end = (0, moment_1.default)(today).endOf('day').toDate();
                break;
            case 'week':
                start = (0, moment_1.default)().startOf('week').toDate();
                end = (0, moment_1.default)().endOf('week').toDate();
                break;
            case 'month':
                start = (0, moment_1.default)().startOf('month').toDate();
                end = (0, moment_1.default)().endOf('month').toDate();
                break;
            case 'year':
                start = (0, moment_1.default)().startOf('year').toDate();
                end = (0, moment_1.default)().endOf('year').toDate();
                break;
        }
    }
    else if (startDate && endDate) {
        start = new Date(startDate);
        end = new Date(endDate);
    }
    if (start && end) {
        query.createdAt = { $gte: start, $lte: end };
    }
    if (paymentStatus === 'paid') {
        query.paidAmount = { $gt: 0 };
    }
    else if (paymentStatus === 'pending') {
        query.pendingAmount = { $gt: 0 };
    }
    return query;
};
exports.buildMemberQuery = buildMemberQuery;
//# sourceMappingURL=member-query.helper.js.map