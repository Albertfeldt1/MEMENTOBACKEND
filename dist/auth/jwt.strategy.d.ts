import { Model } from 'mongoose';
import { User } from '../users/user.schema';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    constructor(userModel: Model<User>);
    validate(payload: any): Promise<{
        userId: string;
        email: string;
        supabaseId: any;
    }>;
}
export {};
