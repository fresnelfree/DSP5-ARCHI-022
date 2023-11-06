import { Component } from '@angular/core';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent {

  //Variable pour gestion navbar
  public open: boolean = false;
  public block: boolean = false;
  public openMenu: boolean = false;//Le boutton bare
  public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
  public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
  public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
  public windowSize: { width: number; height: number } = { width: 0, height: 0 };
  
  //Autres var
  public isLogged: boolean = false;//verification si le user est connecter

  constructor(

    private toggleService : ToggleService

  ){}

  ngOnInit(): void {

  
     
  }


  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event): void {
  //   this.ecran = window.innerWidth;

  //   if (this.ecran < 1010) {
  //     this.smallDevise = !this.smallDevise;
  //   }
  // }

  onMenu(e: MouseEvent) {
    // if (this.ecran > 1010) {
    //   this.open = !this.open;
    // } else if (this.ecran < 1010) {
    //   this.openMenu = !this.openMenu;

    //   if (this.ecran < 576) {
    //     this.openMenuSmall = !this.openMenuSmall;
    //   }
    // }
     
    // this.toggleService.getWindowSizeObservable().subscribe(size => {
    //   this.windowSize = size;
    //   // Gérez ici les changements de taille de la fenêtre.
    //   console.log('La fenêtre a été redimensionnée : ', size.width, 'x', size.height);
    // });

    console.log("hello");
    
    
  }


}
