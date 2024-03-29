


import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';
import { TokenService } from 'src/app/core/services/token/token.service';


@Component({
  selector: 'app-dashboard-jeux-all',
  templateUrl: './dashboard-jeux-all.component.html',
  styleUrls: ['./dashboard-jeux-all.component.css']
})
 

export class DashboardJeuxAllComponent  implements OnInit{ 
  titleMenu:string="Jeux"
  titleList:string="Liste jeu"
  linkList = "/dashboard/jeux/all"
  titleAdd:string="Ajout session"
  linkAdd = "/dashboard/jeux/new"
 
 
  //Variable pour gestion navbar
  public open: boolean = false;
  public block: boolean = false;
  public openMenu: boolean = false;//Le boutton bare
  public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
  public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
  public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
  //Autres var
  public isLogged: boolean = false;//verification si le user est connecter



  constructor(

    private authService : AuthenticationService,
    private router      : Router,
    private token       : TokenService

  ){}

  ngOnInit(): void {

     this.authService.authStatus.subscribe(value => this.isLogged = value)
     
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
