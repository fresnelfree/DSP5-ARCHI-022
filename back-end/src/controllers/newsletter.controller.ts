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
import {Newsletter} from '../models';
import {NewsletterRepository} from '../repositories';

export class NewsletterController {
  constructor(
    @repository(NewsletterRepository)
    public newsletterRepository : NewsletterRepository,
  ) {}

  @post('/newsletters')
  @response(200, {
    description: 'Newsletter model instance',
    content: {'application/json': {schema: getModelSchemaRef(Newsletter)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Newsletter, {
            title: 'NewNewsletter',
            exclude: ['id'],
          }),
        },
      },
    })
    newsletter: Omit<Newsletter, 'id'>,
  ): Promise<Newsletter> {
    return this.newsletterRepository.create(newsletter);
  }

  @get('/newsletters/count')
  @response(200, {
    description: 'Newsletter model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Newsletter) where?: Where<Newsletter>,
  ): Promise<Count> {
    return this.newsletterRepository.count(where);
  }

  @get('/newsletters')
  @response(200, {
    description: 'Array of Newsletter model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Newsletter, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Newsletter) filter?: Filter<Newsletter>,
  ): Promise<Newsletter[]> {
    return this.newsletterRepository.find(filter);
  }

  @patch('/newsletters')
  @response(200, {
    description: 'Newsletter PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Newsletter, {partial: true}),
        },
      },
    })
    newsletter: Newsletter,
    @param.where(Newsletter) where?: Where<Newsletter>,
  ): Promise<Count> {
    return this.newsletterRepository.updateAll(newsletter, where);
  }

  @get('/newsletters/{id}')
  @response(200, {
    description: 'Newsletter model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Newsletter, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Newsletter, {exclude: 'where'}) filter?: FilterExcludingWhere<Newsletter>
  ): Promise<Newsletter> {
    return this.newsletterRepository.findById(id, filter);
  }

  @patch('/newsletters/{id}')
  @response(204, {
    description: 'Newsletter PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Newsletter, {partial: true}),
        },
      },
    })
    newsletter: Newsletter,
  ): Promise<void> {
    await this.newsletterRepository.updateById(id, newsletter);
  }

  @put('/newsletters/{id}')
  @response(204, {
    description: 'Newsletter PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() newsletter: Newsletter,
  ): Promise<void> {
    await this.newsletterRepository.replaceById(id, newsletter);
  }

  @del('/newsletters/{id}')
  @response(204, {
    description: 'Newsletter DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.newsletterRepository.deleteById(id);
  }
}
