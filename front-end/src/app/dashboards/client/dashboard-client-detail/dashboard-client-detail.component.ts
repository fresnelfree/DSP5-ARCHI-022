import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
 
  


@Component({
  selector: 'app-dashboard-client-detail',
  templateUrl: './dashboard-client-detail.component.html',
  styleUrls: ['./dashboard-client-detail.component.css']
})
export class DashboardClientDetailComponent  implements OnInit {

  titleMenu:string="Informations du client"
  titleList:string="Liste clients"
  linkList = "/dashboard/client/all"
  titleAdd:string="Ajout client"
  linkAdd = "/dashboard/client/new"
  
 //Variable pour gestion navbar
 public open: boolean = false;
 public block: boolean = false;
 public openMenu: boolean = false;//Le boutton bare
 public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
 public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
 public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
 //Autres var
 public isLogged: boolean = false;//verification si le user est connecter
 private submitted;
 private role: string;
 public user: any;

 constructor(

   private authService : AuthenticationService,
   private router      : Router,
   private token       : TokenService,
   private fb                   : FormBuilder,
   private activatedRoute       : ActivatedRoute,
    private userService          : UserService,

 ){
            this.submitted = false;
            this.role = "Client"
 }



 @HostListener('window:resize', ['$event'])
 onResize(event: Event): void {
   this.ecran = window.innerWidth;

   if (this.ecran < 1010) {
     this.smallDevise = !this.smallDevise;
   }
 }

 onMenu(e: MouseEvent) {
   if (this.ecran > 1010) {
     this.open = !this.open;
   } else if (this.ecran < 1010) {
     this.openMenu = !this.openMenu;

     if (this.ecran < 576) {
       this.openMenuSmall = !this.openMenuSmall;
     }
   }
 }

 logout(event: MouseEvent)
 {
   event.preventDefault();
    
   this.authService.changeAuthStatus(false);

   this.token.removeToken();

   this.router.navigate(['/']).then(() => {
     window.location.reload();
   });
 }



 
  /********************************************************************
   *                  GESTION CLIENT
   *
   ********************************************************************/
  ngOnInit(): void {
  
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
    // {type: 'required', message:'Le mot de passe est obligqtoire.'},
    {type: 'minlength', message: 'Mot de passe trop court.' },
    {type: 'maxlength', message: 'Mot de passe trop trop long.' },
    {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
  ],

  'confPwd' : [
    // {type: 'required', message:'Veuillez confirmer le mot de passe.'},
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
    // Validators.required,
    // Validators.minLength(4),
    // Validators.maxLength(200),
    // Validators.pattern(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
    // ),
  ])),

  confPwd: new FormControl('', Validators.compose([
    // Validators.required,
    // Validators.minLength(4),
    // Validators.maxLength(200),
    // Validators.pattern(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
    // ),
  ])),

})

  // Getter pour un accès facile aux champs du formulaire (clientForm)
  get f() { return this.clientForm.controls; }
  get u() { return this.user.client}

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

    // let userToUpdate =  new User(this.u.prenom, this.u.nom, this.u.email, this.u.tel, this.u.adresse)

    // this.userService.updateUser(userToUpdate).subscribe(
    //   res => console.log(res)
      
    // )

}


// ngOnInit(): void {

//   this.authService.authStatus.subscribe(value => this.isLogged = value)
  
// }

}
