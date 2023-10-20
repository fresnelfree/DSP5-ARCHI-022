import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  private submitted;
  private role: string;
  public user: any;

  constructor(
    private fb             : FormBuilder ,
    private router         : Router,
    private clientService : ClientService,
    private userService    : UserService,
    private authService    : AuthenticationService
    ){
        this.submitted = false;
        this.role = "Client"
      }

    getUser() { return this.user}
    
  /********************************************************************
   *                  GESTION CLIENT
   *
   ********************************************************************/
  ngOnInit(): void {
      // this.getUser();
      this.getUserByEmail()
  }


  getUserByEmail():  void{
    this.clientService.getUserByEmail(this.getTokenEmail()).subscribe(
      (res) => { this.user = res }
    )
  }

  getTokenEmail() {
    return this.clientService.getTokenEmail();  
  }

  logout(event: MouseEvent)
  {
      event.preventDefault();
      this.authService.logout()
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
    get f() { return this.clientForm.controls; }
    get u() { return this.user.client}

    /********************************************************************
   *                  On submit Methode
   ********************************************************************/

    onSubmit() {
      this.submitted = true;
        // Si on a des erreurs on stop
        if (this.clientForm.invalid) {
          return;
      }
      const id_compte = this.u.id_compte

      let userToUpdate =  new User(this.u.prenom, this.u.nom, this.u.email, this.u.tel, this.u.adresse, "Client")

      this.clientService.updateClient(userToUpdate, id_compte).subscribe(
        res => console.log(res)
      )

  
  }


}
