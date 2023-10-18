import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {SessionJeu} from '.';
import {Gains} from './gains.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'DSP5-ARCHI-DB', table: 'repartition'},
    foreignKeys: {
      fk_contenirRel: {
        name: 'fk_contenirRel',
        entity: 'SessionJeu',
        entityKey: 'id',
        foreignKey: 'id_session'
      }
    }
  }
})
export class Repartition extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_session: number;

  // @belongsTo(() => SessionJeu)
  // id_session: number;
  @hasMany(() => Gains, {keyTo: 'id_repartition'})
  gains: Gains[];
  
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'pourcentage', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  pourcentage: number;

  @property({
    type: 'string',
    length: 255,
    generated: 0,
    mysql: {columnName: 'libelle', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  libelle: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Repartition>) {
    super(data);
  }
}

export interface RepartitionRelations {
  // describe navigational properties here
}

export type RepartitionWithRelations = Repartition & RepartitionRelations;
