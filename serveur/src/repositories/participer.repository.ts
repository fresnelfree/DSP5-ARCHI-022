import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Participer, ParticiperRelations} from '../models';

export class ParticiperRepository extends DefaultCrudRepository<
  Participer,
  typeof Participer.prototype.id,
  ParticiperRelations
> {
  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource,
  ) {
    super(Participer, dataSource);
  }
}
