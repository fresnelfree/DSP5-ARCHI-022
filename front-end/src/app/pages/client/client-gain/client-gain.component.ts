import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isNull } from 'cypress/types/lodash';
import { Gain } from 'src/app/core/models/gain/gain';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { GainService } from 'src/app/core/services/gain/gain.service';
import { TokenService } from 'src/app/core/services/token/token.service';
 


@Component({
  selector: 'app-client-gain',
  templateUrl: './client-gain.component.html',
  styleUrls: ['./client-gain.component.css']
})
export class ClientGainComponent implements OnInit {
  
  public user: any;
  public gain: Gain;
  public message: string;

  constructor(
    private router               : Router,
    private fb                   : FormBuilder ,
    private activatedRoute       : ActivatedRoute,
    private gainService          : GainService,
    private token                : TokenService,
    private authService          : AuthenticationService){
      this.message = "";
      this.gain = new Gain()
    }

 
  

  getGain(){

    return this.gainService.getUserByEmail(this.getTokenEmail()).subscribe(
      (res) => { 
        this.user = res //on stock le resultat dans la var user, afin de recuperer l'id

        this.gainService.getGain(this.user.client.id).subscribe(
          (res) => {
            this.gain = res   
          }
        )
        
      }
    )
  }

  getTokenEmail() {
    return this.gainService.getTokenEmail();  
  }


  handleGain(){
    if(this.gain.id === 0){
    return  this.message = "Vous n'avez pas de ticket pour le moment."
    }else return false
  }
 
    ngOnInit(): void {
      this.getGain()
      this.handleGain()
  }
}
