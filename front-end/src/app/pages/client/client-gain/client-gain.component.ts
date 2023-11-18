import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isNull } from 'cypress/types/lodash';
import { Gain } from 'src/app/core/models/gain/gain';
import { User } from 'src/app/core/models/user/user';
import { SnackbarService } from 'src/app/core/notification/snackbar.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { GainService } from 'src/app/core/services/gain/gain.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CongratulateDialogComponent } from '../congratulate-dialog/congratulate-dialog.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-client-gain',
  templateUrl: './client-gain.component.html',
  styleUrls: ['./client-gain.component.css']
})
export class ClientGainComponent implements OnInit {

  public user: any;
  public gains: Gain[] = [];
  public gain: any= undefined;
  public message: string;
  jeuForm: FormGroup;
  constructor(
    private router : Router,
    private fb : FormBuilder ,
    private activatedRoute : ActivatedRoute,
    private gainService : GainService,
    private token : TokenService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private authService : AuthenticationService){
      this.message = "";
      this.user = JSON.parse(cookieService.get('user') || "")
      this.jeuForm = this.formBuilder.group({
        numero_gain: [null, Validators.required],
      });
    }

    ngOnInit(): void {
      this.getGains()
      // this.handleGain()
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
  showSuccess() {
    const dialogRef = this.dialog.open(CongratulateDialogComponent, {
      data: {name: 'fresnel', animal: 'chaton'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
    // this.snackbarService.showNotification('Ceci est un message de Snackbar.','ok','success');
  }

  showCongratulateDialog(data:any) {
    const dialogRef = this.dialog.open(CongratulateDialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  async play(){
    console.log("num : ",this.jeuForm.value)
    await this.gainService.getGainsWithNumGain(this.jeuForm.value.numero_gain).
    subscribe(async (data:any) => {

        if(data.client) {
          this.snackbarService.showNotification(
            'Ce code a déjà été utilisé !',
            'ok',
            'info'
          );

          console.log('Ce code a déjà été utilisé !');
          return;
        }
        this.gain = data.gains
        console.log("gains1 : ",this.gain)
        data.gains.etat_gain = 'Actif'
        data.gains.id_client = this.user.client.id
        this.gainService.updateGain(data.gains.id,data.gains).
        subscribe((data:any) => {
            console.log("gains2 : ",data)
            this.showCongratulateDialog(this.gain)
            this.reloadComponent()
          },
          (erreur:any) => {
            // Gérez les erreurs ici
            if (erreur.status === 500) {
              // Code invalide
              console.log('Erreur serveur !');
              return;
            }
          }
        )
      },
      (erreur:any) => {
        // Gérez les erreurs ici
        if (erreur.status === 404) {
          // Code invalide
          console.log('Code invalide !');
          this.snackbarService.showNotification(
            'Ce code est invalide !',
            'ok',
            'info'
          );
          return;
        }
        if (erreur.status === 500) {
          // Code invalide
          console.log('Erreur serveur !');
          return;
        }
        console.log(erreur);
      }
    )

  }

  getGains(){
    this.gainService.getGains(this.user.client.id).
    subscribe((res:any) => {
        this.gains = res
        console.log("gains : ",this.gains)
      }
    )
  }


  // handleGain(){
  //   if(this.gains.length == 0){
  //   return  this.message = "Vous n'avez pas de ticket pour le moment."
  //   }else return false
  // }


}
