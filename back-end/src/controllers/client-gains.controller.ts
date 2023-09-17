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
  Client,
  Gains,
} from '../models';
import {ClientRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
export class ClientGainsController {
  constructor(
    @repository(ClientRepository) protected clientRepository: ClientRepository,
  ) { }

  @get('/clients/{id}/gains', {
    responses: {
      '200': {
        description: 'Array of Client has many Gains',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Gains)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Gains>,
  ): Promise<Gains[]> {
    return this.clientRepository.gains(id).find(filter);
  }

  @post('/clients/{id}/gains', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gains)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Client.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gains, {
            title: 'NewGainsInClient',
            exclude: ['id'],
            optional: ['id_client']
          }),
        },
      },
    }) gains: Omit<Gains, 'id'>,
  ): Promise<Gains> {
    return this.clientRepository.gains(id).create(gains);
  }

  @patch('/clients/{id}/gains', {
    responses: {
      '200': {
        description: 'Client.Gains PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gains, {partial: true}),
        },
      },
    })
    gains: Partial<Gains>,
    @param.query.object('where', getWhereSchemaFor(Gains)) where?: Where<Gains>,
  ): Promise<Count> {
    return this.clientRepository.gains(id).patch(gains, where);
  }

  @del('/clients/{id}/gains', {
    responses: {
      '200': {
        description: 'Client.Gains DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Gains)) where?: Where<Gains>,
  ): Promise<Count> {
    return this.clientRepository.gains(id).delete(where);
  }
}
