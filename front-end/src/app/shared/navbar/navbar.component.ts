import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isLogged: boolean = false;

  constructor(

    private authService : AuthenticationService,
    private router      : Router,
    private token       : TokenService

  ){}

  ngOnInit(): void {

     this.authService.authStatus.subscribe(value => this.isLogged = value)
     
  }

  logout(event: MouseEvent)
  {
    event.preventDefault();
     
    this.authService.changeAuthStatus(false);

    this.token.removeToken();

    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}
