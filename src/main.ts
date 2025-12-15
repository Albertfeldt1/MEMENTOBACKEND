import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import  morgan from 'morgan';  // <-- import morgan
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fileUpload from 'express-fileupload';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan('combined'))
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
    app.use(
    '/webhook', // Your exact webhook route
    bodyParser.raw({ type: 'application/json' }),
  );
  // app.use('/webhook', bodyParser.raw({ type: '*/*' }));
  app.use(bodyParser.json());
  app.setViewEngine('ejs');
  // app.use(fileUpload());
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.useGlobalPipes(new ValidationPipe());
  //  app.use('/stripe/webhook', express.raw({ type: 'application/json' }));
  await app.listen(process.env.PORT ?? 5414);
}
bootstrap();
