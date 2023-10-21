import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { GainService } from 'src/app/core/services/gain/gain.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-gain-detail',
  templateUrl: './gain-detail.component.html',
  styleUrls: ['./gain-detail.component.css']
})
export class GainDetailComponent implements OnInit {
  
  
  titleMenu:string="Gains"
  titleList:string="Liste gains"
  linkList = "/dashboard/gain/all"
  titleAdd:string="Ajout gain"
  linkAdd = "/dashboard/gain/new"
 
  //Variable pour gestion navbar
  public open: boolean = false;
  public block: boolean = false;
  public openMenu: boolean = false;//Le boutton bare
  public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
  public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
  public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution

  //Autres var
  public isLogged: boolean = false;
  public message: string ="";
  public gainDatas:any;

  constructor(
    private authService : AuthenticationService,
    private token       : TokenService,
    private router      : Router,
    private gainService: GainService
  

  ){}

  ngOnInit(): void {
     this.authService.authStatus.subscribe(value => this.isLogged = value),
     this.getGains()
  }

  /************************************************
 *        GAINS
 ************************************************/
  getGains(){
    return this.gainService.getGains().subscribe(
      res => {
        this.gainDatas = res 
        this.handleGain();
        
      }
    )
  }

  handleGain(){
    if(this.gainDatas.length === 0){
    return  this.message = "Aucun gain pour le moment."
    }else return false
  }

  /************************************************
 *        MENU
 ************************************************/
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
