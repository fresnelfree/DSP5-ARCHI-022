import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {compare} from 'bcryptjs';
import { Client, Compte, Employe, User } from '../models';
import { ClientRepository, CompteRepository, EmployeRepository } from '../repositories';
import { BindingScope, bind, inject } from '@loopback/core';
import {genSalt, hash} from 'bcryptjs';
import { PassportProvider } from './passport.service';
import { StatisticsService } from './statistics.service';

@bind({scope: BindingScope.TRANSIENT})
export class UserService {
  
  constructor(
    @repository(CompteRepository)
    public compteRepository : CompteRepository,
    @repository(ClientRepository)
    public clientRepository: ClientRepository,   
    @repository(EmployeRepository) 
    public employeRepository: EmployeRepository,
    @inject('services.PassportProvider') 
    public passportService: PassportProvider, 
    @inject('services.PassportProvider') 
    public statService: StatisticsService,     
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
    const DuplicateCompterror = "Un compte existe déjà avec cette email" 
    this.compte.email = user.email 
    this.compte.pwd = await hash(user.pwd, await genSalt())

    if (user.role !== "Caissier" && user.role !== "Admin" && user.role !== "Client"){
      throw new HttpErrors.BadRequest(invalidUserRoleError)
    }

    const foundCompte = await this.compteRepository.findOne({where: {email: user.email}});
    if (foundCompte) {
      throw new HttpErrors.BadRequest(DuplicateCompterror);
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
    this.passportService.sendLinkVerifyEmail(user)
    return comp
  }

  async verifyEmail(token: string): Promise<any> {
    const jwt = require('jsonwebtoken');
    const secretKey = 'myjwts3cr3t';    
    const invalidCredentialsError = 'Aucun compte appartenant à cette email'
    let email = ''

    try {
      const decoded = jwt.verify(token, secretKey);
      email = decoded.email
      console.log(decoded); // Affiche le contenu décodé du token
    } catch (error) {
      // throw HttpErrors.Unauthorized("Le lien a expiré");
      // console.error('Erreur de décodage du token :', error);
      return false
    }

    const foundCompte = await this.compteRepository.findOne({where: {email: email}});
    if (!foundCompte) {
      throw new HttpErrors.NotFound(invalidCredentialsError);
    }
    console.log("compte : ", foundCompte)
    foundCompte.email_verify = true

    await this.compteRepository.updateById(foundCompte.id, foundCompte);

    return true
  }

  async sendEmailVerify(email:string): Promise<string> {
    const invalidCredentialsError = 'Aucun compte appartenant à cette email'
    const foundCompte = await this.compteRepository.findOne({where: {email: email}});
    if (!foundCompte) {
      throw new HttpErrors.NotFound(invalidCredentialsError);
    }
    this.user.adresse = foundCompte.client.adresse
    this.user.email = foundCompte.client.email || ""
    this.user.nom = foundCompte.client.nom || ""
    this.user.prenom = foundCompte.client.prenom || ""    
    this.user.tel = foundCompte.client.tel
    // const user: any = {
    //   'adresse': foundCompte.client.adresse || " ",
    //   'email': foundCompte.client.email || " ",
    //   'nom': foundCompte.client.nom || " ",
    //   'prenom': foundCompte.client.prenom || " ",
    //   'id_compte': foundCompte.id || " ",
    //   'tel': foundCompte.client.tel || " ",
    // }  
    this.passportService.sendLinkVerifyEmail(this.user)
    return "l'email de confirmation de compte a été envoyé !"
  }

  async resetPassword(email: string): Promise<any> {
    let user : User
    const invalidCredentialsError = 'Aucun compte appartenant à cette email'

    const foundCompte = await this.compteRepository.findOne({where: {email: email},include:['client']});
    if (!foundCompte) {
      throw new HttpErrors.NotFound(invalidCredentialsError);
    }
    console.log("compte : ", foundCompte)
    this.user.adresse = foundCompte.client.adresse
    this.user.email = foundCompte.client.email || ""
    this.user.nom = foundCompte.client.nom || ""
    this.user.prenom = foundCompte.client.prenom || ""    
    this.user.tel = foundCompte.client.tel
    this.passportService.resetPassword(this.user)
  }  
}
