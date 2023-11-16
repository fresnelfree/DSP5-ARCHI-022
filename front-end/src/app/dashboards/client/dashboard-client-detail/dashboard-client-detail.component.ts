import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientService } from 'src/app/core/services/client/client.service';
import { Client } from 'src/app/core/models/client/client';
import { MatDialog } from '@angular/material/dialog';
import { DialogSpinerComponent } from '../../shared/dialog-spiner/dialog-spiner.component';

 
@Component({
  selector: 'app-dashboard-client-detail',
  templateUrl: './dashboard-client-detail.component.html',
  styleUrls: ['./dashboard-client-detail.component.css']
})
export class DashboardClientDetailComponent  implements OnInit {
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
 //Autres var
 public isLogged: boolean = false;//verification si le user est connecter
 private submitted;
 public user: any; 
 public client: any;
 public deletMessage: string = "";
 private id: number = this.activatedRoute.snapshot.params['id'];


 constructor(

  private authService : AuthenticationService,
  private router      : Router,
  private token       : TokenService,
  private fb                   : FormBuilder,
  private activatedRoute       : ActivatedRoute,
  private userService          : UserService,
  private clientService : ClientService,
  private dialog: MatDialog,

 ){
            this.submitted = false;
 }

// DIALOG
showDialog(time:number) {
  const dialogRef = this.dialog.open(DialogSpinerComponent);
  setTimeout( () => dialogRef.close(),  time);

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
  });
  // this.snackbarService.showNotification('Ceci est un message de Snackbar.','ok','success');
}

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
    this.getClient() 
    this.showDialog(500)
}


getClient(){
  this.clientService.getClientById(this.id).subscribe(
    res => {
      this.client = res
    }
    
  )
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
  // get f() { return this.clientForm.controls; }
  get f() { return this.clientForm.value; }
  get u() { return this.user.client}

  /********************************************************************
 *                  On submit Methode
 ********************************************************************/
  onSubmit() {
    const id_compte = this.client.id_compte;
    const id:number = this.client.id;

    let clientToUpdate = {
      "nom"     : this.f.nom, 
      "prenom"  : this.f.prenom, 
      "tel"     : this.f.tel, 
      "email"   : this.f.email, 
      "adresse" : this.f.adresse, 
    }
   
     this.clientService.updateClient(clientToUpdate, id)
     .subscribe(
      res=>{
              this.showDialog(2000)
           }
    )
}
 

onDelete(){
  this.clientService.deleteClient(this.client.id).subscribe(
   res => { 
     if(res === null) {
       this.deletMessage = "Employé supprimer avec succés"
       this.router.navigate(['/dashboard/client/all'])
     }  
   })
}

// ngOnInit(): void {
//   this.authService.authStatus.subscribe(value => this.isLogged = value)
// }

}
