import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Compte, CompteRelations} from '../models';

export class CompteRepository extends DefaultCrudRepository<
  Compte,
  typeof Compte.prototype.id,
  CompteRelations
> {
  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource,
  ) {
    super(Compte, dataSource);
  }
}
