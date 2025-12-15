import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';
export declare class PagesService {
    private readonly pageModel;
    constructor(pageModel: Model<Page>);
    create(createPageDto: CreatePageDto): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Page, {}, {}> & Page & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, Page, {}, {}> & Page & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findByType(type: string): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Page, {}, {}> & Page & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Page, {}, {}> & Page & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
