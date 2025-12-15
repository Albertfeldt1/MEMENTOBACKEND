import mongoose, { Model, Types } from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
export declare class MemberService {
    private readonly memberModel;
    constructor(memberModel: Model<Member>);
    private monthsBetweenInclusive;
    private parseBoolean;
    private startOfMonthUTC;
    private generatePaymentEntries;
    createOrUpdate(userId: string, createMemberDto: CreateMemberDto, memberId?: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: never[];
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: {};
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: string;
        data: never[];
    }>;
    deleteMember(memberId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: never[];
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
        data: never[];
    }>;
    findAll(userId: string, search?: string, businessId?: string, filterType?: string, startDate?: string, endDate?: string, paymentStatus?: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        summary: {
            totalPaidAmount: number;
            totalPendingAmount: number;
            totalPaidCount: number;
            totalPendingCount: number;
            totalMembers: number;
        };
        data: (mongoose.Document<unknown, {}, Member, {}, {}> & Member & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
        data: never[];
        summary?: undefined;
    }>;
    findOne(id: string): Promise<Member>;
    update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member>;
    remove(id: string): Promise<{
        message: string;
    }>;
    markAllPaid(memberId: string): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        message: string;
        data: never[];
    } | {
        statusCode: number;
        message: string;
        data: mongoose.Document<unknown, {}, Member, {}, {}> & Member & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    getPaymentSummaryByUserId(memberId: string): Promise<{
        memberId: string;
        totalPaidAmount: number;
        totalPendingAmount: number;
        months: never[];
        debug: string;
        memberName?: undefined;
        phoneNumber?: undefined;
        admissionDate?: undefined;
        recurringMonthlyPayment?: undefined;
    } | {
        memberId: string;
        totalPaidAmount: number;
        totalPendingAmount: number;
        months: never[];
        debug?: undefined;
        memberName?: undefined;
        phoneNumber?: undefined;
        admissionDate?: undefined;
        recurringMonthlyPayment?: undefined;
    } | {
        memberId: string;
        memberName: any;
        phoneNumber: any;
        admissionDate: string | null;
        recurringMonthlyPayment: boolean;
        totalPaidAmount: any;
        totalPendingAmount: any;
        months: any;
        debug?: undefined;
    }>;
    markPaymentPaid(paymentId: string): Promise<{
        message: string;
        member: mongoose.Document<unknown, {}, Member, {}, {}> & Member & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
        statusCode?: undefined;
        updated?: undefined;
    } | {
        statusCode: number;
        message: string;
        updated: {
            memberId: Types.ObjectId;
            paidAmount: number;
            pendingAmount: number;
            payment: {
                amount: number;
                date: Date;
                isPaid: boolean;
                paymentDate: Date | null;
            };
        };
        member?: undefined;
    }>;
}
