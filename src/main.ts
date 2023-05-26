import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'express-handlebars';
import { ResponseTimeInterceptor } from './timeload-server';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import supertokens from "supertokens-node";
import { ValidationPipe } from "@nestjs/common";
import { SupertokensExceptionFilter } from "./auth/auth/auth.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ResponseTimeInterceptor());
  app.setViewEngine('hbs');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine('hbs', hbs({
    extname: 'hbs',
    partialsDir: join(__dirname, '..', 'views/partials'),
    layoutsDir: join(__dirname, '..', 'views/layouts'),
    defaultLayout: 'main',
  }));

  const config = new DocumentBuilder()
    .setTitle('Musician\'s Blog')
    .setDescription('Musician\'s Blog API description')
    .setVersion('1.0')
    .addTag('Web')
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['https://ado-web-sem-6.onrender.com'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.useGlobalFilters(new SupertokensExceptionFilter());


  await app.listen(3005);
}
bootstrap();