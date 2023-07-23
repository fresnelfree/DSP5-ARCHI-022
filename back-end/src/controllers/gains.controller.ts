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
import {Gains} from '../models';
import {GainsRepository} from '../repositories';

export class GainsController {
  constructor(
    @repository(GainsRepository)
    public gainsRepository : GainsRepository,
  ) {}

  @post('/gains')
  @response(200, {
    description: 'Gains model instance',
    content: {'application/json': {schema: getModelSchemaRef(Gains)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gains, {
            title: 'NewGains',
            exclude: ['id'],
          }),
        },
      },
    })
    gains: Omit<Gains, 'id'>,
  ): Promise<Gains> {
    return this.gainsRepository.create(gains);
  }

  @get('/gains/count')
  @response(200, {
    description: 'Gains model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Gains) where?: Where<Gains>,
  ): Promise<Count> {
    return this.gainsRepository.count(where);
  }

  @get('/gains')
  @response(200, {
    description: 'Array of Gains model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Gains, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Gains) filter?: Filter<Gains>,
  ): Promise<Gains[]> {
    return this.gainsRepository.find(filter);
  }

  @patch('/gains')
  @response(200, {
    description: 'Gains PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gains, {partial: true}),
        },
      },
    })
    gains: Gains,
    @param.where(Gains) where?: Where<Gains>,
  ): Promise<Count> {
    return this.gainsRepository.updateAll(gains, where);
  }

  @get('/gains/{id}')
  @response(200, {
    description: 'Gains model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Gains, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Gains, {exclude: 'where'}) filter?: FilterExcludingWhere<Gains>
  ): Promise<Gains> {
    return this.gainsRepository.findById(id, filter);
  }

  @patch('/gains/{id}')
  @response(204, {
    description: 'Gains PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gains, {partial: true}),
        },
      },
    })
    gains: Gains,
  ): Promise<void> {
    await this.gainsRepository.updateById(id, gains);
  }

  @put('/gains/{id}')
  @response(204, {
    description: 'Gains PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() gains: Gains,
  ): Promise<void> {
    await this.gainsRepository.replaceById(id, gains);
  }

  @del('/gains/{id}')
  @response(204, {
    description: 'Gains DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.gainsRepository.deleteById(id);
  }
}
