import {Model, model, property} from '@loopback/repository';
import {securityId, UserProfile} from '@loopback/security';

@model({settings: {strict: false}})
export class User extends Model {
  @property({
    type: 'string',
    required: false,
  })
  fullname: string;

  @property({
    type: 'string',
    required: false,
  })
  tel: string;

  @property({
    type: 'string',
    required: false,
  })
  email: string;

  @property({
    type: 'string',
    required: false,
  })
  adresse: string;

  @property({
    type: 'string',
    default: "Client",
  })
  role?: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  [securityId]: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
