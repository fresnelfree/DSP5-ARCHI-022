import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {compare} from 'bcryptjs';
import { Compte, User } from '../models';
import { ClientRepository, CompteRepository, EmployeRepository } from '../repositories';
import { BindingScope, bind, inject } from '@loopback/core';

@bind({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(CompteRepository) 
    public compteRepository: CompteRepository,
    @repository(ClientRepository) 
    public clientRepository: ClientRepository,   
    @repository(EmployeRepository) 
    public employeRepository: EmployeRepository,
    @inject('models.User')
    public user: User     
  ) {}

  /*
   * Add service methods here
   */

  async verifyCredentials(compte: Compte): Promise<Compte> {
    const invalidCredentialsError = 'Invalid email or password.';
    // console.log('compte: ', compte)
    const foundCompte = await this.compteRepository.findOne({
      where: {mail: compte.mail},
    });
    if (!foundCompte) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    // console.log('foundCompte: ', foundCompte)
    const passwordMatched = await compare(
      compte.pwd || "",foundCompte.pwd || ""
    )
    // console.log('passwordMatched: ', passwordMatched)
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundCompte;
  }

  async convertToUserProfile(compte: Compte): Promise<User> {
    // console.log('compte: ', compte)
    const client = await this.clientRepository.findOne({where: {id_compte: compte.id}})
    // console.log('client: ', client)
    const userNotExistError = "Aucun user pour ce compte"
    if (client) {
      this.user.securityId = client.id?.toString() || ""
      this.user.nom = client.nom || ""
      this.user.prenom = client.prenom || ""   
      this.user.tel = client.tel || ""
      this.user.email = client.email || ""
      this.user.adresse = client.adresse || ""
    }else{
      const employe = await this.employeRepository.findOne({where: {id_compte: compte.id}})
      // console.log('employe: ', employe)
      if (!employe) {
        throw new HttpErrors.Unauthorized(userNotExistError);
      }
      this.user.securityId = employe?.id?.toString() || ""
      this.user.nom = employe?.nom || ""
      this.user.prenom = employe?.prenom || ""     
      this.user.tel = employe?.tel || ""
      this.user.email = employe?.email || ""
      this.user.adresse = employe?.adresse || ""       
    }
    return this.user
  }

}
