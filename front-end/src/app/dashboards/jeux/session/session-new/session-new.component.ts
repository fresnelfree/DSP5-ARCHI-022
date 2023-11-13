import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { event } from 'cypress/types/jquery';
import { forEach, toInteger } from 'cypress/types/lodash';
import { Gain } from 'src/app/core/models/gain/gain';
import { User } from 'src/app/core/models/user/user';
import { SnackbarService } from 'src/app/core/notification/snackbar.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import { Repartition } from 'src/app/core/services/repartition/repartition';
import { RepartitionService } from 'src/app/core/services/repartition/repartition.service';
import { Session } from 'src/app/core/services/session/session';
import { SessionService } from 'src/app/core/services/session/session.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-session-new',
  templateUrl: './session-new.component.html',
  styleUrls: ['./session-new.component.css']
})
export class SessionNewComponent {
  
  // IB-Var
  titleMenu:string="List Sessions"
  titleList:string="Liste Session"
  linkList = "/dashboard/session/all"
  titleAdd:string="Ajout session"
  linkAdd = "/dashboard/session/new"

 //Variable pour gestion navbar
 public open: boolean = false;
 public block: boolean = false;
 public openMenu: boolean = false;//Le boutton bare
 public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
 public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
 public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
 //Autres var
 public isLogged: boolean = false;//verification si le user est connecter
 public sessionDatas: any;

    //Fresnel-var
    sessionJeu?: Session;
    sessionForm: FormGroup;
    repartitionForm: FormGroup;
    selectedSession = false
    warningPercent = false
    warningIndicationPercent = false
    percents = 0
    nbrTicket = 0;
    somme = 0;
    nbrTicketRestant = 0;
    repartitions: Repartition[] = [{ libelle: '',pourcentage: 0,id_session:0}];
    session = 'Sélectionné une session...';
    sessions: Session[] = []
    user: any;
    error_messages   = {
      'session' : [
        {type:'required', message:'Le nom est obligqtoire.'},
      ]
    }
  
  
    constructor(
      private sessionJeuService: SessionService,
      private repartitionService: RepartitionService,
      private formBuilder: FormBuilder,
      private snackbarService: SnackbarService,
      private userService: UserService,
      private authService : AuthenticationService,
      private router      : Router,
      private token       : TokenService,
      private clientService: ClientService,
    ){
      this.user = JSON.parse(localStorage.getItem('user') || "")

      this.sessionForm = this.formBuilder.group({
        libelle: [null, Validators.required],
        date_debut: [null, Validators.required],
        date_fin: [null, Validators.required,],
        nbr_ticket: [null, Validators.required],
        id_employe: [this.user.employe.id, Validators.required],
        statut: ['Inactif', Validators.required]
      });
      this.repartitionForm = this.formBuilder.group({
        session: [null, Validators.required],
        libelle: [null, Validators.required],
        pourcentage: [null, Validators.required],
      });
    }

    clearFormSession(): void {
      this.sessionForm = this.formBuilder.group({
        libelle: ["", Validators.required],
        date_debut: ["", Validators.required],
        date_fin: ["", Validators.required,],
        nbr_ticket: ["", Validators.required],
        id_employe: [this.user.employe.id, Validators.required],
        statut: ['Inactif', Validators.required]      
      });
    }

    onSubmitFormSession(): void {
      this.sessionJeu = this.sessionForm.value
      console.log("sessionform : ",this.sessionForm.value)
      this.sessionJeuService.AddNewSession(this.sessionForm.value)
      .subscribe((response:any) =>{
        console.log("response : ",response)
        this.sessions.push(response)
      })
      console.log("sessionJeus : ",this.sessionJeu)

      /*  
        ici afficher un toast pour confirmer que l'action s'est bien passé

      */
        this.snackbarService.showNotification(
          'La session a été créée avec succes !',
          'ok',
          'success'
        );
    }

