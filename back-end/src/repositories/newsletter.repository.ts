import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Newsletter, NewsletterRelations} from '../models';

export class NewsletterRepository extends DefaultCrudRepository<
  Newsletter,
  typeof Newsletter.prototype.id,
  NewsletterRelations
> {
  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource,
  ) {
    super(Newsletter, dataSource);
  }
}
