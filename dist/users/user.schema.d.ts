import { Document, Types } from "mongoose";
export declare class User extends Document {
    name: string;
    email: string;
    dob: Date;
    socialId: string;
    device_type?: string;
    isSubscriptionActive?: boolean;
    device_token?: string;
    password: string;
    image: string;
    isNotification: boolean;
    isDeleted: boolean;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    subscriptionPlan?: string;
    startSubscriptionDate?: Date;
    endSubscriptionDate?: Date;
    subscriptionStatus?: "active" | "past_due" | "cancelled";
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
