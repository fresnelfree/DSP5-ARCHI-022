import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/cores/services/authentication-service.service';


//Hedaer Option
const httpOption = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',

  })
};

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  public usersData: any = null;
  public userLogin: any;
  private submitted;
  

  constructor(
      private router: Router,
      private fb: FormBuilder ,
      private route: ActivatedRoute,
      private _authService: AuthenticationService,
      private http: HttpClient,
    ){
      this.submitted = false;
    }


  /********************************************************************
   *
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   *
   ********************************************************************/
   error_messages   = {
    'email' : [
      {type:'required', message:'L\'email est obligqtoire.'},
      {type: 'pattern', message: 'Format d\'email invalid.' },
    ],
    'pwd' : [
      {type:'required', message:'Le mot de passe est obligqtoire.'},
       {type: 'minlength', message: 'Mot de passe trop court.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
      // {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
    ],

  }

  loginForm: FormGroup = this.fb.group({

    email: new FormControl('', Validators.compose([
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
    get f() { return this.loginForm.value; }

  /********************************************************************
   *                  GESTION LOGIN
   *
   ********************************************************************/


  onSubmit() {
      this.submitted = true;

        // Si on a des erreurs on stop
        if (this.loginForm.invalid) {
          return;
      }

    this.http.post('thetiptop.recette.api.com/users/login', this.loginForm.getRawValue(), httpOption).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err);
      }

    )

  }


  // ngOnInit(): void {
  //   // this.getUsers();
  //   this.getUser();
  // }






  // getUsers(): void {
  //   this.usersData = this._loginService.getUsers().subscribe(users => this.usersData = users)
  // }

  // getUser(): void{
  //     this._loginService.getUser(1).subscribe(res => {
  //     this.userLogin = res;
  //     console.log(this.userLogin);

  //   })
  // }


}
