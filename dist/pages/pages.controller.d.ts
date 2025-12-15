import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    create(createPageDto: CreatePageDto): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/page.entity").Page, {}, {}> & import("./entities/page.entity").Page & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    findAll(): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./entities/page.entity").Page, {}, {}> & import("./entities/page.entity").Page & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findByType(type: string): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/page.entity").Page, {}, {}> & import("./entities/page.entity").Page & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updatePageDto: UpdatePageDto): Promise<{
        statusCode: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/page.entity").Page, {}, {}> & import("./entities/page.entity").Page & Required<{
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
