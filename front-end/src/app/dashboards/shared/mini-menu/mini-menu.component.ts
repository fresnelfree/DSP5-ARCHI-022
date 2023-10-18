import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-menu',
  templateUrl: './mini-menu.component.html',
  styleUrls: ['./mini-menu.component.css']
})
export class MiniMenuComponent {
  @Input() title:string="";
  @Input() titleLink1:string="";
  @Input() titleLink2:string="";
  @Input() link1:string="";
  @Input() link2:string="";

}
