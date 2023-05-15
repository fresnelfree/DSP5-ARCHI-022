import {Entity, model, property, belongsTo} from '@loopback/repository';
import {SessionJeu} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'DSP5-ARCHI-DB', table: 'repartition'},
    foreignKeys: {
      fkContenirRel: {
        name: 'fkContenirRel',
        entity: 'SessionJeu',
        entityKey: 'id',
        foreignKey: 'idSession'
      }
    }
  }
})
export class Repartition extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    generated: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 0},
  })
  id: number;

  @belongsTo(() => SessionJeu)
  idSession: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'pourcentage', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  pourcentage?: number;

  @property({
    type: 'string',
    length: 100,
    generated: 0,
    mysql: {columnName: 'libelle', dataType: 'char', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  libelle?: string;

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
