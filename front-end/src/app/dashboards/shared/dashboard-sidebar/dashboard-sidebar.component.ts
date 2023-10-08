import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent {

  
  public toggle : boolean = false;
  public close : boolean = false;

  onBars(e:MouseEvent){
    e.preventDefault()
    this.toggle = !this.toggle;   
  }


}
