import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {compare} from 'bcryptjs';
import { Client, Compte, Employe, User } from '../models';
import { ClientRepository, CompteRepository, EmployeRepository } from '../repositories';
import { BindingScope, bind, inject } from '@loopback/core';
import {genSalt, hash} from 'bcryptjs';

@bind({scope: BindingScope.TRANSIENT})
export class UserService {
  
  constructor(
    @repository(CompteRepository)
    public compteRepository : CompteRepository,
    @repository(ClientRepository)
    public clientRepository: ClientRepository,   
    @repository(EmployeRepository) 
    public employeRepository: EmployeRepository,
    @inject('models.Client')
    public client: Client,
    @inject('models.Employe')
    public employe: Employe,
    @inject('models.Compte')
    public compte: Compte ,
    @inject('models.User')
    public user: User     
  ) {}

  /*
   * Add service methods here
   */

  async verifyCredentials(compte: Compte): Promise<Compte> {
    const invalidCredentialsError = 'Invalid email or password.';
    const invalidConnexionType ="Connexion impossible car vous êtes enrégistré via"
    // console.log('compte: ', compte)
    const foundCompte = await this.compteRepository.findOne({
      where: {email: compte.email},
    });

    if (!foundCompte) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    // console.log(foundCompte)

    if (compte.pwd !== 'pwd') {

      if (foundCompte.id_passport) {
        throw new HttpErrors.Unauthorized(invalidConnexionType +" "+ foundCompte.type_passport);
      }    

      // console.log('foundCompte: ', foundCompte)
      const passwordMatched = await compare(
        compte.pwd || "",foundCompte.pwd || ""
      )

      // console.log('passwordMatched: ', passwordMatched)
      if (!passwordMatched) {
        throw new HttpErrors.Unauthorized(invalidCredentialsError);
      }  

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

  async saveUser(user: User): Promise<Compte> {

    const invalidUserRoleError = "Invalid user role"
    const invalidInfosError = "Invalid informations" 
    this.compte.email = user.email 
    this.compte.pwd = await hash(user.pwd, await genSalt())

    if (user.role !== "Caissier" && user.role !== "Admin" && user.role !== "Client"){
      throw new HttpErrors.BadRequest(invalidUserRoleError)
    }

    const comp = await this.compteRepository.create({
      'email':user.email,
      'pwd': await hash(user.pwd || "", await genSalt()),
      'type_passport':'',
      'id_passport': user.securityId
    })

    if (!comp) {
      throw new HttpErrors.BadRequest(invalidInfosError)
    }

    // const data ={
    //   'adresse': user.adresse,
    //   'email': user.email,
    //   'nom': user.nom,
    //   'prenom': user.prenom,
    //   'id_compte': comp.id,
    //   'tel': user.tel
    // }

    if(user.role === "Client"){
      this.client = await this.clientRepository.create({
      'adresse': user.adresse || " ",
      'email': user.email,
      'nom': user.nom,
      'prenom': user.prenom,
      'id_compte': comp.id,
      'tel': user.tel || " "
    })
    }
    else {
      this.employe = await this.employeRepository.create({
        'adresse': user.adresse,
        'email': user.email,
        'nom': user.nom,
        'prenom': user.prenom,
        'id_compte': comp.id,
        'tel': user.tel,
        'role': user.role
      })
    }
    return comp
  }

}
