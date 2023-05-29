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
SessionJeu,
Participer,
Client,
} from '../models';
import {SessionJeuRepository} from '../repositories';

export class SessionJeuClientController {
  constructor(
    @repository(SessionJeuRepository) protected sessionJeuRepository: SessionJeuRepository,
  ) { }

  @get('/session-jeus/{id}/clients', {
    responses: {
      '200': {
        description: 'Array of SessionJeu has many Client through Participer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Client)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Client>,
  ): Promise<Client[]> {
    return this.sessionJeuRepository.clients(id).find(filter);
  }

  @post('/session-jeus/{id}/clients', {
    responses: {
      '200': {
        description: 'create a Client model instance',
        content: {'application/json': {schema: getModelSchemaRef(Client)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SessionJeu.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {
            title: 'NewClientInSessionJeu',
            exclude: ['id'],
          }),
        },
      },
    }) client: Omit<Client, 'id'>,
  ): Promise<Client> {
    return this.sessionJeuRepository.clients(id).create(client);
  }

  @patch('/session-jeus/{id}/clients', {
    responses: {
      '200': {
        description: 'SessionJeu.Client PATCH success count',
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
    return this.sessionJeuRepository.clients(id).patch(client, where);
  }

  @del('/session-jeus/{id}/clients', {
    responses: {
      '200': {
        description: 'SessionJeu.Client DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return this.sessionJeuRepository.clients(id).delete(where);
  }
}
