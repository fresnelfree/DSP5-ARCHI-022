import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Compte,
  Client,
} from '../models';
import {CompteRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
export class CompteClientController {
  constructor(
    @repository(CompteRepository) protected compteRepository: CompteRepository,
  ) { }

  @get('/comptes/{id}/client', {
    responses: {
      '200': {
        description: 'Compte has one Client',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Client),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Client>,
  ): Promise<Client> {
    return this.compteRepository.client(id).get(filter);
  }

  @post('/comptes/{id}/client', {
    responses: {
      '200': {
        description: 'Compte model instance',
        content: {'application/json': {schema: getModelSchemaRef(Client)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Compte.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {
            title: 'NewClientInCompte',
            exclude: ['id'],
            optional: ['id_compte']
          }),
        },
      },
    }) client: Omit<Client, 'id'>,
  ): Promise<Client> {
    return this.compteRepository.client(id).create(client);
  }

  @patch('/comptes/{id}/client', {
    responses: {
      '200': {
        description: 'Compte.Client PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {partial: true}),
        },
      },
    })
    client: Partial<Client>,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return this.compteRepository.client(id).patch(client, where);
  }

  @del('/comptes/{id}/client', {
    responses: {
      '200': {
        description: 'Compte.Client DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return this.compteRepository.client(id).delete(where);
  }
}
