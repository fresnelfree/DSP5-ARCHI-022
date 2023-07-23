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
  Compte,
  Employe,
} from '../models';
import {CompteRepository} from '../repositories';

export class CompteEmployeController {
  constructor(
    @repository(CompteRepository) protected compteRepository: CompteRepository,
  ) { }

  @get('/comptes/{id}/employe', {
    responses: {
      '200': {
        description: 'Compte has one Employe',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Employe),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Employe>,
  ): Promise<Employe> {
    return this.compteRepository.employe(id).get(filter);
  }

  @post('/comptes/{id}/employe', {
    responses: {
      '200': {
        description: 'Compte model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employe)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Compte.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employe, {
            title: 'NewEmployeInCompte',
            exclude: ['id'],
            optional: ['id_compte']
          }),
        },
      },
    }) employe: Omit<Employe, 'id'>,
  ): Promise<Employe> {
    return this.compteRepository.employe(id).create(employe);
  }

  @patch('/comptes/{id}/employe', {
    responses: {
      '200': {
        description: 'Compte.Employe PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employe, {partial: true}),
        },
      },
    })
    employe: Partial<Employe>,
    @param.query.object('where', getWhereSchemaFor(Employe)) where?: Where<Employe>,
  ): Promise<Count> {
    return this.compteRepository.employe(id).patch(employe, where);
  }

  @del('/comptes/{id}/employe', {
    responses: {
      '200': {
        description: 'Compte.Employe DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employe)) where?: Where<Employe>,
  ): Promise<Count> {
    return this.compteRepository.employe(id).delete(where);
  }
}
