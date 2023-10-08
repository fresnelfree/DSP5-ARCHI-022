import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { TokenService } from 'src/app/core/services/token/token.service';

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
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent {
  private submitted;
  private role: string;
  private user: any;

  constructor(
    private router      : Router,
    private fb          : FormBuilder ,
    private route       : ActivatedRoute,
    private authService : AuthenticationService,
    private token       : TokenService){
    this.submitted = false;
    this.role = "Client"
  }

 
 ngOnInit() {

}


   /********************************************************************
   *
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   *
   ********************************************************************/
   error_messages   = {
    'nom' : [
      {type:'required', message:'Le nom est obligqtoire.'},

      {type: 'minlength', message: 'Nom trop court.' },
      {type: 'maxlength', message: 'Nom trop trop long.' },
    ],

    'prenom' : [
      {type:'required', message:'Le prenom est obligqtoire.'},
      {type: 'minlength', message: 'Preom trop court.' },
      {type: 'maxlength', message: 'Preom trop trop long.' },
    ],

    'tel' : [
      {type:'required', message:'Le numéro de téléphone est obligqtoire.'},
    ],

    'email' : [
      {type:'required', message:'L\'email est obligqtoire.'},
      {type: 'pattern', message: 'Format d\'email invalid.' },
    ],

    'adresse' : [
      {type:'required', message:'L\'adress est obligqtoire.'},
    ],

    'pwd' : [
      {type:'required', message:'Le mot de passe est obligqtoire.'},
      {type: 'minlength', message: 'Mot de passe trop court.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
      {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
    ],

    'confPwd' : [
      {type:'required', message:'Veuillez confirmer le mot de passe.'},
      {type: 'minlength', message: 'Mot de passe trop court.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
      {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
    ],

  }


  registerForm: FormGroup = this.fb.group({

    nom: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255),
    ])),

    prenom: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255),
    ])),

    tel: new FormControl('', Validators.compose([
      Validators.required,
    ])),

    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])),

    adresse: new FormControl('', Validators.compose([
      Validators.required,
    ])),

    pwd: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(200),
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
      ),
    ])),

    confPwd: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(200),
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
      ),
    ])),

  })

    // Getter pour un accès facile aux champs du formulaire (registerForm)
    get f() { return this.registerForm.controls; }

    passwordCompare(f: FormGroup){
      const  pwd   = f.get('pwd')?.value;
      const  confPwd = f.get('confPwd')?.value;
      return pwd === confPwd ? null : { passwordNotMatch: true}
    }


  /********************************************************************
   *                  GESTION LOGIN
   *
   ********************************************************************/

  

  onSubmit() {

      this.submitted = true;

        // Si on a des erreurs on stop
        if (this.registerForm.invalid) {
          return;
      }

      
        this.user = {
          "nom"     : this.registerForm.value.nom, 
          "prenom"  : this.registerForm.value.prenom, 
          "tel"     : this.registerForm.value.tel, 
          "email"   : this.registerForm.value.email, 
          "adresse" : this.registerForm.value.adresse, 
          "pwd"     : this.registerForm.value.pwd,
          "role"    : this.role
        }
       
    
      this.authService.register(this.user).subscribe(
        (data:any) => {this.handleResponse(data)},
      ) 
  }

  handleResponse(data:any){

    // this.token.handle(data.token);
   
    // this.authService.changeAuthStatus(true);

    // this.router.navigate(['/dashboard']).then(() => {
    //   window.location.reload();
    // });

    this.onReset()

    this.router.navigate(['/connexion']).then(() => {
      window.location.reload();
    });
    
  }

  onReset() {

    this.submitted = false;

    this.registerForm.reset();

  }
  
}
