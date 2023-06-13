import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
require('dotenv').config();

const config = {
  name: 'MySQL',
  connector: 'mysql',
  url: process.env.NODE_ENV == 'PROD' ? process.env.DB_URL_PROD : process.env.DB_URL_DEV,
  host: process.env.NODE_ENV == 'PROD' ? process.env.DB_HOST_PROD : process.env.DB_HOST_DEV,
  port: process.env.NODE_ENV == 'PROD' ? process.env.DB_PORT_PROD : process.env.DB_PORT_DEV,
  user: process.env.NODE_ENV == 'PROD' ? process.env.DB_USER_PROD : process.env.DB_USER_DEV,
  password: process.env.NODE_ENV == 'PROD' ? process.env.DB_PWD_PROD : process.env.DB_PWD_DEV,
  database: process.env.NODE_ENV == 'PROD' ? process.env.DB_DATABASE_PROD : process.env.DB_DATABASE_DEV
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MySqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MySQL';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MySQL', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
