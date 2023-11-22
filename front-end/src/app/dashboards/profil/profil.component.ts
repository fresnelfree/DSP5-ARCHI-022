import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EmployeService } from 'src/app/core/services/employe/employe.service';
 

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  
 //Mini-menu
 titleMenu:string="Informations du client"
 titleList:string="Liste clients"
 linkList = "/dashboard/client/all"
 titleAdd:string="Ajout client"
 linkAdd = "/dashboard/client/new"

 isLoading = false;

 onLoading(): void {
   this.isLoading = true;
   setTimeout( () => this.isLoading = false, 2000 );
 }
 
//Variable pour gestion navbar
public open: boolean = false;
public block: boolean = false;
public openMenu: boolean = false;//Le boutton bare
public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
public isLogged: boolean = false;//verification si le user est connecter
private submitted;
public user: any; 
public client: any;
public deletMessage: string = "";
private id: number = this.activatedRoute.snapshot.params['id'];
public currentUser:any;

constructor(

 private authService : AuthenticationService,
 private router      : Router,
 private tokenService       : TokenService,
 private fb                   : FormBuilder,
 private activatedRoute       : ActivatedRoute,
 private userService          : UserService,
 private employeService : EmployeService,
 private dialog: MatDialog,

){
           this.submitted = false;
}

// DIALOG
// showDialog(time:number) {
//  const dialogRef = this.dialog.open(DialogSpinerComponent);
//  setTimeout( () => dialogRef.close(),  time);

//  dialogRef.afterClosed().subscribe(result => {
//    console.log('The dialog was closed');
//    // this.animal = result;
//  });
//  // this.snackbarService.showNotification('Ceci est un message de Snackbar.','ok','success');
// }

// 

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
       this.authService.logout()
   }

 /********************************************************************
  *                  GESTION CLIENT
  ********************************************************************/
 ngOnInit(): void {
  //  this.showDialog(500)
  this.getCurrentUser()
}

   // Gestion du user actuell
   getCurrentUser(){
    this.currentUser = this.authService.userValue()
    console.log(this.currentUser );
 }

/********************************************************************
*                  GESTION DU FORMULAIRE, REACTIVEFORM
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

 // Getter pour un accès facile aux champs du formulaire (clientForm)
 // get f() { return this.clientForm.controls; }
 get f() { return this.employeForm.value; }
 get u() { return this.user.client}

 /********************************************************************
*                  On submit Methode
********************************************************************/
 onSubmit() {
   const id_compte:number = this.currentUser.employe.id_compte;
   const id:number = this.currentUser.employe.id;

   let currentUserToUpdate = {
    "id_compte": id_compte,
     "nom"     : this.f.nom, 
     "prenom"  : this.f.prenom, 
     "tel"     : this.f.tel, 
     "email"   : this.f.email, 
     "adresse" : this.f.adresse, 
     "role": this.currentUser.employe.role
   }
  
    this.employeService.updateUser(currentUserToUpdate, id).subscribe(
     res=>{
            //  this.showDialog(2000)
           
            // window.location.reload();
          }
   )
}

 
 
 
}
