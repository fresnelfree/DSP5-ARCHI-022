import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {Compte, CompteWithRelations} from '.';
import {SessionJeu} from './session-jeu.model';
// import {Compte} from './compte.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'DSP5-ARCHI-DB', table: 'employe'},
    foreignKeys: {
      fk_posseder2Rel: {
        name: 'fk_posseder2Rel',
        entity: 'Compte',
        entityKey: 'id',
        foreignKey: 'id_compte'
      }
    }
  }
})
export class Employe extends Entity {
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
    type: 'number',
  })
  id_compte?: number;

  @property({
    type: 'string',
    length: 50,
    generated: 0,
    mysql: {columnName: 'nom', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  nom?: string;

  @property({
    type: 'string',
    length: 50,
    generated: 0,
    mysql: {columnName: 'prenom', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  prenom?: string;

  @property({
    type: 'string',
    length: 30,
    generated: 0,
    mysql: {columnName: 'tel', dataType: 'varchar', dataLength: 30, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  tel?: string;

  @property({
    type: 'string',
    length: 50,
    generated: 0,
    mysql: {columnName: 'email', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  email?: string;

  @property({
    type: 'string',
    length: 100,
    generated: 0,
    mysql: {columnName: 'adresse', dataType: 'char', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  adresse?: string;

  @property({
    type: 'string',
    length: 10,
    generated: 0,
    mysql: {columnName: 'role', dataType: 'varchar', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y', generated: 0},
  })
  role?: string;

  @hasMany(() => SessionJeu, {keyTo: 'id_employe'})
  sessionJeus: SessionJeu[];
  // @hasMany(() => SessionJeu, {keyTo: 'id_employe'})
  // sessionJeus: SessionJeu[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Employe>) {
    super(data);
  }
}

export interface EmployeRelations {
  // describe navigational properties here
  id_compte?: CompteWithRelations
}

export type EmployeWithRelations = Employe & EmployeRelations;
