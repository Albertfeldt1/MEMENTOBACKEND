"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUploadHelper = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
exports.imageUploadHelper = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, callback) => {
            const uniqueSuffix = (0, uuid_1.v4)();
            const ext = (0, path_1.extname)(file.originalname);
            callback(null, `${uniqueSuffix}${ext}`);
        },
    }),
    fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
        }
        callback(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
};
//# sourceMappingURL=upload.helper.js.map