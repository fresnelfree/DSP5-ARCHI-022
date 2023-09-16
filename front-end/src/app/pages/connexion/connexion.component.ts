import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,  FormArray  } from '@angular/forms';
import { any } from 'cypress/types/bluebird';
import { LoginService } from 'src/app/cores/services/login.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  public usersData: any = null;


 constructor(private fb: FormBuilder ,private _loginService: LoginService){}

  ngOnInit(): void {
    this.getUser();
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
    'password' : [
      {type:'required', message:'Le mot de passe est obligqtoire.'},
       {type: 'minlength', message: 'Mot de passe trop court.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
      {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
    ],

  }

  loginForm: FormGroup = this.fb.group({

    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])),

    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(200),
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
      ),
    ])),

  })

  /********************************************************************
   *                  GESTION LOGIN
   *
   ********************************************************************/
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
  }

  // getUsers(): void {
  //   this.users = this._loginService.getUsers().subscribe(users => this.usersData = users)
  // }

  getUser(): void{
      this._loginService.getUser("Asma").subscribe(res => {
      this.usersData = res;
      console.log(this.usersData);

    })
  }

}
