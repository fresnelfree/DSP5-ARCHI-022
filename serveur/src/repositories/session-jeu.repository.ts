import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {SessionJeu, SessionJeuRelations} from '../models';

export class SessionJeuRepository extends DefaultCrudRepository<
  SessionJeu,
  typeof SessionJeu.prototype.id,
  SessionJeuRelations
> {
  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource,
  ) {
    super(SessionJeu, dataSource);
  }
}
