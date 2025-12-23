import { I18nService } from "nestjs-i18n";
import { SubscriptionService } from "./subscription.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
export declare class SubscriptionController {
    private readonly subscriptionService;
    private readonly i18n;
    constructor(subscriptionService: SubscriptionService, i18n: I18nService);
    seedSubscriptions(): Promise<{
        statusCode: number;
        message: string;
        data: {
            message: string;
            existingPlans: string[];
            count?: undefined;
            data?: undefined;
        } | {
            message: string;
            count: number;
            data: import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("./entities/subscription.entity").SubscriptionDocument, {}, {}> & import("./entities/subscription.entity").Subscription & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            }, Omit<{
                planName: string;
                price: number;
                language: string;
                billingCycle: string;
                isActive: boolean;
                features: string[];
            }, "_id">>[];
            existingPlans?: undefined;
        };
    }>;
    create(req: any, createSubscriptionDto: CreateSubscriptionDto): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/subscription.entity").SubscriptionDocument, {}, {}> & import("./entities/subscription.entity").Subscription & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(lang: string): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./entities/subscription.entity").SubscriptionDocument, {}, {}> & import("./entities/subscription.entity").Subscription & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findOne(req: any, id: string): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/subscription.entity").SubscriptionDocument, {}, {}> & import("./entities/subscription.entity").Subscription & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    update(req: any, id: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/subscription.entity").SubscriptionDocument, {}, {}> & import("./entities/subscription.entity").Subscription & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(req: any, id: string): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/subscription.entity").SubscriptionDocument, {}, {}> & import("./entities/subscription.entity").Subscription & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
