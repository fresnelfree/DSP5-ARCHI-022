
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserEmploye } from 'src/app/core/models/employe/employe';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-dashboard-employe-new',
  templateUrl: './dashboard-employe-new.component.html',
  styleUrls: ['./dashboard-employe-new.component.css']
})
export class DashboardEmployeNewComponent {

   
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
 public user:any

 constructor(

   private authService : AuthenticationService,
   private router      : Router,
   private token       : TokenService,
   private fb                   : FormBuilder,
   private activatedRoute       : ActivatedRoute,
    private userService          : UserService,

 ){
            this.submitted = false;
            this.role = "Employe"
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
    get f() { return this.registerForm.value; }

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
    
    // let employe = new User(
    //   this.f.nom,
    //   this.f.prenom,
    //   this.f.email,
    //   this.f.tel,
    //   this.f.adresse,
    //   'Caissier'
    // )
    
      let userToAdd = {
        "nom"     : this.registerForm.value.nom, 
        "prenom"  : this.registerForm.value.prenom, 
        "tel"     : this.registerForm.value.tel, 
        "email"   : this.registerForm.value.email, 
        "adresse" : this.registerForm.value.adresse, 
        "pwd"     : this.registerForm.value.pwd,
        "role"    : 'Caissier'
      }
 
    this.userService.addUser(userToAdd).subscribe(
      (data:any) => {this.handleResponse(data)},
    ) 
}

handleResponse(data:any){

  this.token.handleToken(data.token);
 
  // this.authService.changeAuthStatus(true);

  console.log("Donnees : ", data);
  
}

onReset() {

  this.submitted = false;

  this.registerForm.reset();

}


}
