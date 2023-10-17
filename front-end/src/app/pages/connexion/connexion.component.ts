import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { TokenService } from 'src/app/core/services/token/token.service';
 



@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

 
  private submitted;


  constructor(
    private router      : Router,
    private fb          : FormBuilder ,
    private authService : AuthenticationService,
    private token       : TokenService){
    this.submitted = false;
  }

  
  /********************************************************************
   *
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   *
   ********************************************************************/
  error_messages   = {
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
        (data:any) => {this.handleResponse(data)},
      )//fin subscribe
  }

// showPassword(id:string): void {
//   const x:any = document.getElementById(id);  
//   if (x.getAttribute("type") === "password") {
//     x.setAttribute("type", "text");
//   } else {
//     x.setAttribute("type", "password");
//   }
// }

togglePasswordVisibility(passwordInput: HTMLInputElement) {
  const passwordFieldType = passwordInput.type;

  if (passwordFieldType === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}


  handleResponse(data:any){

    // console.log(data);
    

    this.token.handleToken(data.token);
   
    this.authService.changeAuthStatus(true);

    this.router.navigate(['/client']).then(() => {
      window.location.reload();
    });
     
  }

}
