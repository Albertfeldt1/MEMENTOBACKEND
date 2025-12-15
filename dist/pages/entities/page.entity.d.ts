import { Document } from 'mongoose';
export declare class Page extends Document {
    type: string;
    title: string;
    description?: string;
}
export declare const PageSchema: import("mongoose").Schema<Page, import("mongoose").Model<Page, any, any, any, Document<unknown, any, Page, any, {}> & Page & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Page, Document<unknown, {}, import("mongoose").FlatRecord<Page>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Page> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
