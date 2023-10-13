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
  selector: 'app-dhb-profil',
  templateUrl: './dhb-profil.component.html',
  styleUrls: ['./dhb-profil.component.css']
})
export class DhbProfilComponent {

  public isLogged: boolean = false;//verification si le user est connecter
  private submitted;
  private role: string;
  public  user: any;
  public deletMessage: string = "";
 

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
  
 
  /********************************************************************
   *                  GESTION CLIENT
   *
   ********************************************************************/
  ngOnInit(): void {
    // this.getUser();
    this.getUserByEmail()
}


getUserByEmail():  void{

  this.userService.getUserByEmail(this.getTokenEmail()).subscribe(
    (res) => { 
          this.user = res
        }
  )
}


getTokenEmail() {
  return this.userService.getTokenEmail();  
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


employeForm: FormGroup = this.fb.group({

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

  // Getter pour un accès facile aux champs du formulaire (employeForm)
  get f() { return this.employeForm.value; }
  get u() { return this.user.employe}

  /********************************************************************
 *                  On submit Methode
 *
 ********************************************************************/

  onSubmit() {
    const id_compte = this.user.employe.id_compte;
    const id:number = this.user.employe.id;
   const role:string = this.user.employe.role;

    let userToUpdate = {
      "id_compte": id_compte,
      "nom"     : this.f.nom, 
      "prenom"  : this.f.prenom, 
      "tel"     : this.f.tel, 
      "email"   : this.f.email, 
      "adresse" : this.f.adresse, 
      "role"    : role
    }
    
    this.userService.updateUser(userToUpdate,id).subscribe(
      res => {
            //  this.handleResponse(res)
          }
    )

    window.location.reload();
    
}

handleResponse(data:any){

  this.token.handleToken(data.token);
  window.location.reload();
  
}

onDelete(){
   
   this.userService.deleteUser(8).subscribe(
    res => { 
      console.log(res);
      if(res === null) {
        this.deletMessage = "Employé supprimer avec succés"
      }  
    }
   )
}

 

}
