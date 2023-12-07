import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/notification/snackbar.service';
import { ContactService } from 'src/app/core/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService,
    private contactService: ContactService
  ){}

  contactForm: FormGroup = this.fb.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])),
    nom: new FormControl('', Validators.compose([
      Validators.required,
    ])),
    phone: new FormControl('', Validators.compose([
      Validators.required,
    ])),
    objet: new FormControl('', Validators.compose([
      Validators.required,
    ])),
    message: new FormControl('', Validators.compose([
      Validators.required,
    ])),
  })

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
