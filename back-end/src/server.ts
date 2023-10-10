import express from 'express';
import http from 'http';
import {Request, Response} from 'express';
import path from 'path';
import {once} from 'events';
import {ApplicationConfig,App} from './application';
import passport from 'passport';
import session from 'express-session';
import { Client, Compte, Employe, User } from './models';
import { inject } from '@loopback/core';
import { PassportProvider, UserService } from './services';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { ClientRepository, CompteRepository, EmployeRepository } from './repositories';
import axios, { AxiosResponse } from 'axios';
import { TokenService } from '@loopback/authentication';
import { TokenServiceBindings } from '@loopback/authentication-jwt';
require('dotenv').config();

export {ApplicationConfig};

export class ExpressServer {
  public readonly app: express.Application;
  public readonly lbApp: App;
  public profileUser: User;
  @inject(TokenServiceBindings.TOKEN_SERVICE)
  public jwtService: TokenService
  public userService: UserService
  public token = ''
  public passportProvider: PassportProvider;
  private server?: http.Server;


  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new App(options);
    this.profileUser = new User();


    // configue express for auth social media
    passport.serializeUser((user:any, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((user:any, cb) => {
        cb(null, user);
    });

    this.app.use(express.json());
    this.app.use(session({
        secret: 'XSQ_=}|#~~|^]]@]})TRTYIGFY',
        resave: false,
        saveUninitialized: true,
    }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());


    // Serve static files in the public folder
    this.app.use(express.static('public'));
  }

  async boot() {
    await this.lbApp.boot();
    await this.lbApp.migrateSchema({ models: ['Compte', 'Employe', 'Client', 'SessionJeu', 'Repartition', 'Gains', 'Participer'] });
  }

  public async start() {
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port || 3000;
    const host = this.lbApp.restServer.config.host || '127.0.0.1';
    this.server = this.app.listen(port, host);
    await once(this.server, 'listening');
  }

  public async apiExpress() {

    // Custom Express routes  
    this.app.get('/express', function (_req: Request, res: Response) {
        res.sendFile(path.join(__dirname, '../public/express.html'));
        // res.json.
    });

    const profileUser = this.profileUser
    await this.setupPassportFacebook(passport,this.profileUser);
    await this.setupPassportGoogle(passport,this.profileUser);   
   
    this.app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email','user_location'] }));
    this.app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/' }),
      async (req, res) => {
        // Successful authentication, redirect home.
        await this.saveProfile(profileUser)
        // res.json(profileUser)
        res.redirect(process.env.URL_REDIRECT_AUTH_SOCIAL_MEDIA + '?token=' + this.token)
    });

    this.app.get('/auth/google',passport.authenticate('google', { scope: ['profile','email','openid'] }));
    this.app.get('/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/login' }),
      async (req, res) => {
        await this.saveProfile(profileUser)
        // res.json(profileUser)
        res.redirect(process.env.URL_REDIRECT_AUTH_SOCIAL_MEDIA + '?token=' + this.token)
    });   
    
    
    // // Expose the front-end assets via Express, not as LB4 route
    this.app.use('/', this.lbApp.requestHandler);
  }
  
  async setupPassportFacebook(passport:any,profileU:User): Promise<any> {

    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret:  process.env.FACEBOOK_CLIENT_SECRET || '',
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || '',
      profileFields: ['id', 'first_name','last_name','picture','gender','emails']
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log("profile: ",profile)
      console.log("accessToken: ",accessToken)
      console.log("refreshToken: ",refreshToken)
      console.log("cb: ",cb)
      profileU.securityId = profile._json.id
      profileU.prenom = profile._json.last_name
      profileU.nom = profile._json.first_name
      profileU.type_passport = "facebook"  
      profileU.email = profile._json.email  
    //   profileU.locale = profile._json.locale    
      cb(null, profile);            
    }
    ));   
  } 
  
  async setupPassportGoogle(passport:any,profileU:User): Promise<any> {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log("profile: ",profile)
      console.log("accessToken: ",accessToken)
      console.log("refreshToken: ",refreshToken)
      console.log("cb: ",cb)
      profileU.securityId = profile._json.sub
      profileU.nom = profile._json.family_name || ""
      profileU.prenom = profile._json.given_name || ""
      profileU.type_passport = "google"  
      profileU.email = profile._json.email || ""
      profileU.adresse = profile._json.locale
      cb(null, profile);
    }
    ));
  }  

  async saveProfile(profile:User) {
  
    
    const compte = {
        email: profile.email,
        pwd: '',
        id_passport: profile.securityId,
        type_passport: profile.type_passport
      };
      await axios.get( process.env.BASE_URL_FOR_AXIOS+'/compteWithEmail/'+ compte.email)
      .then(async(res:AxiosResponse<any, any>) => {
        const foundCompte = res.data
        // console.log('foundCompte',foundCompte)
        // si c'est la prmiere connexion
        if (!foundCompte) {
            await axios.post( process.env.BASE_URL_FOR_AXIOS+'/comptes/',compte)
            .then(async (res:AxiosResponse<any, any>) => {
                console.log(res.data);
                const client = {
                    email: profile.email,
                    nom: profile.nom,
                    prenom: profile.prenom,
                    id_compte: res.data.id,
                    adresse: profile.adresse || "",
                    tel: profile.tel || ''
                };
                await axios.post( process.env.BASE_URL_FOR_AXIOS+'/clients/',client)
                .then(async (res:AxiosResponse<any, any>) => {
                    this.token = await this.getToken(compte.email)
                    // res.redirect(process.env.URL_REDIRECT_AUTH_SOCIAL_MEDIA + '?token=' + token)
                    // console.log('token0',token)                  
                })
            .catch((error:any) => {
                console.error(error);
                });       
            })
            .catch((error:any) => {
                console.error(error);
            }); 
        }
        else{
            // si le reseau social choisi correspond à celui enrégistré à la première connexion
            if (foundCompte.type_passport === compte.type_passport) {                
                this.token = await this.getToken(compte.email)
                // res.redirect(process.env.URL_REDIRECT_AUTH_SOCIAL_MEDIA + '?token=' + token)
                console.log('token1',this.token)                     
            }
            else{
                const warning ="Connexion impossible car vous êtes enrégistré via "+ foundCompte.type_passport
                console.log('warning',warning)
            }           
        }
    })
    .catch((error:any) => {
        console.error(error);
    });

  }

  async getToken(email:string): Promise<string> {
    let token = ''
    console.log('email',email)
    const data = {
        email: email,
        pwd: "pwd"
    }
    await axios.post( process.env.BASE_URL_FOR_AXIOS+'/users/login', data)
    .then(async (res:AxiosResponse<any, any>) => {
        token =  res.data.token
    })
    .catch((error:any) => {
        console.error(error);
    });
    return token
  }

  // For testing purposes
  public async stop() {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    await once(this.server, 'close');
    this.server = undefined;
  }


}