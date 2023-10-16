import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-dashboard-statistic',
  templateUrl: './dashboard-statistic.component.html',
  styleUrls: ['./dashboard-statistic.component.css']
})
export class DashboardStatisticComponent implements OnInit{
   
  currentItem = 'Television';
  
  //Variable pour gestion navbar
  public open: boolean = false;
  public block: boolean = false;
  public openMenu: boolean = false;//Le boutton bare
  public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
  public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
  public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
  windowSize: { width: number; height: number } = { width: 0, height: 0 };;
  //Autres var
  public isLogged: boolean = false;//verification si le user est connecter

  constructor(

    private authService : AuthenticationService,
    private router      : Router,
    private token       : TokenService,
    private toggleService : ToggleService

  ){}

  ngOnInit(): void {

     this.authService.authStatus.subscribe(value => this.isLogged = value)

     this.toggleService.getWindowSizeObservable().subscribe(size => {
      this.windowSize = size;
      // Gérez ici les changements de taille de la fenêtre.
      console.log('La fenêtre a été redimensionnée : ', size.width, 'x', size.height);
    });
     
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
     
    this.toggleService.getWindowSizeObservable().subscribe(size => {
      this.windowSize = size;
      // Gérez ici les changements de taille de la fenêtre.
      console.log('La fenêtre a été redimensionnée : ', size.width, 'x', size.height);
    });
    
    console.log("onMenu");
    
  }



  logout(event: MouseEvent)
  {
    event.preventDefault();
     
    this.authService.changeAuthStatus(false);

    this.token.removeToken();

    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}
