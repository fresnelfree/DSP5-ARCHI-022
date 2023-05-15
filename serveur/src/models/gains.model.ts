import {Entity, model, property, belongsTo, belongsTo} from '@loopback/repository';
import {Client,Repartition} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'DSP5-ARCHI-DB', table: 'gains'},
    foreignKeys: {
      fkPeutActiverRel: {
        name: 'fkPeutActiverRel',
        entity: 'Client',
        entityKey: 'id',
        foreignKey: 'idClient'
      },
      fkRepartitionGainRel: {
        name: 'fkRepartitionGainRel',
        entity: 'Repartition',
        entityKey: 'id',
        foreignKey: 'idRepartition'
      }
    }
  }
})
export class Gains extends Entity {
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

  @belongsTo(() => Repartition)
  idRepartition: number;

  @belongsTo(() => Client)
  idClient?: number;

  @property({
    type: 'string',
    length: 100,
    generated: 0,
    mysql: {columnName: 'libelle_gain', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  libelleGain?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'numero_gain', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  numeroGain?: number;

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: {columnName: 'etat_gain', dataType: 'char', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  etatGain?: string;

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
