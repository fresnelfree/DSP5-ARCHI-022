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
  Repartition,
  Gains,
} from '../models';
import {RepartitionRepository} from '../repositories';

export class RepartitionGainsController {
  constructor(
    @repository(RepartitionRepository) protected repartitionRepository: RepartitionRepository,
  ) { }

  @get('/repartitions/{id}/gains', {
    responses: {
      '200': {
        description: 'Array of Repartition has many Gains',
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
    return this.repartitionRepository.gains(id).find(filter);
  }

  @post('/repartitions/{id}/gains', {
    responses: {
      '200': {
        description: 'Repartition model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gains)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Repartition.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gains, {
            title: 'NewGainsInRepartition',
            exclude: ['id'],
            optional: ['id_repartition']
          }),
        },
      },
    }) gains: Omit<Gains, 'id'>,
  ): Promise<Gains> {
    return this.repartitionRepository.gains(id).create(gains);
  }

  @patch('/repartitions/{id}/gains', {
    responses: {
      '200': {
        description: 'Repartition.Gains PATCH success count',
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
    return this.repartitionRepository.gains(id).patch(gains, where);
  }

  @del('/repartitions/{id}/gains', {
    responses: {
      '200': {
        description: 'Repartition.Gains DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Gains)) where?: Where<Gains>,
  ): Promise<Count> {
    return this.repartitionRepository.gains(id).delete(where);
  }
}
