import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToggleService {
      //Variable pour gestion navbar
   public open: boolean = false;
   public block: boolean = false;
   public openMenu: boolean = false;//Le boutton bare
   public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
   public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
   public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
   private windowSizeSubject = new Subject<{ width: number; height: number }>();

   @HostListener('window:resize', ['$event'])
   onResize(event: Event): void {
     this.ecran = window.innerWidth;

     const width = window.innerWidth;
    const height = window.innerHeight;
    this.windowSizeSubject.next({ width, height });
 
    //  if (this.ecran < 1010) {
    //    this.smallDevise = !this.smallDevise;
       
    //  }
   }

   getWindowSizeObservable(){
    return this.windowSizeSubject.asObservable();
   }

   menuToggle(){
     return this.ecran
   }

}
