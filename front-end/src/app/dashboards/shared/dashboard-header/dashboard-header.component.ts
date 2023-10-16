import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent { 
  
  @Input() item = "";

  @Output() open: boolean = false;
  // @Output() open = new EventEmitter<boolean>() ;

  onMenu(e: MouseEvent) {
 
    this.open = !this.open;
      // console.log(this.open.emit(true));
      
    
  }

  logout(event: MouseEvent)
  {
     
  }

}
