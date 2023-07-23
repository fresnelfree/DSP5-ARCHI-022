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
  Employe,
  SessionJeu,
} from '../models';
import {EmployeRepository} from '../repositories';

export class EmployeSessionJeuController {
  constructor(
    @repository(EmployeRepository) protected employeRepository: EmployeRepository,
  ) { }

  @get('/employes/{id}/session-jeus', {
    responses: {
      '200': {
        description: 'Array of Employe has many SessionJeu',
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
    return this.employeRepository.sessionJeus(id).find(filter);
  }

  @post('/employes/{id}/session-jeus', {
    responses: {
      '200': {
        description: 'Employe model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionJeu)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Employe.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionJeu, {
            title: 'NewSessionJeuInEmploye',
            exclude: ['id'],
            optional: ['id_employe']
          }),
        },
      },
    }) sessionJeu: Omit<SessionJeu, 'id'>,
  ): Promise<SessionJeu> {
    return this.employeRepository.sessionJeus(id).create(sessionJeu);
  }

  @patch('/employes/{id}/session-jeus', {
    responses: {
      '200': {
        description: 'Employe.SessionJeu PATCH success count',
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
    return this.employeRepository.sessionJeus(id).patch(sessionJeu, where);
  }

  @del('/employes/{id}/session-jeus', {
    responses: {
      '200': {
        description: 'Employe.SessionJeu DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SessionJeu)) where?: Where<SessionJeu>,
  ): Promise<Count> {
    return this.employeRepository.sessionJeus(id).delete(where);
  }
}
