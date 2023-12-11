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
import { authenticate } from '@loopback/authentication';
import { RepartitionGainsProvider } from '../services';
import { inject } from '@loopback/core';
import { exit } from 'process';

// @authenticate('jwt')
export class RepartitionController {
  constructor(
    @repository(RepartitionRepository)
    public repartitionRepository : RepartitionRepository,
    @inject('services.RepartitionGainsProvider')     
    public repartitionGainsProvider: RepartitionGainsProvider,    

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
          schema: {
            type: 'array',
            items: getModelSchemaRef(Repartition, {exclude: ["id"]}),
          },
        },
      },
    })
    repartition: Repartition[],
  ): Promise<Repartition> {
    return await this.repartitionGainsProvider.saveRepartionGains(repartition);
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

  @get('/stats')
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
  async getStat(
    @param.filter(Repartition) filter?: Filter<Repartition>,
  ): Promise<any> {
    let stats : any[] = []
    let elt : any
    // let tab1
    // let tab2
    return this.repartitionRepository.execute('SELECT SUM((repartition.pourcentage*session_jeu.nbr_ticket)/100) as quantite, repartition.libelle FROM `repartition` INNER JOIN session_jeu ON repartition.id_session = session_jeu.id GROUP BY repartition.libelle ORDER BY repartition.libelle ASC;')
    .then((rep1:any) => {

      return this.repartitionRepository.execute('SELECT (gains.libelle_gain) as libelle, COUNT(*) as actif FROM gains WHERE gains.etat_gain = "Actif" OR gains.etat_gain = "Rendu" GROUP BY gains.libelle_gain ORDER BY gains.libelle_gain ASC;')
      .then((rep2) => {
        let tab1 = rep1
        console.log(tab1)
        let tab2 = rep2
        console.log(tab2)
        tab1.forEach((elt1:any) => {
          let bool = true
          tab2.forEach((elt2:any) => {
            if (elt1.libelle === elt2.libelle) {
              stats.push({
                "libelle": elt1.libelle,
                "quantite": elt1.quantite,
                "actif": elt2.actif
              })
              bool = false
              exit
            }
          });
          if(bool) {
            stats.push({
              "libelle": elt1.libelle,
              "quantite": elt1.quantite,
              "actif": 0
            })            
          }
        });
        // for (let index = 0; index < tab1.length; index++) {
        //   if (tab2.length <= index) {
        //     elt = {
        //       "libelle": tab1[index].libelle,
        //       "total": tab1[index].quantite,
        //       "actif": 0
        //     }  
        //     stats.push(elt)        
        //   }
        //   else{
        //     if (tab1[index].libelle === tab2[index].libelle) {
        //       elt = {
        //         "libelle": tab1[index].libelle,
        //         "total": tab1[index].quantite,
        //         "actif": tab2[index].actif
        //       }  
        //       stats.push(elt)        
        //     }    
        //   }                
        // }
        return stats
        console.log(stats)        
      })
    })
    // let tab2 = await this.repartitionRepository.execute('SELECT (gains.libelle_gain) as rep, COUNT(gains.etat_gain = "Actif") FROM gains WHERE gains.etat_gain = "Actif" OR gains.etat_gain = "Rendu" GROUP BY gains.libelle_gain ORDER BY gains.libelle_gain ASC;')
    // console.log(tab1[0].libelle)

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
    return this.repartitionRepository.findById(id, {include:["gains"]});
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
