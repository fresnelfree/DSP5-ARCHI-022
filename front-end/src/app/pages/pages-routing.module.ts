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
import { ModifyPwdComponent } from './modify-pwd/modify-pwd.component';
import { ClientGainComponent } from './client/client-gain/client-gain.component';
import { AuthSocialMediaComponent } from './auth-social-media/auth-social-media.component';
import { MentionsComponent } from './mentions/mentions.component';
import { CgvComponent } from './cgv/cgv.component';
import { CguComponent } from './cgu/cgu.component';
 

const routes: Routes = [
  // { path: '', component: HomeComponent },
  {path:'', redirectTo:'home', pathMatch:'full',  
      data: {
        // ogTitle: 'Description of First Component for social media',
        canonical:'/first'
      }
  },
  { path: 'home', component: HomeComponent },
  { path: 'jeux', component: JeuxComponent},
  { path: 'forgot', component: ForgotPasswordComponent},
  { path: 'modify', component: ModifyPwdComponent},
  { path: 'apropos', component: AproposComponent},
  { path: 'mentions', component: MentionsComponent},
  { path: 'ventes', component: CgvComponent},
  { path: 'utilisation', component: CguComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'inscription', component: InscriptionComponent},

  { path: 'social-media/:token', component: AuthSocialMediaComponent},  
  { path: 'connexion', 
            children: [
                       { path:'', component: ConnexionComponent},
                      ]
  },
//   { path: 'client', component: ClientHomeComponent,         
//   canActivate: [authGuard], data: {role3: 'Client'}  
// },
  { path: 'client', 
             children: [
                         { path: '', component: ClientGainComponent,  
                           canActivate: [authGuard], data: {role3: 'Client'}
                          },
                         { path: 'profil', component: ClientHomeComponent },
                         { path: 'gain', component: ClientGainComponent },
                        ], 
              
  },//fin client

  { path: 'connexion', children: [
                        { path:'', component: ConnexionComponent},
  ]},
  { path: 'client', children: [
                                  { path: '', component: ClientHomeComponent },
                                  { path: 'profil', component: ClientHomeComponent },
                                  { path: 'gain', component: ClientGainComponent },
                              ], 
                              canActivate: [authGuard],
                              data: {
                                role: 'Client'
                              }
},//fin client

];//Fin routes

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
