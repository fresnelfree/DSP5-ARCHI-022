import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  classToggled = false;

  
  public toggleField() {
    this.classToggled = !this.classToggled;  
  }

  modetogle(event: MouseEvent, className: string){
    event.preventDefault();
   
  }

}
