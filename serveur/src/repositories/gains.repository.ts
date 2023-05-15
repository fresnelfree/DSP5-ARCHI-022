import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Gains, GainsRelations} from '../models';

export class GainsRepository extends DefaultCrudRepository<
  Gains,
  typeof Gains.prototype.id,
  GainsRelations
> {
  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource,
  ) {
    super(Gains, dataSource);
  }
}
