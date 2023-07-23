import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Client, ClientRelations, Gains, SessionJeu, Participer} from '../models';
import {GainsRepository} from './gains.repository';
import {ParticiperRepository} from './participer.repository';
import {SessionJeuRepository} from './session-jeu.repository';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {

  public readonly gains: HasManyRepositoryFactory<Gains, typeof Client.prototype.id>;

  // public readonly sessionJeus: HasManyThroughRepositoryFactory<SessionJeu, typeof SessionJeu.prototype.id,
  //         Participer,
  //         typeof Client.prototype.id
  //       >;

  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource, @repository.getter('GainsRepository') protected gainsRepositoryGetter: Getter<GainsRepository>, @repository.getter('ParticiperRepository') protected participerRepositoryGetter: Getter<ParticiperRepository>, @repository.getter('SessionJeuRepository') protected sessionJeuRepositoryGetter: Getter<SessionJeuRepository>,
  ) {
    super(Client, dataSource);
    // this.sessionJeus = this.createHasManyThroughRepositoryFactoryFor('sessionJeus', sessionJeuRepositoryGetter, participerRepositoryGetter,);
    // this.registerInclusionResolver('sessionJeus', this.sessionJeus.inclusionResolver);
    this.gains = this.createHasManyRepositoryFactoryFor('gains', gainsRepositoryGetter,);
    this.registerInclusionResolver('gains', this.gains.inclusionResolver);
  }
}
