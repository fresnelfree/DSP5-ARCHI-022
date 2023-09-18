import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/cores/services/auth/authentication.service';



@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  private _submitted;

  constructor(
      private _router: Router,
      private _fb: FormBuilder ,
      private _route: ActivatedRoute,
      private _authService: AuthenticationService,
      private _http: HttpClient,
    ){
      this._submitted = false;
    }


  /********************************************************************
   *
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   *
   ********************************************************************/
   error_messages   = {
    'mail' : [
      {type:'required', message:'L\'mail est obligqtoire.'},
      {type: 'pattern', message: 'Format d\'mail invalid.' },
    ],
    'pwd' : [
      {type:'required', message:'Le mot de passe est obligqtoire.'},
       {type: 'minlength', message: 'Mot de passe trop court.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
      // {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
    ],

  }

  _loginForm: FormGroup = this._fb.group({

    mail: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])),

    pwd: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(200),
      // Validators.pattern(
      //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
      // ),
    ])),

  })

    // Getter pour un accès facile aux champs du formulaire (loginForm)
    get f() { return this._loginForm.value; }

  /********************************************************************
   *                  GESTION LOGIN
   *
   ********************************************************************/

  user = {
    "mail": "messi@gmail.com",
    "pwd": "azerty"
  }

  onSubmit() {
        this._submitted = true;

        // Si on a des erreurs on stop
        if (this._loginForm.invalid) {
          return;
      }

      this._authService.login(this.user).subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)

        // (err:any)
      )


  }

}
