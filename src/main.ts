import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import { join } from 'path';

async function bootstrap() {
  const expressApp = express();
  //const app = await NestFactory.create(AppModule,new ExpressAdapter(expressApp),);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  /*expressApp.set('view engine', 'ejs');
  expressApp.set('views', path.join(__dirname, 'views'));*/

  app.useStaticAssets(join(__dirname, '..', 'public'));
  //app.setBaseViewsDir(join(__dirname, '..', 'views'));
  //app.setViewEngine('hbs'); 

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();