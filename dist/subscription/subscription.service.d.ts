import { Model, Types } from "mongoose";
import { I18nService } from "nestjs-i18n";
import { Subscription, SubscriptionDocument } from "./entities/subscription.entity";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
export declare class SubscriptionService {
    private readonly subscriptionModel;
    private readonly i18n;
    constructor(subscriptionModel: Model<SubscriptionDocument>, i18n: I18nService);
    insertManySubscriptions(): Promise<{
        message: string;
        existingPlans: string[];
        count?: undefined;
        data?: undefined;
    } | {
        message: string;
        count: number;
        data: import("mongoose").MergeType<import("mongoose").Document<unknown, {}, SubscriptionDocument, {}, {}> & Subscription & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        }, Omit<{
            planName: string;
            price: number;
            billingCycle: string;
            features: string[];
            isActive: boolean;
        }, "_id">>[];
        existingPlans?: undefined;
    }>;
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<import("mongoose").Document<unknown, {}, SubscriptionDocument, {}, {}> & Subscription & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(billingCycle: string): Promise<{
        _id: Types.ObjectId;
        planName: string;
        price: number;
        billingCycle: string;
        isActive: boolean;
        features: string[];
    }[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, SubscriptionDocument, {}, {}> & Subscription & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<import("mongoose").Document<unknown, {}, SubscriptionDocument, {}, {}> & Subscription & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, SubscriptionDocument, {}, {}> & Subscription & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
