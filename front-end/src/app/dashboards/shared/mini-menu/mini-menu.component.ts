import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-menu',
  templateUrl: './mini-menu.component.html',
  styleUrls: ['./mini-menu.component.css']
})
export class MiniMenuComponent {
  @Input() title:string="";
  @Input() titleList:string="";
  @Input() titleAdd:string="";
  @Input() linkAdd:string="";
  @Input() linkList:string="";

}
