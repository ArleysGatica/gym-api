import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function createNestApplication() {
  const app = await NestFactory.create(AppModule);
  return app;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Permitir cualquier origen (CORS abierto)
  app.enableCors();

  // ✅ Configurar Swagger con JWT
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

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}/api`);
}
bootstrap();
