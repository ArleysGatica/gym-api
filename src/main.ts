import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();

export async function createNestApplication() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Gym API')
    .setDescription('API para gestión de clientes, productos, entrenadores y pagos')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app;
}

export { expressApp };
