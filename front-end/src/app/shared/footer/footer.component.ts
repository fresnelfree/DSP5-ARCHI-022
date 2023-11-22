import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

goToLink(){
    window.open('/');
}
goToLinkM(){
  window.open('/mentions');
}
goToLinkC(){
  window.open('/utilisation');
}

}
