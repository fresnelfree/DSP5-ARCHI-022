import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { RepartitionRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class StatisticsService {
  constructor(
    private repartitionRepositoty: RepartitionRepository
  ) {}

  /*
   * Add service methods here
   */

  getrepartitions():any {
    return this.repartitionRepositoty.execute('SELECT SUM((repartition.pourcentage*session_jeu.nbr_ticket)/100) as quantite, repartition.libelle FROM `repartition` INNER JOIN session_jeu ON repartition.id_session = session_jeu.id GROUP BY repartition.libelle;')
  }
}
