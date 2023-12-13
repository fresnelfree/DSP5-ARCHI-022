import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { environment } from 'src/environments/environment.dev';
import { UserService } from 'src/app/core/services/user/user.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  private submitted;
  private user:any;
  private role:string = "";
  private erreurs:any;
  public message_err_http:string = ""
  public auth_facebook_link: string = `${environment.hostLine}/auth/facebook`
  public auth_google_link: string = `${environment.hostLine}/auth/google`

  constructor(
    private router      : Router,
    private fb          : FormBuilder ,
    private authService : AuthenticationService,
    private tokenService       : TokenService,
    private roleSErvice : RoleService,
    private userService : UserService,
    private titleConnexion: Title,
    private meta: Meta
    ){
    this.submitted = false; 
    this.titleConnexion.setTitle('Connexion');
    this.meta.addTag({name:'Page connexion', content:'Login'});
    this.meta.addTag({name:'keywords', content:'Connexion sécurisée'});
  }
  


  /********************************************************************
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   ********************************************************************/
  error_messages = {
    'email' : [
      // {type:'required', message:'L\'email est obligatoire.'},
      {type: 'pattern', message: 'Adresse email invalide.' },
    ],
    'pwd' : [
      {type:'required',   message:'Le mot de passe est obligatoire.'},
      {type: 'minlength', message: 'Mot de passe trop court.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
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

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])),

    pwd: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(255),
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
      ),
    ])),
  })

    // Getter pour un accès facile aux champs du formulaire (loginForm)
    get f() { return this.loginForm.value; }


    onSubmit() {
      this.submitted = true;
        // Si on a des erreurs on stop
        if (this.loginForm.invalid) {
          return;
      }
     
      this.authService.login(this.f).subscribe(
        (data:any) => {
          this.handleResponse(data)
        },
        (err:any) => {
          this.erreurs = err
          if(this.erreurs.status === 500)
          {
            this.message_err_http = "Un incident s'est produit lors de la connexion."
          }
          else if (this.erreurs.status === 401)
          {
            this.message_err_http = "Identifiant ou mot de passe incorrecte."
          }
        }
      )//fin subscribe
  }

  handleResponse(data:any){
    this.tokenService.setItem('token',data.token);
    this.authService.changeAuthStatus(true);
    this.redirection()
  }


  redirection( ){
         if(this.authService.isloggedIn())
         {
             this.userService.getUserByEmail(this.getTokenEmail()).subscribe(
               res => {
                        this.user = res
                        this.tokenService.setItem('user',JSON.stringify(this.user))
                        if(this.user.employe){
                          this.tokenService.setItem('role',this.user.employe.role)
                          this.router.navigate(['/dashboard']).then(() => {
                            // window.location.reload();
                          });
                        }//Fin if
                        else if(this.user.client){
                          this.tokenService.setItem('role3',"Client");
                          this.router.navigate(['/client']).then(() => {
                            // window.location.reload();
                          });
                       }//Fin else if
                     }
                  )//Fin subscribe
         }
  }
  getTokenEmail() {
    return this.userService.getTokenEmail();
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    const passwordFieldType = passwordInput.type;
    if (passwordFieldType === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

}
