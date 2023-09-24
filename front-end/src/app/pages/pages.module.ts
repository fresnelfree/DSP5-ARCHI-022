import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';
import { AproposComponent } from './apropos/apropos.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { JeuxComponent } from './jeux/jeux.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';
 


@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    ContactComponent,
    InscriptionComponent,
    ConnexionComponent,
    AproposComponent,
    ForgotPasswordComponent,
    JeuxComponent,
    NavbarComponent,
    ClientHomeComponent

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class PagesModule { }
