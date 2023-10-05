import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-jeux',
  templateUrl: './dashboard-jeux.component.html',
  styleUrls: ['./dashboard-jeux.component.css']
})
export class DashboardJeuxComponent {

  public toggle : boolean = false;
  public close : boolean = false;

  onBars(e:MouseEvent){
    e.preventDefault()
    this.toggle = !this.toggle;   

    // var windowWidth = window.innerWidth;  		 
		// if (windowWidth<1010) { 
		// 	$('body').removeClass('open'); 
		// 	if (windowWidth<760){ 
		// 		$('#left-panel').slideToggle(); 
		// 	} else {
		// 		$('#left-panel').toggleClass('open-menu');  
		// 	} 
		// } else {
		// 	$('body').toggleClass('open');
		// 	$('#left-panel').removeClass('open-menu');  
		// } 
			 
     
  }



}
