import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Client,SessionJeu} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'DSP5-ARCHI-DB', table: 'participer'},
    foreignKeys: {
      fkParticiperRel: {
        name: 'fkParticiperRel',
        entity: 'Client',
        entityKey: 'id',
        foreignKey: 'idClient'
      },
      fkParticiper2Rel: {
        name: 'fkParticiper2Rel',
        entity: 'SessionJeu',
        entityKey: 'id',
        foreignKey: 'idSession'
      }
    }
  }
})
export class Participer extends Entity {
  @belongsTo(() => Client)
  idClient: number;

  @belongsTo(() => SessionJeu)
  idSession: number;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'date_p', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  dateP?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Participer>) {
    super(data);
  }
}

export interface ParticiperRelations {
  // describe navigational properties here
}

export type ParticiperWithRelations = Participer & ParticiperRelations;
