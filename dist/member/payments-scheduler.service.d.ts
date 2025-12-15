import { Model } from 'mongoose';
import { Member } from './entities/member.entity';
export declare class PaymentsSchedulerService {
    private memberModel;
    private readonly logger;
    constructor(memberModel: Model<Member>);
    addMonthlyEntries(): Promise<void>;
}
