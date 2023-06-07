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
import {Repartition} from '../models';
import {RepartitionRepository} from '../repositories';

export class RepartitionController {
  constructor(
    @repository(RepartitionRepository)
    public repartitionRepository : RepartitionRepository,
  ) {}

  @post('/repartitions')
  @response(200, {
    description: 'Repartition model instance',
    content: {'application/json': {schema: getModelSchemaRef(Repartition)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repartition, {
            title: 'NewRepartition',
            exclude: ['id'],
          }),
        },
      },
    })
    repartition: Omit<Repartition, 'id'>,
  ): Promise<Repartition> {
    return this.repartitionRepository.create(repartition);
  }

  @get('/repartitions/count')
  @response(200, {
    description: 'Repartition model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Repartition) where?: Where<Repartition>,
  ): Promise<Count> {
    return this.repartitionRepository.count(where);
  }

  @get('/repartitions')
  @response(200, {
    description: 'Array of Repartition model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Repartition, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Repartition) filter?: Filter<Repartition>,
  ): Promise<Repartition[]> {
    return this.repartitionRepository.find({include:["gains"]});
  }

  @patch('/repartitions')
  @response(200, {
    description: 'Repartition PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repartition, {partial: true}),
        },
      },
    })
    repartition: Repartition,
    @param.where(Repartition) where?: Where<Repartition>,
  ): Promise<Count> {
    return this.repartitionRepository.updateAll(repartition, where);
  }

  @get('/repartitions/{id}')
  @response(200, {
    description: 'Repartition model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Repartition, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Repartition, {exclude: 'where'}) filter?: FilterExcludingWhere<Repartition>
  ): Promise<Repartition> {
    return this.repartitionRepository.findById(id, filter);
  }

  @patch('/repartitions/{id}')
  @response(204, {
    description: 'Repartition PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repartition, {partial: true}),
        },
      },
    })
    repartition: Repartition,
  ): Promise<void> {
    await this.repartitionRepository.updateById(id, repartition);
  }

  @put('/repartitions/{id}')
  @response(204, {
    description: 'Repartition PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() repartition: Repartition,
  ): Promise<void> {
    await this.repartitionRepository.replaceById(id, repartition);
  }

  @del('/repartitions/{id}')
  @response(204, {
    description: 'Repartition DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.repartitionRepository.deleteById(id);
  }
}
