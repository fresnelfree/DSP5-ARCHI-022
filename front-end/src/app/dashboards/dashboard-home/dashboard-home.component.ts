import { Component, HostListener } from '@angular/core';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent { 

  public open: boolean = false;
  public block: boolean = false;
  public openMenu: boolean = false;//Le boutton bare
  public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
  public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
  public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
  
  //   constructor(private toggleService: ToggleService){}

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

}
