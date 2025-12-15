export declare const imageUploadHelper: {
    storage: import("multer").StorageEngine;
    fileFilter: (req: any, file: Express.Multer.File, callback: Function) => any;
    limits: {
        fileSize: number;
    };
};
