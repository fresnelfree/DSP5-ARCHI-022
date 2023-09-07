// Uncomment these imports to begin using these cool features!
import { getModelSchemaRef, post,get, requestBody, response, HttpErrors } from "@loopback/rest";
import { Client, Compte, Employe, User } from "../models";
import { inject, service } from "@loopback/core";
import { TokenServiceBindings } from "@loopback/authentication-jwt";
import { TokenService, authenticate } from "@loopback/authentication";
import {securityId,SecurityBindings, UserProfile} from '@loopback/security';
import { UserService } from "../services";
import { ClientRepository, CompteRepository, EmployeRepository } from "../repositories";
import {genSalt, hash} from 'bcryptjs';
import { repository } from "@loopback/repository";

export class UserController {
  constructor(
    @repository(CompteRepository)
    public compteRepository : CompteRepository,
    @repository(ClientRepository)
    public clientRepository : ClientRepository,    
    @repository(EmployeRepository)
    public employeRepository : EmployeRepository, 
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,    
    @inject('services.UserService') 
    public userService: UserService,  
    @inject('models.Client')
    public client: Client,
    @inject('models.Employe')
    public employe: Employe,
    @inject('models.Compte')
    public compte: Compte         
  ) {}


  @post('/users/login')
  @response(200, {
      description: 'Token',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
            },
          },
        },
      },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compte, {
            exclude: ['id'],
          }),
        },
      },
    })
    compte: Compte,
  ): Promise<{token: string}> {      
  // ensure the user exists, and the password is correct
  const user = await this.userService.verifyCredentials(compte);
  // convert a User object into a UserProfile object (reduced set of properties)
  const userProfile = await this.userService.convertToUserProfile(user);
  
  // create a JSON Web Token based on the user profile
  const token = await this.jwtService.generateToken(userProfile);    
    return {token};
  }
  
  @post('/users/register')
  @response(200, {
    description: 'Compte model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['securityId'],
          }),
        },
      },
    })
    user: User,
  ): Promise<Compte> {
    const invalidUserRoleError = "Invalid user role"
    const invalidInfosError = "Invalid informations"   

    this.compte.mail = user.email 
    this.compte.pwd = await hash(user.pwd, await genSalt())

    if (user.role !== "Caissier" && user.role !== "Admin" && user.role !== "Client"){
      throw new HttpErrors.BadRequest(invalidUserRoleError)
    }

    const comp = await this.compteRepository.create({
      'mail':user.email,
      'pwd': await hash(user.pwd, await genSalt())
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
      'adresse': user.adresse,
      'email': user.email,
      'nom': user.nom,
      'prenom': user.prenom,
      'id_compte': comp.id,
      'tel': user.tel
    })
    }
    else {
      this.employe = await this.employeRepository.create({
        'adresse': user.adresse,
        'mail': user.email,
        'nom': user.nom,
        'prenom': user.prenom,
        'id_compte': comp.id,
        'tel': user.tel,
        'role': user.role
      })
    }
    return comp;
  }  
  
  @authenticate('jwt')
  @get('/whoami')
  @response(
      200, {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    )
    async whoAmi(
      @inject(SecurityBindings.USER)
      currentUserProfile: UserProfile,
    ): Promise<string> {
      return currentUserProfile[securityId];
    } 


}



  