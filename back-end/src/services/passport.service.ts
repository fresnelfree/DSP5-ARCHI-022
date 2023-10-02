import {injectable, /* inject, */ BindingScope, Provider, bind, inject} from '@loopback/core';
require('dotenv').config();
/*
 * Fix the service type. Possible options can be:
 * - import {Passport} from 'your-module';
 * - export type Passport = string;
 * - export interface Passport {}
 */

const nodemailer = require('nodemailer');
// const hbs = require("nodemailer-express-handlebars");
const handlebars = require('handlebars');
const fs = require('fs');
import { UserService } from './user.service';
import { ClientRepository, CompteRepository, EmployeRepository } from '../repositories';
import path from 'path';
import { User } from '../models';
import { TokenService } from '@loopback/authentication';
import { TokenServiceBindings } from '@loopback/authentication-jwt';


@bind({scope: BindingScope.TRANSIENT})
export class PassportProvider {
// Configuration du transporteur de messagerie
public transporter

  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,    
  ){
    // Configuration du transporteur de messagerie
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail', // Ex: 'Gmail', 'Yahoo', 'Outlook', etc.
      auth: {
        user: 'fteboukeu@gmail.com', // Adresse email de l'expéditeur
        pass: 'ulkzuggqkptbidzk' // Mot de passe de l'expéditeur
      }
    }); 
  }

  async sendLinkVerifyEmail(user: User): Promise<any> {
   
    const token = await this.jwtService.generateToken(user);
    // Données pour remplir le modèle
    const data = {
      subject: 'Vérification de votre adresse email',
      message: 'Contenu du message',
      user: user,
      lien: process.env.BASE_URL+'/verifyEmail/'+ token
    };
    const path_template = '../../public/templates/verify-email.hbs' 

    // Envoyer l'e-mail
    this.sendEmail(data,path_template)
  }

  async resetPassword(user: User): Promise<any> {
    const token = await this.jwtService.generateToken(user);
    // Données pour remplir le modèle
    const data = {
      subject: 'Modification de votre mot de passe',
      message: 'Contenu du message',
      user: user,
      lien: process.env.BASE_URL_FRONT+'/reset_password/'+ token
    };
    const path_template = '../../public/templates/reset-password.hbs' 

    // Envoyer l'e-mail
    this.sendEmail(data,path_template)

  }

  async sendEmail(data:any,path_template:string): Promise<any> {
    // Lecture du modèle Handlebars depuis le fichier
    const templateSource = fs.readFileSync(path.join(__dirname, path_template), 'utf8');
    const template = handlebars.compile(templateSource);

    // Génération du contenu de l'e-mail à partir du modèle et des données
    const html = template(data);
    // Définir les options de l'e-mail
    const mailOptions = {
      from: 'fteboukeu@gmail.com',
      to: data.user.email,
      subject: data.subject,
      html: html
    };
    // Envoyer l'e-mail
    this.transporter.sendMail(mailOptions, (error:any, info:any) => {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      } else {
        console.log('E-mail envoyé avec succès :', info.response);
      }
    });     
  }  
  
}
