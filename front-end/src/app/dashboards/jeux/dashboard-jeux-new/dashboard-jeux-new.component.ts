
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jeux } from 'src/app/core/models/jeux/jeux';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { JeuxService } from 'src/app/core/services/jeux/jeux.service';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';


@Component({
  selector: 'app-dashboard-jeux-new',
  templateUrl: './dashboard-jeux-new.component.html',
  styleUrls: ['./dashboard-jeux-new.component.css']
})
export class DashboardJeuxNewComponent implements OnInit { 
  
  
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
 public sessions: Jeux[] = []

 constructor(

   private authService : AuthenticationService,
   private router      : Router,
   private token       : TokenService,
   private fb                   : FormBuilder,
   private activatedRoute       : ActivatedRoute,
   private userService          : UserService,
   private jeuxService: JeuxService

 ){
            this.submitted = false;
            this.role = "Client"
 }

 ngOnInit(): void {
  // this.getUser();
  this.getUserByEmail()
  this.getSession()
}

 
  /********************************************************************
   *                  GESTION SESSION JEUX
   *
   ********************************************************************/
   getSession(){
     this.jeuxService.getSessions().subscribe(
      res => {
        this.sessions = res
        console.log(res)
      }
     )
   }

 
  /********************************************************************
   *                  GESTION CLIENT
   *
   ********************************************************************/


getUserByEmail():  void{

  this.userService.getUserByEmail(this.getTokenEmail()).subscribe(
    (res) => { this.user = res }
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
  'debut' : [
    {type:'required', message:'Veuillez choisir une date de debut.'},
  ],

  'fin' : [
    {type:'required', message:'Veuillez choisir une date de fin.'},
  ],

  'nombre' : [
    {type:'required', message:'Veuillez saisir une quantité valide.'},
  ],

 

}


jeuxForm: FormGroup = this.fb.group({

  debut: new FormControl('', Validators.compose([
    Validators.required,
  ])),

  fin: new FormControl('', Validators.compose([
    Validators.required,
  ])),

  nombre: new FormControl('', Validators.compose([
    Validators.required,
  ])),

})

  // Getter pour un accès facile aux champs du formulaire (jeuxForm)
  get f() { return this.jeuxForm.value; }


  /********************************************************************
 *                  On submit Methode
 *
 ********************************************************************/

  onSubmit() {
      const id_employe = this.user.id
     this.submitted = true;

      // Si on a des erreurs on stop
      if (this.jeuxForm.invalid) {
        return;
    }

    
    let sessionToAdd = {
      // "id_employe": id_employe,
      // "debut"     : this.f.debut, 
      // "fin"  : this.f.fin, 
      // "nombre"     : this.f.nombre, 
      // "statut"    : 'attente'

        "id_employe": 12,
        "date_debut": "2023-10-14T10:41:00.763Z",
        "date_fin": "2023-10-14T10:41:00.763Z",
        "nbr_ticket": 2,
        "statut": "string"
    }

    this.jeuxService.addSession(sessionToAdd).subscribe(
      res => console.log(res)
      
    )
    

}

 

 
  /********************************************************************
   *                  GESTION MENU
   *
   ********************************************************************/ 


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


}



