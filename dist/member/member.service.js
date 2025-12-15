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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const member_entity_1 = require("./entities/member.entity");
const constant_message_1 = __importDefault(require("../utility/constant.message"));
const moment_1 = __importDefault(require("moment"));
let MemberService = class MemberService {
    constructor(memberModel) {
        this.memberModel = memberModel;
    }
    monthsBetweenInclusive(start, end) {
        const sy = start.getUTCFullYear();
        const sm = start.getUTCMonth();
        const ey = end.getUTCFullYear();
        const em = end.getUTCMonth();
        return (ey - sy) * 12 + (em - sm) + 1;
    }
    parseBoolean(v) {
        if (typeof v === 'boolean')
            return v;
        if (typeof v === 'string') {
            const s = v.toLowerCase().trim();
            return s === 'true' || s === '1' || s === 'yes';
        }
        return Boolean(v);
    }
    startOfMonthUTC(d) {
        return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1, 0, 0, 0, 0));
    }
    generatePaymentEntries(startDate, months, amount) {
        const entries = [];
        const baseUTC = this.startOfMonthUTC(startDate);
        for (let i = 0; i < Math.max(1, months); i++) {
            const d = new Date(Date.UTC(baseUTC.getUTCFullYear(), baseUTC.getUTCMonth() + i, 1, 0, 0, 0));
            entries.push({
                amount: Number(amount ?? 0),
                date: d,
                isPaid: false,
            });
        }
        return entries;
    }
    async createOrUpdate(userId, createMemberDto, memberId) {
        try {
            if (!userId)
                throw new common_1.BadRequestException('userId required');
            if (!mongoose_1.Types.ObjectId.isValid(userId))
                throw new common_1.BadRequestException('Invalid userId');
            const userObjectId = new mongoose_1.Types.ObjectId(userId);
            if (memberId) {
                if (!mongoose_1.Types.ObjectId.isValid(memberId)) {
                    return {
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: 'Invalid memberId',
                        data: [],
                    };
                }
                const existing = await this.memberModel.findById(memberId).lean();
                if (!existing) {
                    return {
                        statusCode: common_1.HttpStatus.NOT_FOUND,
                        message: 'Member not found.',
                        data: [],
                    };
                }
                const updatePayload = { ...createMemberDto };
                const updated = await this.memberModel
                    .findByIdAndUpdate(memberId, updatePayload, {
                    new: true,
                })
                    .lean();
                if (!updated)
                    throw new common_1.NotFoundException('Member not found');
                const oldRecurring = Boolean(existing.recurringMonthlyPayment);
                const newRecurring = this.parseBoolean(createMemberDto.recurringMonthlyPayment ??
                    existing.recurringMonthlyPayment);
                const amount = Number(createMemberDto.pendingAmount ?? existing.pendingAmount ?? 0);
                const nowUTC = this.startOfMonthUTC(new Date());
                if (!oldRecurring && newRecurring) {
                    const entries = this.generatePaymentEntries(nowUTC, 12, amount);
                    const existPH = Array.isArray(updated.paymentHistory)
                        ? updated.paymentHistory
                        : [];
                    const existingKeys = new Set(existPH.map((ph) => `${ph.date ? new Date(ph.date).getUTCFullYear() : ''}-${ph.date ? new Date(ph.date).getUTCMonth() : ''}`));
                    const toAdd = entries.filter((e) => !existingKeys.has(`${e.date.getUTCFullYear()}-${e.date.getUTCMonth()}`));
                    if (toAdd.length) {
                        await this.memberModel.updateOne({ _id: memberId }, { $push: { paymentHistory: { $each: toAdd } } });
                    }
                }
                else if (oldRecurring && !newRecurring) {
                    await this.memberModel.updateOne({ _id: memberId }, {
                        $pull: {
                            paymentHistory: { isPaid: false, date: { $gt: nowUTC } },
                        },
                    });
                }
                if (createMemberDto.admissionDate) {
                    const parsedDto = new Date(createMemberDto.admissionDate);
                    if (!isNaN(parsedDto.getTime())) {
                        const dtoAdmissionUTC = this.startOfMonthUTC(parsedDto);
                        const existingAdmissionUTC = existing.admissionDate
                            ? this.startOfMonthUTC(new Date(existing.admissionDate))
                            : null;
                        if (!existingAdmissionUTC ||
                            dtoAdmissionUTC < existingAdmissionUTC) {
                            const currentUTC = this.startOfMonthUTC(new Date());
                            const prevMonthUTC = new Date(Date.UTC(currentUTC.getUTCFullYear(), currentUTC.getUTCMonth() - 1, 1));
                            if (dtoAdmissionUTC <= prevMonthUTC) {
                                const monthsToAdd = this.monthsBetweenInclusive(dtoAdmissionUTC, prevMonthUTC);
                                const entries = this.generatePaymentEntries(dtoAdmissionUTC, monthsToAdd, amount);
                                const latest = await this.memberModel.findById(memberId).lean();
                                const latestPH = Array.isArray(latest?.paymentHistory)
                                    ? latest.paymentHistory
                                    : [];
                                const existingKeys = new Set(latestPH.map((ph) => `${ph.date ? new Date(ph.date).getUTCFullYear() : ''}-${ph.date ? new Date(ph.date).getUTCMonth() : ''}`));
                                const toAdd = entries.filter((e) => !existingKeys.has(`${e.date.getUTCFullYear()}-${e.date.getUTCMonth()}`));
                                if (toAdd.length) {
                                    await this.memberModel.updateOne({ _id: memberId }, { $push: { paymentHistory: { $each: toAdd } } });
                                }
                            }
                        }
                        else if (existingAdmissionUTC &&
                            dtoAdmissionUTC > existingAdmissionUTC) {
                            await this.memberModel.updateOne({ _id: memberId }, {
                                $pull: {
                                    paymentHistory: {
                                        isPaid: false,
                                        date: { $lt: dtoAdmissionUTC },
                                    },
                                },
                            });
                        }
                    }
                }
                const finalAfterUpdate = await this.memberModel
                    .findById(memberId)
                    .lean();
                if (!finalAfterUpdate) {
                    throw new common_1.NotFoundException('Member Not found after update');
                }
                const phArr = Array.isArray(finalAfterUpdate.paymentHistory)
                    ? finalAfterUpdate.paymentHistory
                    : [];
                const unpaid = phArr.filter((p) => !p.isPaid);
                const totalPendingAmount = unpaid.reduce((s, e) => s + Number(e.amount ?? 0), 0);
                await this.memberModel.updateOne({ _id: memberId }, { $set: { pendingAmount: totalPendingAmount, totalPendingAmount } });
                const final = await this.memberModel.findById(memberId).lean();
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Member updated successfully.',
                    data: final ?? {},
                };
            }
            if (!createMemberDto || typeof createMemberDto !== 'object') {
                return {
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Invalid payload',
                    data: [],
                };
            }
            const exists = await this.memberModel
                .findOne({
                phoneNumber: createMemberDto.phoneNumber ?? '',
            })
                .lean();
            if (exists) {
                return {
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: 'Member already exists.',
                    data: [],
                };
            }
            if (!createMemberDto.businessId) {
                return {
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'businessId required',
                    data: [],
                };
            }
            if (!mongoose_1.Types.ObjectId.isValid(createMemberDto.businessId)) {
                return {
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Invalid businessId',
                    data: [],
                };
            }
            const businessObjectId = new mongoose_1.Types.ObjectId(createMemberDto.businessId);
            const currentUTC = this.startOfMonthUTC(new Date());
            const amountOnDto = Number(createMemberDto.pendingAmount ?? 0);
            let admissionStartUTC = currentUTC;
            if (createMemberDto.admissionDate) {
                const parsed = new Date(createMemberDto.admissionDate);
                if (!isNaN(parsed.getTime())) {
                    admissionStartUTC = this.startOfMonthUTC(parsed);
                }
            }
            const prevMonthUTC = new Date(Date.UTC(currentUTC.getUTCFullYear(), currentUTC.getUTCMonth() - 1, 1));
            let monthsDiff = 1;
            if (admissionStartUTC <= prevMonthUTC) {
                monthsDiff = this.monthsBetweenInclusive(admissionStartUTC, prevMonthUTC);
            }
            else {
                monthsDiff = 1;
            }
            const paymentHistoryToSave = this.generatePaymentEntries(admissionStartUTC, monthsDiff, amountOnDto);
            const unpaidEntries = paymentHistoryToSave.filter((e) => !e.isPaid);
            const totalPendingAmount = unpaidEntries.reduce((sum, e) => sum + Number(e.amount ?? 0), 0);
            const created = await this.memberModel.create({
                ...createMemberDto,
                userId: userObjectId,
                businessId: businessObjectId,
                recurringMonthlyPayment: this.parseBoolean(createMemberDto.recurringMonthlyPayment),
                pendingAmount: totalPendingAmount,
                totalPendingAmount,
                paymentHistory: paymentHistoryToSave,
            });
            const saved = await this.memberModel.findById(created._id).lean();
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Member created successfully.',
                data: saved ?? {},
            };
        }
        catch (error) {
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong.',
                error: error.message,
                data: [],
            };
        }
    }
    async deleteMember(memberId) {
        try {
            const deleted = await this.memberModel.findByIdAndDelete(memberId);
            if (!deleted) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Member not found or already deleted.',
                    data: [],
                };
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Member deleted successfully.',
                data: [],
            };
        }
        catch (error) {
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to delete member.',
                error: error.message,
                data: [],
            };
        }
    }
    async findAll(userId, search, businessId, filterType, startDate, endDate, paymentStatus) {
        try {
            const userObjectId = new mongoose_1.Types.ObjectId(userId);
            const businessObjectId = businessId
                ? new mongoose_1.Types.ObjectId(businessId)
                : null;
            const baseQuery = { userId: userObjectId };
            if (businessObjectId)
                baseQuery.businessId = businessObjectId;
            const filterQuery = { ...baseQuery };
            if (search && search.trim() !== '') {
                const regex = new RegExp(search.trim(), 'i');
                filterQuery.$or = [{ memberName: regex }, { phoneNumber: regex }];
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
            if (startDate && endDate) {
                start = (0, moment_1.default)(startDate).startOf('day').toDate();
                end = (0, moment_1.default)(endDate).endOf('day').toDate();
            }
            if (start && end) {
                filterQuery.createdAt = { $gte: start, $lte: end };
            }
            if (paymentStatus === 'paid') {
                filterQuery.paidAmount = { $gt: 0 };
            }
            else if (paymentStatus === 'pending') {
                filterQuery.pendingAmount = { $gt: 0 };
            }
            const allMembers = await this.memberModel.find(baseQuery);
            const totalPaidAmount = allMembers.reduce((sum, m) => sum + (m.paidAmount || 0), 0);
            const totalPendingAmount = allMembers.reduce((sum, m) => sum + (m.pendingAmount || 0), 0);
            const totalPaidCount = allMembers.filter((m) => m.paidAmount > 0).length;
            const totalPendingCount = allMembers.filter((m) => m.pendingAmount > 0).length;
            const filteredMembers = await this.memberModel
                .find(filterQuery)
                .sort({ createdAt: -1 });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: constant_message_1.default.MEMBER.MEMBER_FETCH_SUCCESS,
                summary: {
                    totalPaidAmount,
                    totalPendingAmount,
                    totalPaidCount,
                    totalPendingCount,
                    totalMembers: allMembers.length,
                },
                data: filteredMembers,
            };
        }
        catch (error) {
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: constant_message_1.default.MEMBER.FAILED_TO_FETCH_MEMBERS,
                error: error.message,
                data: [],
            };
        }
    }
    async findOne(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Invalid member ID');
        }
        const member = await this.memberModel
            .findById(id)
            .populate('userId', 'name email');
        if (!member) {
            throw new common_1.NotFoundException('Member not found');
        }
        return member;
    }
    async update(id, updateMemberDto) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Invalid member ID');
        }
        const updatedMember = await this.memberModel.findByIdAndUpdate(id, updateMemberDto, {
            new: true,
            runValidators: true,
        });
        if (!updatedMember) {
            throw new common_1.NotFoundException('Member not found');
        }
        return updatedMember;
    }
    async remove(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Invalid member ID');
        }
        const deletedMember = await this.memberModel.findByIdAndDelete(id);
        if (!deletedMember) {
            throw new common_1.NotFoundException('Member not found');
        }
        return { message: 'Member deleted successfully' };
    }
    async markAllPaid(memberId) {
        const member = await this.memberModel.findById(memberId);
        const todayDate = new Date();
        if (!member) {
            return {
                statusCode: 404,
                message: 'Member not found',
            };
        }
        const previousPending = member.pendingAmount;
        if (previousPending <= 0) {
            return {
                statusCode: 400,
                message: 'No pending amount to mark as paid.',
                data: [],
            };
        }
        member.paymentHistory = member.paymentHistory.map((entry) => {
            if (!entry.isPaid) {
                entry.isPaid = true;
                entry.paymentDate = todayDate;
            }
            return entry;
        });
        member.paidAmount += previousPending;
        member.pendingAmount = 0;
        await member.save();
        return {
            statusCode: 200,
            message: 'All pending payments marked as paid.',
            data: member,
        };
    }
    async getPaymentSummaryByUserId(memberId) {
        if (!mongoose_1.Types.ObjectId.isValid(memberId)) {
            throw new common_1.BadRequestException('Invalid memberId');
        }
        const objectId = new mongoose_1.Types.ObjectId(memberId);
        const exists = await this.memberModel
            .findById(objectId)
            .select('_id')
            .lean()
            .exec();
        if (!exists) {
            return {
                memberId,
                totalPaidAmount: 0,
                totalPendingAmount: 0,
                months: [],
                debug: 'member-not-found',
            };
        }
        const pipeline = [
            { $match: { _id: objectId } },
            {
                $unwind: { path: '$paymentHistory', preserveNullAndEmptyArrays: true },
            },
            {
                $addFields: {
                    _paymentDate: {
                        $cond: [
                            { $ifNull: ['$paymentHistory.date', false] },
                            { $toDate: '$paymentHistory.date' },
                            null,
                        ],
                    },
                    _paymentAmount: { $ifNull: ['$paymentHistory.amount', 0] },
                    _paymentIsPaid: { $ifNull: ['$paymentHistory.isPaid', false] },
                    _paymentPaymentDate: {
                        $cond: [
                            { $ifNull: ['$paymentHistory.paymentDate', false] },
                            { $toDate: '$paymentHistory.paymentDate' },
                            null,
                        ],
                    },
                },
            },
            {
                $addFields: {
                    paymentMonth: {
                        $cond: [
                            { $ifNull: ['$_paymentDate', false] },
                            { $dateToString: { format: '%Y-%m', date: '$_paymentDate' } },
                            null,
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: '$paymentMonth',
                    monthTotalPaid: {
                        $sum: {
                            $cond: [{ $eq: ['$_paymentIsPaid', true] }, '$_paymentAmount', 0],
                        },
                    },
                    monthTotalPending: {
                        $sum: {
                            $cond: [
                                { $eq: ['$_paymentIsPaid', false] },
                                '$_paymentAmount',
                                0,
                            ],
                        },
                    },
                    payments: {
                        $push: {
                            _id: '$paymentHistory._id',
                            amount: '$_paymentAmount',
                            date: '$_paymentDate',
                            isPaid: '$_paymentIsPaid',
                            paymentDate: '$_paymentPaymentDate',
                        },
                    },
                    memberName: { $first: '$memberName' },
                    phoneNumber: { $first: '$phoneNumber' },
                    admissionDate: { $first: '$admissionDate' },
                    recurringMonthlyPayment: { $first: '$recurringMonthlyPayment' },
                    pendingAmount: { $first: '$pendingAmount' },
                    paidAmount: { $first: '$paidAmount' },
                },
            },
            { $sort: { _id: 1 } },
            {
                $group: {
                    _id: null,
                    totalPaidAmount: { $sum: '$monthTotalPaid' },
                    totalPendingAmount: { $sum: '$monthTotalPending' },
                    months: {
                        $push: {
                            month: '$_id',
                            paid: '$monthTotalPaid',
                            pending: '$monthTotalPending',
                            payments: '$payments',
                        },
                    },
                    memberName: { $first: '$memberName' },
                    phoneNumber: { $first: '$phoneNumber' },
                    admissionDate: { $first: '$admissionDate' },
                    recurringMonthlyPayment: { $first: '$recurringMonthlyPayment' },
                    pendingAmount: { $first: '$pendingAmount' },
                    paidAmount: { $first: '$paidAmount' },
                },
            },
            {
                $project: {
                    _id: 0,
                    memberName: 1,
                    phoneNumber: 1,
                    admissionDate: 1,
                    recurringMonthlyPayment: 1,
                    totalPaidAmount: { $round: ['$totalPaidAmount', 2] },
                    totalPendingAmount: { $round: ['$totalPendingAmount', 2] },
                    months: 1,
                },
            },
        ];
        let aggResult;
        try {
            aggResult = await this.memberModel.aggregate(pipeline).exec();
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Aggregation error: ' + (err?.message ?? err));
        }
        if (!aggResult || aggResult.length === 0) {
            return {
                memberId,
                totalPaidAmount: 0,
                totalPendingAmount: 0,
                months: [],
            };
        }
        const result = aggResult[0];
        result.months = (result.months || [])
            .filter((m) => m.month !== null)
            .sort((a, b) => (a.month < b.month ? 1 : a.month > b.month ? -1 : 0))
            .map((m) => {
            const paymentsSorted = (m.payments || [])
                .filter((p) => p.date)
                .sort((p1, p2) => p1.date < p2.date ? 1 : p1.date > p2.date ? -1 : 0)
                .map((p) => ({
                _id: p._id ? String(p._id) : undefined,
                amount: Math.round((p.amount ?? 0) * 100) / 100,
                date: p.date ? new Date(p.date).toISOString() : null,
                isPaid: !!p.isPaid,
                paymentDate: p.paymentDate
                    ? new Date(p.paymentDate).toISOString()
                    : null,
            }));
            return {
                month: m.month,
                paid: Math.round((m.paid ?? 0) * 100) / 100,
                pending: Math.round((m.pending ?? 0) * 100) / 100,
                payments: paymentsSorted,
            };
        });
        result.totalPaidAmount =
            Math.round((result.totalPaidAmount ?? 0) * 100) / 100;
        result.totalPendingAmount =
            Math.round((result.totalPendingAmount ?? 0) * 100) / 100;
        return {
            memberId,
            memberName: result.memberName,
            phoneNumber: result.phoneNumber,
            admissionDate: result.admissionDate
                ? new Date(result.admissionDate).toISOString()
                : null,
            recurringMonthlyPayment: !!result.recurringMonthlyPayment,
            totalPaidAmount: result.totalPaidAmount,
            totalPendingAmount: result.totalPendingAmount,
            months: result.months,
        };
    }
    async markPaymentPaid(paymentId) {
        if (!mongoose_1.Types.ObjectId.isValid(paymentId)) {
            throw new common_1.BadRequestException('Invalid paymentId');
        }
        const member = await this.memberModel.findOne({
            'paymentHistory._id': new mongoose_1.Types.ObjectId(paymentId),
        });
        if (!member) {
            throw new common_1.NotFoundException('Payment record not found');
        }
        const payment = member.paymentHistory.find((p) => p._id?.toString() === paymentId);
        if (!payment) {
            throw new common_1.NotFoundException('Payment entry not found in member');
        }
        if (payment.isPaid === true) {
            return { message: 'Already paid', member };
        }
        payment.isPaid = true;
        payment.paymentDate = new Date();
        const amount = Number(payment.amount);
        member.paidAmount = (Number(member.paidAmount) || 0) + amount;
        member.pendingAmount = (Number(member.pendingAmount) || 0) - amount;
        if (member.pendingAmount < 0)
            member.pendingAmount = 0;
        await member.save();
        return {
            statusCode: 200,
            message: 'Payment marked as paid successfully',
            updated: {
                memberId: member._id,
                paidAmount: member.paidAmount,
                pendingAmount: member.pendingAmount,
                payment: payment,
            },
        };
    }
};
exports.MemberService = MemberService;
exports.MemberService = MemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(member_entity_1.Member.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], MemberService);
//# sourceMappingURL=member.service.js.map