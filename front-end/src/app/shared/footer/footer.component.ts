import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from 'express';
import { SnackbarService } from 'src/app/core/notification/snackbar.service';
import { NewsletterService } from 'src/app/core/services/newsletter/newsletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
     private newsletterService: NewsletterService,
     @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadAxeptioScript();
  }

  error_messages = {
    'email' : [
      // {type:'required', message:'L\'email est obligatoire.'},
      {type: 'pattern', message: 'Adresse email invalide.' },
    ],
  }

  newslettersForm: FormGroup = this.fb.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])),
    subscribe_date: new FormControl( new Date().toISOString())
  })

  NewsletterService():void {
    if (this.newslettersForm.invalid) {
      return;
    }
    // console.log(this.newslettersForm.value);
    
    this.newsletterService.subscribeNewsletter(this.newslettersForm.value)
    .subscribe(
      (res:any) => {
        this.snackbarService.showNotification(
          'Vous recevrez dans les prochains jour nos offres et promotions sur nos produits !',
          'ok',
          'success'
        );
      }
    )
  }
 
  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) { // Vérifie si le code ne s'exécute que sur le navigateur
      // Exécuté seulement côté client
      this.loadAxeptioScript();
    }
  }
 
  loadAxeptioScript(){
    // Définir les paramètres Axeptio
    if (typeof window !== 'undefined') {
      (window as any).axeptioSettings = {
        clientId: "6579bff3fec39ba21f33cafa",
        cookiesVersion: "thétiptop-fr-2",
      };
    }

 
    // Chargement du script Axeptio seulement si on est côté client
    if (typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = "//static.axept.io/sdk.js";
      document.body.appendChild(script);
    }

  }

}
