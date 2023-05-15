import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Compte} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'DSP5-ARCHI-DB', table: 'employe'},
    foreignKeys: {
      fkPosseder2Rel: {
        name: 'fkPosseder2Rel',
        entity: 'Compte',
        entityKey: 'id',
        foreignKey: 'idCompte'
      }
    }
  }
})
export class Employe extends Entity {
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

  @belongsTo(() => Compte)
  idCompte?: number;

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
}

export type EmployeWithRelations = Employe & EmployeRelations;