    showToast():void{
      const IdInput = document.getElementById("toast");
      // const inputValue = (event.target as HTMLInputElement);
      // document.get
      // IdInput.toast('show')
      console.log("response : ",IdInput)
    }

    onSubmitFormRepartition(): void {
      if (this.percents<100 || this.percents>100) {
        this.warningPercent = true
        return;
      }

      if (this.session === 'Sélectionné une session...') {
        this.selectedSession = true
        return;
      }

      this.repartitions.map((item) =>{
        if (item.libelle === '' || item.pourcentage === 0) {
          this.warningIndicationPercent = true
          return;
        }
        // console.log(item.pourcentage)
      })

      if (this.warningIndicationPercent) {
        return;
      }

      this.repartitions.map((item) =>{
        item.id_session = parseInt(this.session)
      })

      this.repartitionService.AddNewParticipationGains(this.repartitions)
      .subscribe((response:any) =>{
        console.log("response : ",response)

        this.snackbarService.showNotification(
          'La partie de jeu a été créée avec succes !',
          'ok',
          'success'
        );
      })
      console.log("add :",this.repartitions)
    }

    onChangeSelectedSession(event:Event) {
      const inputValue = (event.target as HTMLInputElement).value;
      if (this.session !== 'Sélectionné une session...') {
        this.selectedSession = false
        this.nbrTicket = this.sessions[0].nbr_ticket
      }
      else {
        this.selectedSession = true
      }
      console.log("event : ",inputValue)
    }

    addInput() {
      this.repartitions.push({ libelle: '',pourcentage: 0,id_session:0});
      console.log('user : ', this.user.employe.id)
      console.log("add :",this.repartitions)
    }

    removeInput(index: number) {
      this.repartitions.splice(index, 1);
      this.calculatedPercent()
    }

    onChange(event:Event) {
      const inputValue = (event.target as HTMLInputElement).value;
      if (inputValue !== '') {
        this.warningIndicationPercent = false
      }
      console.log("event : ",inputValue)
    }

    calculatedPercent() {
      // const inputValue = (event.target as HTMLInputElement).value;
      this.percents = 0
      this.repartitions.map((item) =>{
        this.percents = this.percents + item.pourcentage
        // console.log(item.pourcentage)
      })

      if (this.percents<=100) {
        this.nbrTicketRestant =this.nbrTicket - (this.nbrTicket*this.percents)/100
      } else {
        console.log('impossible pourcentage :',this.percents)
      }

      if (this.percents==100) {
        this.warningPercent= false
        this.snackbarService.showNotification(
          'Vous ne pourvez plus ajouter de partition !',
          'ok',
          'warning'
        );
      }
      else {
        this.warningPercent= true
      }
      console.log('values :',this.percents)
    }

    /*******************************************************
     *  IB*-code
    *****************************************************/
    ngOnInit(): void {

      this.authService.authStatus.subscribe(value => this.isLogged = value)
      this.getSession()
  }

  getSession(){
    return this.sessionJeuService.getSession().subscribe(
      res => {
        console.log(res);
        
      }
    )
  }
  
  // getClients(){
  //   return this.clientService.getClients().subscribe(
  //     res => {
  //       this.clients = res
  //     }
  //   )
  // }


  onGoDetail(client: User){
    
    this.router.navigate(['/dashboard/client/detail/'+client.id])
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.ecran = window.innerWidth;

    if (this.ecran < 1010) {
      this.smallDevise = !this.smallDevise;
    }
  }

  onMenu(e: MouseEvent) {
    if (this.ecran > 1010) {
      this.open = !this.open;
    } else if (this.ecran < 1010) {
      this.openMenu = !this.openMenu;

      if (this.ecran < 576) {
        this.openMenuSmall = !this.openMenuSmall;
      }
    }
  }

  logout(event: MouseEvent)
  {
      event.preventDefault();
      this.authService.logout()
  }
}
