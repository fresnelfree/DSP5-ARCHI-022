import {injectable, /* inject, */ BindingScope, Provider, bind, inject} from '@loopback/core';
require('dotenv').config();
/*
 * Fix the service type. Possible options can be:
 * - import {Passport} from 'your-module';
 * - export type Passport = string;
 * - export interface Passport {}
 */

import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Client, Compte, Employe, User } from '../models';
import { UserService } from './user.service';
import { ClientRepository, CompteRepository, EmployeRepository } from '../repositories';

// @bind({scope: BindingScope.TRANSIENT})
export class PassportProvider {
    // public userService: UserService 
    // public user: User;
    // public client: Client;
    // public employe: Employe;
    // public compte: Compte;

    // public compteRepository: CompteRepository
    // @inject('repository.ClientRepository') 
    // public clientRepository: ClientRepository   
    // @inject('repository.EmployeRepository') 
    // public employeRepository: EmployeRepository

  constructor(
    @inject('services.UserService') 
    public userService: UserService,  
  ){
    // this.user = new User
    // this.client = new Client
    // this.employe = new Employe  
    // this.compte = new Compte        
    // this.userService = new UserService(
    //   this.compteRepository,
    //   this.clientRepository,   
    //   this.employeRepository,this.client,this.employe,this.compte,this.user
    // )
  }

  async setupPassportFacebook(passport:any,profileU:User): Promise<any> {

    passport.use(new FacebookStrategy({
      clientID:'834324708244777',
      clientSecret: 'b23338d8d100a9f261b7d3199fe7ef06',
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['id', 'first_name','last_name','picture','gender','emails']
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log("profile: ",profile)
      console.log("accessToken: ",accessToken)
      console.log("refreshToken: ",refreshToken)
      console.log("cb: ",cb)
      profileU.securityId = profile._json.id
      profileU.nom = profile._json.last_name
      profileU.prenom = profile._json.first_name
      profileU.type_passport = "facebook"  
      profileU.email = profile._json.email    
      cb(null, profile);  
      return profile._json      
    }
    ));    
  }

  async setupPassportGoogle(passport:any,profileU:User): Promise<any> {

    passport.use(new GoogleStrategy({
      clientID:'574508009757-dfq7soqtakor952logu1rup06r53hsjr.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log("profile: ",profile)
      console.log("accessToken: ",accessToken)
      console.log("refreshToken: ",refreshToken)
      console.log("cb: ",cb)
      cb(null, profile);
      profileU.securityId = profile._json.sub
      profileU.nom = profile._json.name || ""
      profileU.prenom = profile._json.given_name || ""
      profileU.type_passport = "google"  
      profileU.email = profile._json.email || ""
      
      return profile._json
    }
    ));
    this.userService.saveUser(profileU)
  }
  
}
