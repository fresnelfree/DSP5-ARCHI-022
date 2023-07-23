import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Compte, CompteWithRelations} from '.';
import {Gains} from './gains.model';
import {SessionJeu} from './session-jeu.model';
import {Participer} from './participer.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'DSP5-ARCHI-DB', table: 'client'},
    foreignKeys: {
      fk_avoir2Rel: {
        name: 'fk_avoir2Rel',
        entity: 'Compte',
        entityKey: 'id',
        foreignKey: 'id_compte'
      }
    }
  }
})
export class Client extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  // @belongsTo(() => Compte)
  // id_compte: number;

  @property({
    type: 'string',
    length: 50,
    generated: 0,
    mysql: {columnName: 'nom', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  nom?: string;

  @property({
    type: 'string',
    length: 50,
    generated: 0,
    mysql: {columnName: 'prenom', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  prenom?: string;

  @property({
    type: 'string',
    length: 30,
    generated: 0,
    mysql: {columnName: 'tel', dataType: 'varchar', dataLength: 30, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  tel?: string;

  @property({
    type: 'number',
  })
  id_compte?: number;

  @hasMany(() => Gains, {keyTo: 'id_client'})
  gains: Gains[];

  // @hasMany(() => SessionJeu, {through: {model: () => Participer, keyFrom: 'id_client', keyTo: 'id_session'}})
  // sessionJeus: SessionJeu[];

  @property({
    type: 'string',
    length: 50,
    generated: 0,
    mysql: {columnName: 'email', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  email?: string;

  @property({
    type: 'string',
    length: 100,
    generated: 0,
    mysql: {columnName: 'adresse', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  adresse?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  // describe navigational properties here
  id_compte?: CompteWithRelations
}

export type ClientWithRelations = Client & ClientRelations;
