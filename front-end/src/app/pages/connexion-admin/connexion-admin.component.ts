import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';
 

@Component({
  selector: 'app-connexion-admin',
  templateUrl: './connexion-admin.component.html',
  styleUrls: ['./connexion-admin.component.css']
})
export class ConnexionAdminComponent implements OnInit{
    
  private submitted;
  private user?: any;
  private email?:string;
  private role:string = "";

  constructor(
    private router      : Router,
    private fb          : FormBuilder ,
    private authService : AuthenticationService,
    private userService : UserService,
    private token       : TokenService,
    private roleSErvice : RoleService){
    this.submitted = false;
  }


  
  
  
  /********************************************************************
   *
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   *
   ********************************************************************/
  error_messages   = {
    'email' : [
      {type:'required', message:'L\'email est obligqtoire.'},
      {type: 'pattern', message: 'Format d\'email invalid.' },
    ],
    'pwd' : [
      {type:'required', message:'Le mot de passe est obligqtoire.'},
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
          
          if(this.authService.isloggedIn()){
               
          this.userService.getUserByEmail(this.getTokenEmail()).subscribe(
            res => {

                 this.user = res;
                  if(this.user.employe){

                    this.roleSErvice.handleRole(this.user.employe.role)

                  }else if(this.user.client){

                     this.roleSErvice.handleRole("Client")
                     
                  }
               }
            
              )//fin subscribe
          }
        },
      )//fin subscribe
  }




  handleResponse(data:any){

    this.token.handleToken(data.token);

    this.authService.changeAuthStatus(true);
    // window.location.reload();
  }

 
    

      /********************************************************************
   *
   *                  GESTION USER
   *
   ********************************************************************/
      ngOnInit(): void {
        //     // this.getUser();
            this.getUserByEmail()
            // this.handleLoginRole()
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
   *                  OEUIL
   *
   ********************************************************************/
 
  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    const passwordFieldType = passwordInput.type;

    if (passwordFieldType === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }



}
