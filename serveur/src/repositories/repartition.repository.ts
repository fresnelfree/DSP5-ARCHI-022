import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Repartition, RepartitionRelations} from '../models';

export class RepartitionRepository extends DefaultCrudRepository<
  Repartition,
  typeof Repartition.prototype.id,
  RepartitionRelations
> {
  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource,
  ) {
    super(Repartition, dataSource);
  }
}
