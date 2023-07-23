import {ApplicationConfig} from '@loopback/core';
import {App} from './application';

/**
 * Export the OpenAPI spec from the application
 */
async function exportOpenApiSpec(): Promise<void> {
  const config: ApplicationConfig = {
    rest: {
      port: +(process.env.NODE_ENV == undefined ? process.env.APP_PORT_DEV || 3000 : process.env.APP_PORT_PROD ?? 3001),
      host: process.env.NODE_ENV == undefined ? process.env.APP_HOST_DEV : process.env.APP_HOST_PROD,      
      // port: +(process.env.PORT ?? 3000),
      // host: process.env.HOST ?? 'localhost',
    },
  };
  const outFile = process.argv[2] ?? '';
  const app = new App(config);
  await app.boot();
  await app.exportOpenApiSpec(outFile);
}

exportOpenApiSpec().catch(err => {
  console.error('Fail to export OpenAPI spec from the application.', err);
  process.exit(1);
});
