import { Document } from 'mongoose';
export type AdminAuthDocument = AdminAuth & Document;
export declare class AdminAuth {
    image: string;
    name: string;
    email: string;
    password: string;
}
export declare const AdminAuthSchema: import("mongoose").Schema<AdminAuth, import("mongoose").Model<AdminAuth, any, any, any, Document<unknown, any, AdminAuth, any, {}> & AdminAuth & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AdminAuth, Document<unknown, {}, import("mongoose").FlatRecord<AdminAuth>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AdminAuth> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
