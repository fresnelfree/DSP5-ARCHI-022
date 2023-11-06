// Uncomment these imports to begin using these cool features!
import { getModelSchemaRef, post,get, requestBody, response, HttpErrors, param, patch } from "@loopback/rest";
import { Client, Compte, Employe, User } from "../models";
import { inject, service } from "@loopback/core";
import { TokenServiceBindings } from "@loopback/authentication-jwt";
import { TokenService, authenticate } from "@loopback/authentication";
import {securityId,SecurityBindings, UserProfile} from '@loopback/security';
import { PassportProvider, RepartitionGainsProvider, UserService } from "../services";
import { ClientRepository, CompteRepository, EmployeRepository } from "../repositories";
import {genSalt, hash} from 'bcryptjs';
import { repository } from "@loopback/repository";
import { Axios } from "axios";
const axios = require('axios');

require('dotenv').config();

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
    @inject('services.RepartitionGainsProvider')     
    public repartitionGainsProvider: RepartitionGainsProvider,     
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
            exclude: ['id','id_passport','type_passport'],
          }),
        },
      },
    })
    compte: Compte,
  ): Promise<{token: string}> {      
    if (compte.pwd === "pwd") {
      
    } else {
      
    }
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
    content: {'application/json': {schema: getModelSchemaRef(User,{
      exclude: ['type_passport'],
    })}},
  })
  async register(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['securityId','type_passport'],
          }),
        },
      },
    })
    user: User,
  ): Promise<Compte> {
    return this.userService.saveUser(user);
  } 
  
  @get('/sendEmailVerifyAccount/{email}')
  @response(200, {
    description: 'Compte PATCH success',
    // content: {'application/text': {schema: "result"}}
  })
  async sendEmailVerifyAccount(
    @param.path.string('email') email: string,
  ): Promise<any> {
    const verify = await this.userService.verifyEmail(email)
    if (verify) {
      return "Email vérifié avec success !"
    }
    else {
      return "Le lien de verification a expire. Essayez de vous connecter a votre"+
      " compte àfin d'avoir un nouveau lien de verification !"
    }
  } 
  
  @get('/verifyEmail/{token}')
  @response(200, {
    description: 'Compte PATCH success',
    // content: {'application/text': {schema: "result"}}
  })
  async verifyEmail(
    @param.path.string('token') token: string,
  ): Promise<any> {
    const verify = await this.userService.verifyEmail(token)
    if (verify) {
      return "Email vérifié avec success !"
    }
    else {
      return "Le lien de verification a expire. Essayez de vous connecter a votre"+
      " compte àfin d'avoir un nouveau lien de verification !"
    }
  }
  
  @get('/resetPassword/{email}')
  @response(200, {
    description: 'Compte PATCH success',
    // content: {'application/text': {schema: "result"}}
  })
  async resetPassword(
    @param.path.string('email') email: string,
  ): Promise<any> {
    const verify = await this.userService.resetPassword(email)
  }  

  @get('/testFonction/{count}')
  @response(200, {
    description: 'Compte PATCH success',
  })
  async testGains(
    @param.path.number('count') count: number,
  ): Promise<any> {
    const verify = await this.repartitionGainsProvider.generateUniqueNumbers(0,count,count,1)
  }     
  }


  



  