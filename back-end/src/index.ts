import {ApplicationConfig, App} from './application';
require('dotenv').config();
import {ExpressServer} from './server';

export {ApplicationConfig, ExpressServer, App};

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const server = new ExpressServer(options);
  await server.boot();
  await server.start();
  await server.apiExpress();
  console.log('Server is running at http://127.0.0.1:'+ process.env.APP_PORT || 3000);
  // const app = new App(options);
  // await app.boot();
  // await app.migrateSchema({ models: ['Compte', 'Employe', 'Client', 'SessionJeu', 'Repartition', 'Gains', 'Participer'] });
  // await app.start();

  // const url = app.restServer.url;
  // console.log(`Server environment: ${process.env.APP_HOST}`);
  // console.log(`Server is running at ${url}`);
  // console.log(`Try ${url}/ping`);

  // return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.APP_PORT || 3000),
      host: process.env.APP_HOST || 'localhost',
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
      // Use the LB4 application as a route. It should not be listening.
      listenOnStart: false,
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}

// if (require.main === module) {
//   // Run the application
//   const config = {
//     rest: {
//       port: +(process.env.APP_PORT || 3000 ),
//       host: process.env.APP_HOST,
//       // The `gracePeriodForClose` provides a graceful close for http/https
//       // servers with keep-alive clients. The default value is `Infinity`
//       // (don't force-close). If you want to immediately destroy all sockets
//       // upon stop, set its value to `0`.
//       // See https://www.npmjs.com/package/stoppable
//       gracePeriodForClose: 5000, // 5 seconds
//       openApiSpec: {
//         // useful when used with OpenAPI-to-GraphQL to locate your application
//         setServersFromRequest: true,
//       },
//       listenOnStart: false,
//     },
//   };
//   main(config).catch(err => {
//     console.error('Cannot start the application.', err);
//     process.exit(1);
//   });
// }
