import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Repartition, RepartitionRelations, Gains} from '../models';
import {GainsRepository} from './gains.repository';

export class RepartitionRepository extends DefaultCrudRepository<
  Repartition,
  typeof Repartition.prototype.id,
  RepartitionRelations
> {

  public readonly gains: HasManyRepositoryFactory<Gains, typeof Repartition.prototype.id>;

  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource, @repository.getter('GainsRepository') protected gainsRepositoryGetter: Getter<GainsRepository>,
  ) {
    super(Repartition, dataSource);
    this.gains = this.createHasManyRepositoryFactoryFor('gains', gainsRepositoryGetter,);
    this.registerInclusionResolver('gains', this.gains.inclusionResolver);
  }
}
