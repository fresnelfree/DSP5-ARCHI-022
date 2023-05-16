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
Participer,
SessionJeu,
} from '../models';
import {ClientRepository} from '../repositories';

export class ClientSessionJeuController {
  constructor(
    @repository(ClientRepository) protected clientRepository: ClientRepository,
  ) { }

  @get('/clients/{id}/session-jeus', {
    responses: {
      '200': {
        description: 'Array of Client has many SessionJeu through Participer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SessionJeu)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SessionJeu>,
  ): Promise<SessionJeu[]> {
    return this.clientRepository.participer(id).find(filter);
  }

  @post('/clients/{id}/session-jeus', {
    responses: {
      '200': {
        description: 'create a SessionJeu model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionJeu)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Client.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionJeu, {
            title: 'NewSessionJeuInClient',
            exclude: ['id'],
          }),
        },
      },
    }) sessionJeu: Omit<SessionJeu, 'id'>,
  ): Promise<SessionJeu> {
    return this.clientRepository.participer(id).create(sessionJeu);
  }

  @patch('/clients/{id}/session-jeus', {
    responses: {
      '200': {
        description: 'Client.SessionJeu PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionJeu, {partial: true}),
        },
      },
    })
    sessionJeu: Partial<SessionJeu>,
    @param.query.object('where', getWhereSchemaFor(SessionJeu)) where?: Where<SessionJeu>,
  ): Promise<Count> {
    return this.clientRepository.participer(id).patch(sessionJeu, where);
  }

  @del('/clients/{id}/session-jeus', {
    responses: {
      '200': {
        description: 'Client.SessionJeu DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SessionJeu)) where?: Where<SessionJeu>,
  ): Promise<Count> {
    return this.clientRepository.participer(id).delete(where);
  }
}
