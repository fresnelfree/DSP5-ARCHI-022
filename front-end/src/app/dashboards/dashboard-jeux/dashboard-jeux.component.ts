import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-jeux',
  templateUrl: './dashboard-jeux.component.html',
  styleUrls: ['./dashboard-jeux.component.css']
})
export class DashboardJeuxComponent  implements OnInit {

  public openMenu : boolean = false;
  public openMenuMobile : boolean = false;
  public openMenuTablette : boolean = false;
  public openMenuSmall : boolean = false;
  public ecran : number = window.innerWidth;
  

 ngOnInit(): void {
     
 }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.ecran = window.innerWidth;

    if(this.ecran > 0 && this.ecran <=576){
      this.openMenuSmall = false; 
    }
    if(this.ecran > 0 && this.ecran <=576){
      this.openMenuSmall = false; 
    }
   }

 
  onBars(e:MouseEvent){
    e.preventDefault()
    
    if(this.ecran > 0 && this.ecran <=576)
    {
      this.openMenuMobile = !this.openMenuMobile
      this.openMenuSmall = false; 
    } 
    else if(this.ecran > 576 && this.ecran <778)
    {
      this.openMenuTablette = !this.openMenuTablette; 
      this.openMenuSmall = false; 
    }
    else if(this.ecran > 778)
    {
        this.openMenuSmall = !this.openMenuSmall;     
    }
    
  }



}
