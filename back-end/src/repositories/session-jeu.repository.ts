import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {SessionJeu, SessionJeuRelations, Repartition, Client, Participer} from '../models';
import {RepartitionRepository} from './repartition.repository';
import {ParticiperRepository} from './participer.repository';
import {ClientRepository} from './client.repository';

export class SessionJeuRepository extends DefaultCrudRepository<
  SessionJeu,
  typeof SessionJeu.prototype.id,
  SessionJeuRelations
> {

  public readonly repartitions: HasManyRepositoryFactory<Repartition, typeof SessionJeu.prototype.id>;

  public readonly clients: HasManyThroughRepositoryFactory<Client, typeof Client.prototype.id,
          Participer,
          typeof SessionJeu.prototype.id
        >;

  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource, @repository.getter('RepartitionRepository') protected repartitionRepositoryGetter: Getter<RepartitionRepository>, @repository.getter('ParticiperRepository') protected participerRepositoryGetter: Getter<ParticiperRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>,
  ) {
    super(SessionJeu, dataSource);
    this.clients = this.createHasManyThroughRepositoryFactoryFor('clients', clientRepositoryGetter, participerRepositoryGetter,);
    this.registerInclusionResolver('clients', this.clients.inclusionResolver);
    this.repartitions = this.createHasManyRepositoryFactoryFor('repartitions', repartitionRepositoryGetter,);
    this.registerInclusionResolver('repartitions', this.repartitions.inclusionResolver);
  }
}
