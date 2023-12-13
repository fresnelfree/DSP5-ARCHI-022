import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';
import { SnackbarService } from 'src/app/core/notification/snackbar.service';
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
  public message_compte: string = "";
  public message_pwd: string = "";

  constructor(
    private router      : Router,
    private fb          : FormBuilder ,
    private route       : ActivatedRoute,
    private authService : AuthenticationService,
    private titleInscription: Title,
    private snackbarService: SnackbarService,
    private meta: Meta,
    private token       : TokenService){

      this.titleInscription.setTitle("Inscription");
      this.meta.addTag({name:"Page d’inscription", content:"Inscription"});
      this.meta.addTag({name:'keywords', content:"créer un compte, nous rejoindre"});
    this.submitted = false;
    this.role = "Admin"
    // this.role = "Client"

  }
   /********************************************************************
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   ********************************************************************/
   error_messages   = {
    'nom' : [
      {type: 'required', message:'Le nom est obligatoire.'},
      {type: 'minlength', message: 'Nom trop court.' },
      {type: 'maxlength', message: 'Nom trop trop long.' },
    ],

    'prenom' : [
      {type: 'required', message:'Le prenom est obligatoire.'},
      {type: 'minlength', message: 'Preom trop court.' },
      {type: 'maxlength', message: 'Preom trop long.' },
    ],

    'tel' : [
      {type: 'required', message:'Le numéro de téléphone est obligatoire.'},
      {type: 'pattern', message: 'Le numéro doit commencer par 0 et au minimum 10 chiffres, sans caractères spéciaux.' },
      // {type: 'minlength', message: 'Numéro trop court.' },
      {type: 'maxlength', message: 'Numéro trop long.' },
    ],

    'email' : [
      {type:'required', message:'L\'email est obligatoire.'},
      {type: 'pattern', message: 'Format d\'email invalid.' },
    ],

    'adresse' : [
      {type:'required', message:'L\'adress est obligatoire.'},
      // {type: 'pattern', message: 'L\'adress doit commencer par un numéro.' },
    ],

    'pwd' : [
      {type:'required', message:'Le mot de passe est obligatoire.'},
      {type: 'minlength', message: 'Mot de passe trop court.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
      // {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
      {type: 'pattern',   message: `Le mot de passe doit contenir (
        - \n Au minimum 8 caractères
        - \n au moin 1 Majuscule
        - \n au moin 1 Minuscule
        - \n au moin 1 cataére speciale 
        - \n au moin 1 Chifre
                 ).` 
      },
    ],

    'confPwd' : [
      {type:'required', message:'Veuillez confirmer le mot de passe.'},
      {type: 'minlength', message: 'Mot de passe trop court.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
      // {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
      {type: 'pattern',   message: `Le mot de passe doit contenir (
                                    - \n Au minimum 8 caractères
                                    - \n au moin 1 Majuscule
                                    - \n au moin 1 Minuscule
                                    - \n au moin 1 cataére speciale 
                                    - \n au moin 1 Chifre
                                             ).` 
      },
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
      // Validators.minLength(10),
      Validators.maxLength(100),
      Validators.pattern("^0[1-9]([0-9]{8})$")
    ])),

    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])),

    adresse: new FormControl('', Validators.compose([
      Validators.required,
      // Validators.pattern("^[0-9]{1,5}(?:[ ,.-][a-zA-ZàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ0-9]+)+\s*$")
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
          "role"    : 'Client'
        }

        this.authService.getUserByEmail(this.registerForm.value.email).subscribe(
          (res) => { 
            if (res){
              this.message_compte = "Ce compte existe déjà"
              this.snackbarService.showNotification(
                "Ce compte existe déjà !",
                'ok',
                'warning'
              );
              return;
            }
            else {
              if (this.registerForm.value.pwd === this.registerForm.value.confPwd){
                      this.authService.register(this.user).subscribe(async (value:any) => {
                        let redirect = 0
                        setTimeout(() => {
                          this.snackbarService.showNotification(
                            "Votre compte a été crée avec succès, un mail de vérification vous a été envoyé !",
                            'ok',
                            'success'
                          );
                            redirect = 9000
                        }, 1000);

                        setTimeout(() => {
                          if (redirect === 9000) {
                            this.handleResponse(value);
                           }
                        }, 5000);
                      });
              }
              else {
                this.message_pwd = "Les mots de passe sont différents."
                this.snackbarService.showNotification(
                  "Les mots de passe sont différents !",
                  'ok',
                  'error'
                );
              }
            };
           }
        )
  }

  handleResponse(data:any){
    this.router.navigate(['/connexion']).then(() => {
      // window.location.reload();
    });
  //   // this.onReset()
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    const passwordFieldType = passwordInput.type;

    if (passwordFieldType === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  ttogglePasswordVisibility(ConpasswordInput: HTMLInputElement) {
    const passwordFieldType = ConpasswordInput.type;

    if (passwordFieldType === 'password') {
      ConpasswordInput.type = 'text';
    } else {
      ConpasswordInput.type = 'password';
    }
  }

}
