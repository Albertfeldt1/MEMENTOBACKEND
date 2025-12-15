import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';

export const imageUploadHelper = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = uuidv4();
      const ext = extname(file.originalname);
      callback(null, `${uniqueSuffix}${ext}`);
    },
  }),

  fileFilter: (req: any, file: Express.Multer.File, callback: Function) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return callback(
        new BadRequestException('Only image files are allowed!'),
        false,
      );
    }
    callback(null, true);
  },

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
};
