import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/notification/snackbar.service';
import { NewsletterService } from 'src/app/core/services/newsletter/newsletter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  

  constructor(
    private router : Router,
    private fb: FormBuilder,
    private titleAccueil: Title,
    private snackbarService: SnackbarService,
    private meta: Meta,
    private newsletterService: NewsletterService
  ) { 
    this.titleAccueil.setTitle('Accueil');
    this.meta.addTag({name:'Premier page', content:'Home'});
    this.meta.addTag({name:'keywords', content:'Thé, thés bios, TheTipTop, Nice, Jeu Concours, thé vert, thé noir, infusions'});
  }

  newslettersForm: FormGroup = this.fb.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])),    
  })

  NewsletterService():void {
    if (this.newslettersForm.invalid) {
      return;
    }

    this.newsletterService.subscribeNewsletter(this.newslettersForm.value)
    .subscribe(
      (res:any) => {
        console.log("res :",res)
        this.snackbarService.showNotification(
          'Vous recevrez dans les prochains jour nos offres et promotions sur nos produits !',
          'ok',
          'success'
        );
      }
    )
  }

}
