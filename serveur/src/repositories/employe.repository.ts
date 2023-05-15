import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Employe, EmployeRelations} from '../models';

export class EmployeRepository extends DefaultCrudRepository<
  Employe,
  typeof Employe.prototype.id,
  EmployeRelations
> {
  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource,
  ) {
    super(Employe, dataSource);
  }
}
