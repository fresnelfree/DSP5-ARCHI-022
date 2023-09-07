// Uncomment these imports to begin using these cool features!
import { getModelSchemaRef, post,get, requestBody, response } from "@loopback/rest";
import { Compte } from "../models";
import { inject, service } from "@loopback/core";
import { TokenServiceBindings } from "@loopback/authentication-jwt";
import { TokenService, authenticate } from "@loopback/authentication";
import {securityId,SecurityBindings, UserProfile} from '@loopback/security';
import { UserService } from "../services";
import { CompteRepository } from "../repositories";
import {genSalt, hash} from 'bcryptjs';
import { repository } from "@loopback/repository";

export class UserController {
  constructor(
    @repository(CompteRepository)
    public compteRepository : CompteRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,    
    @inject('services.UserService') 
    public userService: UserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,    
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
    content: {'application/json': {schema: getModelSchemaRef(Compte)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compte, {
            title: 'NewCompte',
            exclude: ['id'],
          }),
        },
      },
    })
    compte: Omit<Compte, 'id'>,
  ): Promise<Compte> {
    compte.pwd = await hash(compte.pwd, await genSalt())
    return this.compteRepository.create(compte);
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



  