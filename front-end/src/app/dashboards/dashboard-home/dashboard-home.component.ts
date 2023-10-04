import { Component } from '@angular/core';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {

  public toggle : boolean = false;

  constructor(private toogle: ToggleService){}
 
  onBars(e:MouseEvent){
    e.preventDefault()
    this.toggle = !this.toggle;   
  }


}
