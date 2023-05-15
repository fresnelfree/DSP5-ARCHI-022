import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Client,Employe} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'DSP5-ARCHI-DB', table: 'compte'},
    foreignKeys: {
      fkAvoirRel: {name: 'fkAvoirRel', entity: 'Client', entityKey: 'id', foreignKey: 'idClient'},
      fkPossederRel: {
        name: 'fkPossederRel',
        entity: 'Employe',
        entityKey: 'id',
        foreignKey: 'idEmploye'
      }
    }
  }
})
export class Compte extends Entity {
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

  @belongsTo(() => Client)
  idClient?: number;

  @belongsTo(() => Employe)
  idEmploye?: number;

  @property({
    type: 'string',
    length: 50,
    generated: 0,
    mysql: {columnName: 'mail', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  mail?: string;

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: {columnName: 'pwd', dataType: 'varchar', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  pwd?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Compte>) {
    super(data);
  }
}

export interface CompteRelations {
  // describe navigational properties here
}

export type CompteWithRelations = Compte & CompteRelations;
