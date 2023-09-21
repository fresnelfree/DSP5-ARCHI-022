// Uncomment these imports to begin using these cool features!
import { getModelSchemaRef, post,get, requestBody, response, HttpErrors } from "@loopback/rest";
import { Client, Compte, Employe, User } from "../models";
import { inject, service } from "@loopback/core";
import { TokenServiceBindings } from "@loopback/authentication-jwt";
import { TokenService, authenticate } from "@loopback/authentication";
import {securityId,SecurityBindings, UserProfile} from '@loopback/security';
import { PassportProvider, UserService } from "../services";
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
    // @inject('services.PassportProvider') 
    // public passportService: PassportProvider,     
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
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async register(
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
    return this.userService.saveUser(user);
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

  // @get('/auth/facebook')
  // @response(
  //     200, {
  //       description: 'Return current user',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'string',
  //           },
  //         },
  //       },
  //     },
  //   )
  //   async authFacebook(): Promise<any> {
  //     axios.get('http://localhost:4000/auth/google/')
  //     .then((response:any) => {
  //       console.log(response.data);
  //       return response.data
  //     })
  //     .catch((error:any) => {
  //       console.error(error);
  //     });
  //   }     

  // @get('/auth/facebook/callback')
  // @response(
  //     200, {
  //       description: 'Return current user',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'string',
  //           },
  //         },
  //       },
  //     },
  //   )
  //   async callBack(): Promise<any> {
  //     var passport = require('passport')
  //     // this.passportService.setupPassport(passport)
  //     const pass = passport.authenticate('facebook', { failureRedirect: '/users/login' })
  //     console.log("pass : ", pass)
  //   } 
    
  }


  



  