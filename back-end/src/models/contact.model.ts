import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'DSP5-ARCHI-DB', table: 'contact'}}})
export class Contact extends Entity {
  @property({
    type: 'string',
    required: true,
    mysql: {columnName: 'nom', dataType: 'varchar', dataLength: 100, dataPrecision: null,  dataScale: null, nullable: 'Y', generated: 0}
  })
  nom: string;

  @property({
    type: 'string',
    required: true,
    mysql: {columnName: 'phone', dataType: 'varchar', dataLength: 20, dataPrecision: null,  dataScale: null, nullable: 'Y', generated: 0}
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
    mysql: {columnName: 'email', dataType: 'varchar', dataLength: 100, dataPrecision: null,  dataScale: null, nullable: 'Y', generated: 0}    
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    mysql: {columnName: 'objet', dataType: 'varchar', dataLength: 255, dataPrecision: null,  dataScale: null, nullable: 'Y', generated: 0}     
  })
  objet: string;

  @property({
    type: 'string',
    required: true,
    mysql: {columnName: 'message', dataType: 'varchar', dataLength: 255, dataPrecision: null,  dataScale: null, nullable: 'Y', generated: 0}     
  })
  message: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1}
  })
  id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Contact>) {
    super(data);
  }
}

export interface ContactRelations {
  // describe navigational properties here
}

export type ContactWithRelations = Contact & ContactRelations;
