import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {SessionJeu} from '../models';
import {SessionJeuRepository} from '../repositories';

export class SessionJeuController {
  constructor(
    @repository(SessionJeuRepository)
    public sessionJeuRepository : SessionJeuRepository,
  ) {}

  @post('/session-jeus')
  @response(200, {
    description: 'SessionJeu model instance',
    content: {'application/json': {schema: getModelSchemaRef(SessionJeu)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionJeu, {
            title: 'NewSessionJeu',
            exclude: ['id'],
          }),
        },
      },
    })
    sessionJeu: Omit<SessionJeu, 'id'>,
  ): Promise<SessionJeu> {
    return this.sessionJeuRepository.create(sessionJeu);
  }

  @get('/session-jeus/count')
  @response(200, {
    description: 'SessionJeu model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SessionJeu) where?: Where<SessionJeu>,
  ): Promise<Count> {
    return this.sessionJeuRepository.count(where);
  }

  @get('/session-jeus')
  @response(200, {
    description: 'Array of SessionJeu model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SessionJeu, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SessionJeu) filter?: Filter<SessionJeu>,
  ): Promise<SessionJeu[]> {
    return this.sessionJeuRepository.find(filter);
  }

  @patch('/session-jeus')
  @response(200, {
    description: 'SessionJeu PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionJeu, {partial: true}),
        },
      },
    })
    sessionJeu: SessionJeu,
    @param.where(SessionJeu) where?: Where<SessionJeu>,
  ): Promise<Count> {
    return this.sessionJeuRepository.updateAll(sessionJeu, where);
  }

  @get('/session-jeus/{id}')
  @response(200, {
    description: 'SessionJeu model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SessionJeu, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SessionJeu, {exclude: 'where'}) filter?: FilterExcludingWhere<SessionJeu>
  ): Promise<SessionJeu> {
    return this.sessionJeuRepository.findById(id, filter);
  }

  @patch('/session-jeus/{id}')
  @response(204, {
    description: 'SessionJeu PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionJeu, {partial: true}),
        },
      },
    })
    sessionJeu: SessionJeu,
  ): Promise<void> {
    await this.sessionJeuRepository.updateById(id, sessionJeu);
  }

  @put('/session-jeus/{id}')
  @response(204, {
    description: 'SessionJeu PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sessionJeu: SessionJeu,
  ): Promise<void> {
    await this.sessionJeuRepository.replaceById(id, sessionJeu);
  }

  @del('/session-jeus/{id}')
  @response(204, {
    description: 'SessionJeu DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sessionJeuRepository.deleteById(id);
  }
}
