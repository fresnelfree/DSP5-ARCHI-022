import { Component, OnInit } from '@angular/core';
import { any } from 'cypress/types/bluebird';
import { LoginService } from 'src/app/cores/services/login.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  public users: any = null;

 constructor(private _loginService: LoginService){
  // this.logins = any
 }

 //Dans ngonInit, on recuper les logins

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users = this._loginService.getUsers().subscribe(users => this.users = users)
  }

  // getUser()
}
