import { HttpStatus } from '@nestjs/common';
import mongoose, { Model, Types } from 'mongoose';
import { Business } from './entities/business.entity';
export declare class BusinessService {
    private businessModel;
    constructor(businessModel: Model<Business>);
    createBusiness(userId: string, body: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: mongoose.Document<unknown, {}, Business, {}, {}> & Business & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    getUserBusinesses(userId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (mongoose.Document<unknown, {}, Business, {}, {}> & Business & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    createOrUpdateBusiness(userId: string, data: any, businessId?: string): Promise<{
        statusCode: number;
        message: string;
        data: mongoose.Document<unknown, {}, Business, {}, {}> & Business & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    deleteBusiness(businessId: string): Promise<{
        statusCode: number;
        message: string;
        data: never[];
    }>;
}
