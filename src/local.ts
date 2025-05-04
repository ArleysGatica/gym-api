import { createNestApplication } from './main';

async function bootstrap() {
  const app = await createNestApplication();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor local en http://localhost:${port}/api`);
}

bootstrap();
