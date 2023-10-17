import {Entity, model, property, hasMany} from '@loopback/repository';
import { EmployeWithRelations } from './employe.model';
import {Repartition} from './repartition.model';
import {Client} from './client.model';
import {Participer} from './participer.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'DSP5-ARCHI-DB', table: 'session_jeu'},
  foreignKeys: {
    fk_posseder2Rel: {
      name: 'fk_peut_creer',
      entity: 'Employe',
      entityKey: 'id',
      foreignKey: 'id_employe'
    }
  }
}
})
export class SessionJeu extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id: number;

  @property({
    type: 'number',
  })
  id_employe: number;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'date_debut', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  date_debut?: string;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'date_fin', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  date_fin?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'nbr_ticket', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  nbr_ticket: number;

  @property({
    type: 'string',
    length: 20,
    generated: 0,
    mysql: {columnName: 'statut', dataType: 'varchar', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  statut: string;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'libelle', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  libelle?: string;  

  @hasMany(() => Repartition, {keyTo: 'id_session'})
  repartitions: Repartition[];

  @hasMany(() => Client, {through: {model: () => Participer, keyFrom: 'id_session', keyTo: 'id_client'}})
  clients: Client[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SessionJeu>) {
    super(data);
  }
}

export interface SessionJeuRelations {
  // describe navigational properties here
  id_employe:EmployeWithRelations
}

export type SessionJeuWithRelations = SessionJeu & SessionJeuRelations;
