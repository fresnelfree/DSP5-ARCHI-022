import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Client,SessionJeu} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'DSP5-ARCHI-DB', table: 'participer'},
    foreignKeys: {
      fk_participerRel: {
        name: 'fk_participerRel',
        entity: 'Client',
        entityKey: 'id',
        foreignKey: 'id_client'
      },
      fk_participer2Rel: {
        name: 'fk_participer2Rel',
        entity: 'SessionJeu',
        entityKey: 'id',
        foreignKey: 'id_session'
      }
    }
  }
})
export class Participer extends Entity {

  @property({
    type: 'number',
  })
  id_client?: number;

  @property({
    type: 'number',
  })
  id_session?: number;

  @property({
    type: 'date',
    generated: 0,
    id:true,
    mysql: {columnName: 'date_p', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  date_p?: string;

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
