import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';
import { AproposComponent } from './apropos/apropos.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { JeuxComponent } from './jeux/jeux.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { authGuard } from '../core/guards/auth.guard';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { ClientGainComponent } from './client/client-gain/client-gain.component';
 


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'jeux', component: JeuxComponent},
  { path: 'forgot', component: ForgotPasswordComponent},
  { path: 'apropos', component: AproposComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path: 'client', children: [
                      { path: '', component: ClientHomeComponent },
                      { path: 'profil', component: ClientHomeComponent },
                      { path: 'gain', component: ClientGainComponent },
  ], canActivate: [authGuard]},//fin client

];//Fin routes

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
