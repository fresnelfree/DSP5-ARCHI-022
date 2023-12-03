import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { TokenService } from 'src/app/core/services/token/token.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  public isLogged: boolean = false;

  constructor(
    private router       : Router,
    private roleService: RoleService,
    private tokenService : TokenService,
    private authService  : AuthenticationService,

  ){}

  ngOnInit(): void {

     this.authService.authStatus.subscribe(value => this.isLogged = value)
     
  }

  logout(event: MouseEvent)
    {
        event.preventDefault();
        this.authService.logout()
    }

}
