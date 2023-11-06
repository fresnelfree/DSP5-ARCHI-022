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
  Repartition,
} from '../models';
import {SessionJeuRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';

@authenticate('jwt')
export class SessionJeuRepartitionController {
  constructor(
    @repository(SessionJeuRepository) protected sessionJeuRepository: SessionJeuRepository,
  ) { }

  @get('/session-jeus/{id}/repartitions', {
    responses: {
      '200': {
        description: 'Array of SessionJeu has many Repartition',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Repartition)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Repartition>,
  ): Promise<Repartition[]> {
    return this.sessionJeuRepository.repartitions(id).find(filter);
  }

  @post('/session-jeus/{id}/repartitions', {
    responses: {
      '200': {
        description: 'SessionJeu model instance',
        content: {'application/json': {schema: getModelSchemaRef(Repartition)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SessionJeu.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repartition, {
            title: 'NewRepartitionInSessionJeu',
            exclude: ['id'],
            optional: ['id_session']
          }),
        },
      },
    }) repartition: Omit<Repartition, 'id'>,
  ): Promise<Repartition> {
    return this.sessionJeuRepository.repartitions(id).create(repartition);
  }

  @patch('/session-jeus/{id}/repartitions', {
    responses: {
      '200': {
        description: 'SessionJeu.Repartition PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repartition, {partial: true}),
        },
      },
    })
    repartition: Partial<Repartition>,
    @param.query.object('where', getWhereSchemaFor(Repartition)) where?: Where<Repartition>,
  ): Promise<Count> {
    return this.sessionJeuRepository.repartitions(id).patch(repartition, where);
  }

  @del('/session-jeus/{id}/repartitions', {
    responses: {
      '200': {
        description: 'SessionJeu.Repartition DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Repartition)) where?: Where<Repartition>,
  ): Promise<Count> {
    return this.sessionJeuRepository.repartitions(id).delete(where);
  }
}
