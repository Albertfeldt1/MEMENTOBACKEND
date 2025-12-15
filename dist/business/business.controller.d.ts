import { BusinessService } from './business.service';
export declare class BusinessController {
    private businessService;
    constructor(businessService: BusinessService);
    getMyBusinesses(req: any): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./entities/business.entity").Business, {}, {}> & import("./entities/business.entity").Business & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    createOrUpdate(req: any, data: any, businessId?: string): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/business.entity").Business, {}, {}> & import("./entities/business.entity").Business & Required<{
            _id: import("mongoose").Types.ObjectId;
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
