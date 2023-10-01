import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';


@Component({
  selector: 'app-client-gain',
  templateUrl: './client-gain.component.html',
  styleUrls: ['./client-gain.component.css']
})
export class ClientGainComponent {
  
  public user: any;

  constructor(
    private router               : Router,
    private fb                   : FormBuilder ,
    private activatedRoute       : ActivatedRoute,
    private userService          : UserService,
    private token                : TokenService,
    private authService          : AuthenticationService){}

    ngOnInit(): void {
      // this.getUser();
      this.getUserByEmail()
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
