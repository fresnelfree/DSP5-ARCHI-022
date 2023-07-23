import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Compte, CompteRelations, Client, Employe} from '../models';
import {ClientRepository} from './client.repository';
import {EmployeRepository} from './employe.repository';

export class CompteRepository extends DefaultCrudRepository<
  Compte,
  typeof Compte.prototype.id,
  CompteRelations
> {

  public readonly client: HasOneRepositoryFactory<Client, typeof Compte.prototype.id>;

  public readonly employe: HasOneRepositoryFactory<Employe, typeof Compte.prototype.id>;

  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('EmployeRepository') protected employeRepositoryGetter: Getter<EmployeRepository>,
  ) {
    super(Compte, dataSource);
    this.employe = this.createHasOneRepositoryFactoryFor('employe', employeRepositoryGetter);
    this.registerInclusionResolver('employe', this.employe.inclusionResolver);
    this.client = this.createHasOneRepositoryFactoryFor('client', clientRepositoryGetter);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
  }
}
