import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  public toggle : boolean = false;
  public ecran : number = window.innerWidth;

  constructor() { }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event, menu:boolean): void {
    this.ecran = window.innerWidth;

    if(this.ecran > 0 && this.ecran <=576){
      menu = false; 
    }
    if(this.ecran > 0 && this.ecran <=576){
      menu = false; 
    }
   }
   
   onClick(menu1:boolean, m2:boolean, m3:boolean){
    if(this.ecran > 0 && this.ecran <=576)
    {
      menu1 = !menu1
    } 
    else if(this.ecran > 576 && this.ecran <778)
    {
      m2 = !m2;  
    }
    else if(this.ecran > 778)
    {
        m3 = !m3;     
        console.log("hhh");
        
    }
   }
}
