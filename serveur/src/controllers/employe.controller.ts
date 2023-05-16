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
import {Employe} from '../models';
import {EmployeRepository} from '../repositories';

export class EmployeController {
  constructor(
    @repository(EmployeRepository)
    public employeRepository : EmployeRepository,
  ) {}

  @post('/employes')
  @response(200, {
    description: 'Employe model instance',
    content: {'application/json': {schema: getModelSchemaRef(Employe)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employe, {
            title: 'NewEmploye',
            exclude: ['id'],
          }),
        },
      },
    })
    employe: Omit<Employe, 'id'>,
  ): Promise<Employe> {
    return this.employeRepository.create(employe);
  }

  @get('/employes/count')
  @response(200, {
    description: 'Employe model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Employe) where?: Where<Employe>,
  ): Promise<Count> {
    return this.employeRepository.count(where);
  }

  @get('/employes')
  @response(200, {
    description: 'Array of Employe model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Employe, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Employe) filter?: Filter<Employe>,
  ): Promise<Employe[]> {
    return this.employeRepository.find(filter);
  }

  @patch('/employes')
  @response(200, {
    description: 'Employe PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employe, {partial: true}),
        },
      },
    })
    employe: Employe,
    @param.where(Employe) where?: Where<Employe>,
  ): Promise<Count> {
    return this.employeRepository.updateAll(employe, where);
  }

  @get('/employes/{id}')
  @response(200, {
    description: 'Employe model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Employe, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Employe, {exclude: 'where'}) filter?: FilterExcludingWhere<Employe>
  ): Promise<Employe> {
    return this.employeRepository.findById(id, filter);
  }

  @patch('/employes/{id}')
  @response(204, {
    description: 'Employe PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employe, {partial: true}),
        },
      },
    })
    employe: Employe,
  ): Promise<void> {
    await this.employeRepository.updateById(id, employe);
  }

  @put('/employes/{id}')
  @response(204, {
    description: 'Employe PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() employe: Employe,
  ): Promise<void> {
    await this.employeRepository.replaceById(id, employe);
  }

  @del('/employes/{id}')
  @response(204, {
    description: 'Employe DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.employeRepository.deleteById(id);
  }
}
