import { HttpStatus } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    paymentSummary(userId: string): Promise<{
        statsuCode: number;
        message: string;
        data: {
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
        };
    }>;
    markPaymentPaid(paymentId: string): Promise<{
        message: string;
        member: import("mongoose").Document<unknown, {}, import("./entities/member.entity").Member, {}, {}> & import("./entities/member.entity").Member & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        statusCode?: undefined;
        updated?: undefined;
    } | {
        statusCode: number;
        message: string;
        updated: {
            memberId: import("mongoose").Types.ObjectId;
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
    createOrUpdateMember(req: any, createMemberDto: CreateMemberDto, memberId?: string): Promise<{
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
        data: import("mongoose").Document<unknown, {}, import("./entities/member.entity").Member, {}, {}> & import("./entities/member.entity").Member & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(req: any, search?: string, businessId?: string, filterType?: string, startDate?: string, endDate?: string, paymentStatus?: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        summary: {
            totalPaidAmount: number;
            totalPendingAmount: number;
            totalPaidCount: number;
            totalPendingCount: number;
            totalMembers: number;
        };
        data: (import("mongoose").Document<unknown, {}, import("./entities/member.entity").Member, {}, {}> & import("./entities/member.entity").Member & Required<{
            _id: import("mongoose").Types.ObjectId;
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
    findOne(id: string): Promise<import("./entities/member.entity").Member>;
    update(id: string, updateMemberDto: UpdateMemberDto): Promise<import("./entities/member.entity").Member>;
    remove(id: string): Promise<{
        message: string;
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
}
