import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'DSP5-ARCHI-DB', table: 'session_jeu'}}
})
export class SessionJeu extends Entity {
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

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'date_debut', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  dateDebut?: string;

  @property({
    type: 'date',
    generated: 0,
    mysql: {columnName: 'date_fin', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  dateFin?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'nbr_ticket', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y', generated: 0},
  })
  nbrTicket?: number;

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: {columnName: 'statut', dataType: 'char', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  statut?: string;

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
}

export type SessionJeuWithRelations = SessionJeu & SessionJeuRelations;
