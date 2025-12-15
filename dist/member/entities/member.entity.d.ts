import { Document, Types } from 'mongoose';
export declare class Member extends Document {
    userId: Types.ObjectId;
    businessId: Types.ObjectId;
    memberName: string;
    phoneNumber: string;
    feeAmount: number;
    admissionDate: Date;
    recurringMonthlyPayment: boolean;
    pendingAmount: number;
    paidAmount: number;
    paymentHistory: {
        amount: number;
        date: Date;
        isPaid: boolean;
        paymentDate: Date | null;
    }[];
}
export declare const MemberSchema: import("mongoose").Schema<Member, import("mongoose").Model<Member, any, any, any, Document<unknown, any, Member, any, {}> & Member & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Member, Document<unknown, {}, import("mongoose").FlatRecord<Member>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Member> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
