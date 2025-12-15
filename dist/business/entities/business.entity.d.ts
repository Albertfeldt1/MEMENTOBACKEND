import { Document, Types } from 'mongoose';
export declare class Business extends Document {
    businessName: string;
    ownerName: string;
    userId: Types.ObjectId;
}
export declare const BusinessSchema: import("mongoose").Schema<Business, import("mongoose").Model<Business, any, any, any, Document<unknown, any, Business, any, {}> & Business & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Business, Document<unknown, {}, import("mongoose").FlatRecord<Business>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Business> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
