import { Component, HostListener } from '@angular/core';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';

@Component({
  selector: 'app-dashboard-client-all',
  templateUrl: './dashboard-client-all.component.html',
  styleUrls: ['./dashboard-client-all.component.css']
})
export class DashboardClientAllComponent {

//   public openMenu : boolean = false;
//   public openMenuMobile : boolean = false;
//   public openMenuTablette : boolean = false;



public open: boolean = false
public openMenu: boolean = false
  public openMenuSmall : boolean = false;
public ecran : number = window.innerWidth;
public smallDevise: boolean = false
public block: boolean = false
  
//   constructor(private toggleService: ToggleService){}

//  ngOnInit(): void {
     
//  }

isClicked = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.ecran = window.innerWidth;

    if(this.ecran < 1010){
      this.smallDevise = !this.smallDevise
    }
   
   }

   
//   onBars(e:MouseEvent){
//     e.preventDefault()
    
//     if(this.ecran > 0 && this.ecran <=576)
//     {
//       this.openMenuMobile = !this.openMenuMobile
//       this.openMenuSmall = false; 
//     } 
//     else if(this.ecran > 576 && this.ecran <778)
//     {
//       this.openMenuTablette = !this.openMenuTablette; 
//       this.openMenuSmall = false; 
//     }
//     else if(this.ecran > 778)
//     {
//         this.openMenuSmall = !this.openMenuSmall;     
//     }
    
//   }



 onMenu(e: MouseEvent){
   
        if(this.ecran>1010){
          this.open = !this.open
      } else if(this.ecran<1010){
          this.openMenu = !this.openMenu

          if(this.ecran <576){
            this.openMenuSmall = !this.openMenuSmall
          }
      }

      // this.isClicked = !this.isClicked;
 
 }

}
