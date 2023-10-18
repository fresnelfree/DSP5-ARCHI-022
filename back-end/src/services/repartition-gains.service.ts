import {injectable, /* inject, */ BindingScope, Provider, bind} from '@loopback/core';
import { Gains, Repartition } from '../models';
import { GainsRepository, RepartitionRepository, SessionJeuRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';

/*
 * Fix the service type. Possible options can be:
 * - import {RepartitionGains} from 'your-module';
 * - export type RepartitionGains = string;
 * - export interface RepartitionGains {}
 */
// export type RepartitionGains = unknown;

@bind({scope: BindingScope.TRANSIENT})
export class RepartitionGainsProvider {
  constructor(
    @repository(SessionJeuRepository)
    public sessionJeuRepository : SessionJeuRepository,
    @repository(RepartitionRepository)
    public repartitionRepository : RepartitionRepository,  
    @repository(GainsRepository)
    public gainsRepository : GainsRepository,       
  ) {}

  generateUniqueNumbers(min:number, max:number, count:number,uniqCode:number) {
    if (max - min + 1 < count) {
      throw new Error("La plage ne contient pas suffisamment de chiffres uniques.");
    }
  
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < count) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add("S"+uniqCode+this.standardNumber(randomNum,max));
    }
    console.log("uniqueNumbers: ",Array.from(uniqueNumbers))
    return Array.from(uniqueNumbers);
  }
  
  standardNumber(val:number,maxVal:number) {
    let numberString = ""
    let max = maxVal.toString().length - val.toString().length
    for (let index = 0; index < max; index++) {
        numberString = numberString +""+0
    }
    return numberString+val
  }

  async saveRepartionGains(repartitions: Repartition[]) :Promise<any> {
    // console.log('repartitions: ',repartitions)
    let indexStart =0
    let indexEnd =0
    const invalidIdSessionError = "La session n'existe pas en base de donnée"
    let code :any 
    let newRepartition: Repartition[] = []
    const session = await this.sessionJeuRepository.findById(repartitions[0].id_session)
    if (!session) {
      throw new HttpErrors.BadRequest(invalidIdSessionError)
    }
    const codesTicket = this.generateUniqueNumbers(0,session.nbr_ticket,session.nbr_ticket,session.id)
    let tab :any[]

    for (let index = 0; index < repartitions.length; index++) {
      const item = repartitions[index];
      let repartition = await this.repartitionRepository.create({
        "id_session": session.id,
        "pourcentage": item.pourcentage,
        "libelle": item.libelle})
        item.id = repartition.id

        indexEnd = indexEnd + (session.nbr_ticket * item.pourcentage)/100
        for (let index = indexStart; index < indexEnd; index++) {
          code = codesTicket[index]
          console.log('code : ',code);
          let gainCreate = await this.gainsRepository.create({
            "id_repartition": repartition.id,
            "libelle_gain": repartition.libelle,
            "numero_gain": code ,
            "etat_gain": "Inactif"
          });
          console.log("gainCreate :",gainCreate)        
          indexStart= indexEnd
        }               
    }

    console.log('newRepartition : ',newRepartition);
    for (let index = 0; index < newRepartition.length; index++) {
      const rep = newRepartition[index];
      // console.log('rep : ',rep);
      
    }
  
  }
}


