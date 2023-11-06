import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-client-profil-card',
  templateUrl: './client-profil-card.component.html',
  styleUrls: ['./client-profil-card.component.css']
})
export class ClientProfilCardComponent {
 @Input() public user: any;

  constructor(
    private userService : UserService,
    ){}

    ngOnInit(): void {
      // this.getUser();
      this.user = JSON.parse(localStorage.getItem('user') || "")
      // this.getUserByEmail()
  }

  getUserByEmail():  void{

    this.userService.getUserByEmail(this.getTokenEmail()).subscribe(
      (res) => { this.user = res }
    )
  }


  getTokenEmail() {
    return this.userService.getTokenEmail();  
  }

}
