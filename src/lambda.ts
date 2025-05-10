import { createNestApplication } from './main';
import serverlessExpress from '@vendia/serverless-express';

let cachedHandler;

export const handler = async (event, context) => {
  if (!cachedHandler) {
    const app = await createNestApplication();
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    cachedHandler = serverlessExpress({ app: expressApp });
  }
  return cachedHandler(event, context);
};
