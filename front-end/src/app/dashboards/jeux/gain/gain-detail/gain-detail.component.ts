import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { event } from 'cypress/types/jquery';
import { forEach, toInteger } from 'cypress/types/lodash';
import { Gain } from 'src/app/core/models/gain/gain';
import { Repartition } from 'src/app/core/services/repartition/repartition';
import { RepartitionService } from 'src/app/core/services/repartition/repartition.service';
import { Session } from 'src/app/core/services/session/session';
import { SessionService } from 'src/app/core/services/session/session.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { GainService } from 'src/app/core/services/gain/gain.service';

@Component({
  selector: 'app-gain-detail',
  templateUrl: './gain-detail.component.html',
  styleUrls: ['./gain-detail.component.css']
})
export class GainDetailComponent {
//Mini-menu
public titleMenu:string="Détail du gain"
public titleList:string="Liste gain"
public linkList = "/dashboard/gain/all"
public titleAdd:string="Nom_session"
 
 //Variable pour gestion navbar
 public open: boolean = false;
 public block: boolean = false;
 public openMenu: boolean = false;//Le boutton bare
 public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
 public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
 public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
 //Autres var
 public isLogged: boolean = false;//verification si le user est connecter
 public gain: any;
 public user: any;
 public message: string;

 constructor(
   private authService   : AuthenticationService,
   private router        : Router,
   private token         : TokenService,
   private clientService : ClientService,
   public gainService    : GainService,
   public activatedRoute : ActivatedRoute
 ){
  this.message = "";
 }

 ngOnInit(): void {

    this.authService.authStatus.subscribe(value => this.isLogged = value)
    this.getGainById()
    this.getClientById()
 }

 getGainById(){
    const id = this.activatedRoute.snapshot.params['id'];
    return  this.gainService.getGain(id).subscribe(
    (res:any) => {
      this.gain = res
      console.log(res)
    }
   )
 }

 getClientById(){
  return this.clientService.getClientById(1).subscribe(
    (res:any) => {
      this.user = res
      console.log(this.gain);
      console.log("Res client", res);
    }
  )
 }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.ecran = window.innerWidth;
    if (this.ecran < 1010) {
      this.smallDevise = !this.smallDevise;
    }
  }

  onMenu(e: MouseEvent) {
    if (this.ecran > 1010) {
      this.open = !this.open;
    } else if (this.ecran < 1010) {
      this.openMenu = !this.openMenu;
      if (this.ecran < 576) {
        this.openMenuSmall = !this.openMenuSmall;
      }
    }
  }

  logout(event: MouseEvent)
  {
      event.preventDefault();
      this.authService.logout()
  } 

}
