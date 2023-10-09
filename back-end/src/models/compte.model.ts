import {Entity, model, property, hasOne} from '@loopback/repository';
import {Client} from './client.model';
import { Employe } from './employe.model';
require('dotenv').config();

@model({
  settings: {idInjection: false, mysql: {schema: 'DSP5-ARCHI-DB', table: 'compte'}}
})
export class Compte extends Entity {
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
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 50,
    generated: 0,
    mysql: {columnName: 'email', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  email: string;

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: {columnName: 'pwd', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  pwd?: string;

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: {columnName: 'id_passport', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  id_passport?: string;  

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: {columnName: 'type_passport', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  type_passport?: string;

  @property({
    type: 'boolean',
    required: false,
    jsonSchema: {nullable: false},
    length: 1,
    generated: 0,
    mysql: {columnName: 'email_verify', dataType: 'char', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  email_verify: boolean;
  

  @hasOne(() => Client, {keyTo: 'id_compte'})
  client: Client;

  @hasOne(() => Employe, {keyTo: 'id_compte'})
  employe: Employe;

  // @hasOne(() => Employe, {keyTo: 'id_compte'})
  // employe: Employe;
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
