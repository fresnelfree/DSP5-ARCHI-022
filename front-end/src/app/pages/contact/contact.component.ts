import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/notification/snackbar.service';
import { ContactService } from 'src/app/core/services/contact/contact.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private submitted;
  private erreurs:any;
  public message_err_http:string = ""


  constructor(
    private authService : AuthenticationService,
    private fb : FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService,
    private contactService: ContactService,
    private titleContact: Title,
    private meta: Meta
    ){
    this.submitted = false;
    this.titleContact.setTitle("Contact");
    this.meta.addTag({name:"Troisième page", content:"Contact"});
    this.meta.addTag({name:'keywords', content:"Contactez-nous, TheTipTop, produits, clients"});
  }


  /********************************************************************
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   ********************************************************************/

   /********************************************************************
   *
   *                  GESTION DU FORMULAIRE, REACTIVEFORM
   *
   ********************************************************************/
   error_messages   = {
    'nom' : [
      {type:'required', message:'Le nom est obligatoire.'},

      {type: 'minlength', message: 'Nom trop court.' },
      {type: 'maxlength', message: 'Nom trop trop long.' },
    ],

    'phone' : [
      {type:'required', message:'Le numéro de téléphone est obligatoire.'},
    ],

    'email' : [
      {type:'required', message:'L\'email est obligatoire.'},
      {type: 'pattern', message: 'Format d\'email invalid.' },
    ],

    'objet' : [
      {type:'required', message:'L\'objet est obligatoire.'},
    ],

    'message' : [
      {type:'required', message:'Le message est obligatoire.'},
    ],

  }

 contactForm: FormGroup = this.fb.group({

    nom: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255),
    ])),

    phone: new FormControl('', Validators.compose([
      Validators.required,
    ])),

    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])),

    objet: new FormControl('', Validators.compose([
      Validators.required,
    ])),

    message: new FormControl('', Validators.compose([
      Validators.required,
    ])),

  })

  get f() { return this.contactForm.controls; }

  onSubmit(){
    this.submitted = false;
    if (this.contactForm.invalid) {
      return;
    }
  }


  sendMessage():void {
    // console.log("contact :",this.contactForm.value)
    if (this.contactForm.invalid) {
      return;
    }

    this.contactService.addContact(this.contactForm.value)
    .subscribe((res: any) => {
      // console.log("res :", res)
      this.snackbarService.showNotification(
        'Votre message a été pris en compte avec succes !',
        'ok',
        'success'
      );

      this.router.navigate(['/home']).then(() => {
        // window.location.reload();
      });
    })

  }
}
