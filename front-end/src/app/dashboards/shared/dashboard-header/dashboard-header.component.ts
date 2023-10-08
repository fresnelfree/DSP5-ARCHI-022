import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent {
  public toggle : boolean = false;
  public openMenu : boolean = false;
  public openSmallMenu : boolean = false;
  public windowWidth : number = window.innerWidth;
  public windowHeight : number = window.innerHeight;
  public isMobile   : boolean = false;  
  public isTablette : boolean = false;  
  public hidebar     : boolean = false;
  



  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.checkWindowSize(); // Appelez la fonction pour vérifier la taille lors des changements de taille de la fenêtre
  }

  // Fonction pour vérifier la taille et ajouter/retirer la classe
  checkWindowSize(): void {
    if (this.windowWidth <= 576) {
      this.isMobile = true;
      // Ajoutez une classe au composant lorsque la taille est inférieure à 992 pixels
   
    }else if(this.windowWidth >= 768) {
       this.isTablette = true
	} else {
      this.isMobile = false;
	  this.isTablette = false;
      // Retirez la classe lorsque la taille est supérieure ou égale à 992 pixels
  
    }
  }


  onBars(e:MouseEvent){
    e.preventDefault()
    // this.toggle = !this.toggle;   
	// this.close = !this.close;   
	
	if(this.windowWidth >= 768){
		this.openSmallMenu = !this.openSmallMenu
		this.openMenu = false

	}if(this.windowWidth > 0 && this.windowWidth < 768){
		this.openMenu = !this.openMenu
		this.hidebar = !this.hidebar
		this.openSmallMenu = false
	}
	 
  }

}
