// import { createNestApplication } from '../src/main'; // importa tu boostrap principal
import { Callback, Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { createNestApplication } from '../main';

let cachedServer: any;

async function bootstrapServer() {
  if (!cachedServer) {
    const app = await createNestApplication();
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    cachedServer = createServer(expressApp);
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  const server = await bootstrapServer();
  return proxy(server, event, context, 'PROMISE').promise;
};
