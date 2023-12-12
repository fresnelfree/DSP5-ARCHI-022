import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public isLogged: boolean = false;
  public isClient: boolean = false;

  constructor(
    private router       : Router,
    private tokenService : TokenService,
  ){}

  onRedirect(event: MouseEvent){
    event.preventDefault();
    if ( this.isLogged = true && this.tokenService.getItem('role3') === "Client"){
          this.isClient = true;
          this.router.navigate(['/client'])
      }
      else {
        this.router.navigate(['/connexion'])
      }

  }
}
