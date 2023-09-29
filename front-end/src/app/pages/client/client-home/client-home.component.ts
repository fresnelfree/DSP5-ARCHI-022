import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  private submitted;
  private role: string;
  private user: any;

  constructor(
    private router               : Router,
    private fb                   : FormBuilder ,
    private activatedRoute       : ActivatedRoute,
    private userService          : UserService,
    private token                : TokenService){
    this.submitted = false;
    this.role = "Client"
  }

  
   /********************************************************************
   *
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   *
   ********************************************************************/
   error_messages   = {
    'nom' : [
      {type:'required', message:'Le nom est obligqtoire.'},
      {type:'minlength', message:'Nom trop court'},
      {type:'maxlength', message:'Nom trop long'},
    ],

    'prenom' : [
      {type:'required', message:'Le prenom est obligqtoire.'},
      {type:'minlength', message:'Prenom trop court'},
      {type:'maxlength', message:'Prenom trop long'},
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
      {type: 'required', message:'Le mot de passe est obligqtoire.'},
      {type: 'minlength', message: 'Mot de passe trop court.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
      {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
    ],

    'confPwd' : [
      {type: 'required', message:'Veuillez confirmer le mot de passe.'},
      {type: 'minlength', message: 'Mot de passe trop court.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
      {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
      {type: 'passwordCompare', message: 'Mot de passe different.'}
    ],

  }


  clientForm: FormGroup = this.fb.group({

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
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])),

    adresse: new FormControl('', Validators.compose([
      Validators.required,
    ])),

    pwd: new FormControl('', Validators.compose([
      Validators.required,
      // Validators.minLength(4),
      // Validators.maxLength(200),
      // Validators.pattern(
      //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
      // ),
    ])),

    confPwd: new FormControl('', Validators.compose([
      Validators.required,
      // Validators.minLength(4),
      // Validators.maxLength(200),
      // Validators.pattern(
      //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
      // ),
    ])),

  })

    // Getter pour un accès facile aux champs du formulaire (clientForm)
    get f() { return this.clientForm.controls; }


    
  /********************************************************************
   *                  GESTION CLIENT
   *
   ********************************************************************/
  ngOnInit(): void {
      // this.getUser();
      this.getUserByEmail()
  }


    getUserById():  void{
      this.userService.getUserById(13).subscribe(
        (res) => console.log(res)
      )
  }

  getUserByEmail():  void{
    this.userService.getUserByEmail(this.getTokenEmail()).subscribe(
      (res) => console.log(res)
    )
  }


  getTokenEmail() {
    return this.userService.getTokenEmail();  
  }




    /********************************************************************
   *                  On submit Methode
   *
   ********************************************************************/
    onSubmit() {

      this.submitted = true;

        // Si on a des erreurs on stop
        if (this.clientForm.invalid) {
          return;
      }

      
        this.user = {
          "nom"     : this.clientForm.value.nom, 
          "prenom"  : this.clientForm.value.prenom, 
          "tel"     : this.clientForm.value.tel, 
          "email"   : this.clientForm.value.email, 
          "adresse" : this.clientForm.value.adresse, 
          "pwd"     : this.clientForm.value.pwd,
          "role"    : this.role
        }

      // this.authService.register(this.user).subscribe(
      //   (data:any) => {this.handleResponse(data)},
      // ) 
  }

  handleResponse(data:any){

    // this.token.handle(data.token);
  
    // this.authService.changeAuthStatus(true);

    this.router.navigate(['/connexion']).then(() => {
      window.location.reload();
    });
    
  }

}
