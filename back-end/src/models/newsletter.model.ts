import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'DSP5-ARCHI-DB-INT', table: 'newsletter'}}})
export class Newsletter extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
    required: true,
  })
  subscribe_date: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Newsletter>) {
    super(data);
  }
}

export interface NewsletterRelations {
  // describe navigational properties here
}

export type NewsletterWithRelations = Newsletter & NewsletterRelations;
