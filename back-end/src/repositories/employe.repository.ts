import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Employe, EmployeRelations, SessionJeu, Compte} from '../models';
import { SessionJeuRepository } from './session-jeu.repository';

export class EmployeRepository extends DefaultCrudRepository<
  Employe,
  typeof Employe.prototype.id,
  EmployeRelations
> {  
  
  public readonly sessionJeus: HasManyRepositoryFactory<SessionJeu, typeof Employe.prototype.id>;


  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource, @repository.getter('SessionJeuRepository') protected sessionJeuRepositoryGetter: Getter<SessionJeuRepository>,
  ) {
    super(Employe, dataSource);
    this.sessionJeus = this.createHasManyRepositoryFactoryFor('sessionJeus', sessionJeuRepositoryGetter,);
    this.registerInclusionResolver('sessionJeus', this.sessionJeus.inclusionResolver);
    // this.sessionJeu = this.createHasManyRepositoryFactoryFor('sessionJeu', sessionJeuRepositoryGetter);    
  }
}
