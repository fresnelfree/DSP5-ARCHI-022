import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';
 
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

  constructor(
    private router      : Router,
    private fb          : FormBuilder ,
    private authService : AuthenticationService,
    private tokenService       : TokenService,
    private roleSErvice : RoleService,
    private userService : UserService,
    ){
    this.submitted = false;
  }

  
  /********************************************************************
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   ********************************************************************/
  error_messages = {
    'email' : [
      {type:'required', message:'L\'email est obligatoire.'},
      {type: 'pattern', message: 'Format d\'email invalid.' },
    ],
    'pwd' : [
      {type:'required', message:'Le mot de passe est obligatoire.'},
      {type: 'minlength', message: 'Mot de passe ne doit past être -8 caracters.' },
      {type: 'maxlength', message: 'Mot de passe trop trop long.' },
      {type: 'pattern', message: 'Fortmat mot de passe non valide.' },
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
      // Validators.minLength(8),
      Validators.maxLength(255),
      // Validators.pattern(
      //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
      // ),
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
            this.message_err_http = "Identifiant ou mot de passe est incorrecte."
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
