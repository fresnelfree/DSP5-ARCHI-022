import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Client,Repartition} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'DSP5-ARCHI-DB', table: 'gains'},
    foreignKeys: {
      fk_peut_activerRel: {
        name: 'fk_peut_activerRel',
        entity: 'Client',
        entityKey: 'id',
        foreignKey: 'id_client'
      },
      fk_repartition_gainRel: {
        name: 'fk_repartition_gainRel',
        entity: 'Repartition',
        entityKey: 'id',
        foreignKey: 'id_repartition'
      }
    }
  }
})
export class Gains extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  // @belongsTo(() => Repartition)
  // id_repartition: number;

  // @belongsTo(() => Client)
  // id_client?: number;
  
  @property({
    type: 'number',
  })
  id_repartition?: number;

  @property({
    type: 'number',
  })
  id_client?: number;

  @property({
    type: 'string',
    length: 100,
    generated: 0,
    mysql: {columnName: 'libelle_gain', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  libelle_gain?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'numero_gain', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  numero_gain?: number;

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: {columnName: 'etat_gain', dataType: 'char', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  etat_gain?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Gains>) {
    super(data);
  }
}

export interface GainsRelations {
  // describe navigational properties here
}

export type GainsWithRelations = Gains & GainsRelations;
