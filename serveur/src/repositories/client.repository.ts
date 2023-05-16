import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Client, ClientRelations, SessionJeu, Participer} from '../models';
import {ParticiperRepository} from './participer.repository';
import {SessionJeuRepository} from './session-jeu.repository';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {

  public readonly participer: HasManyThroughRepositoryFactory<SessionJeu, typeof SessionJeu.prototype.id,
          Participer,
          typeof Client.prototype.id
        >;

  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource, @repository.getter('ParticiperRepository') protected participerRepositoryGetter: Getter<ParticiperRepository>, @repository.getter('SessionJeuRepository') protected sessionJeuRepositoryGetter: Getter<SessionJeuRepository>,
  ) {
    super(Client, dataSource);
    this.participer = this.createHasManyThroughRepositoryFactoryFor('participer', sessionJeuRepositoryGetter, participerRepositoryGetter,);
    this.registerInclusionResolver('participer', this.participer.inclusionResolver);
  }
}
