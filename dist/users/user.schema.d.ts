import { Document } from "mongoose";
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
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
