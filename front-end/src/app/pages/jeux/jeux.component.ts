import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { event } from 'cypress/types/jquery';
import { forEach, toInteger } from 'cypress/types/lodash';
import { Gain } from 'src/app/core/models/gain/gain';
import { Repartition } from 'src/app/core/services/repartition/repartition';
import { RepartitionService } from 'src/app/core/services/repartition/repartition.service';
import { Session } from 'src/app/core/services/session/session';
import { SessionService } from 'src/app/core/services/session/session.service';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css']
})
export class JeuxComponent {
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
  inputItems: Repartition[] = [{ libelle: '',pourcentage: 0,id_session:0}];
  session = 'Sélectionné une session...';
  sessions: Session[] = [{
    id:5,
    libelle:'Session test',
    id_employe:10,
    date_debut:'',
    date_fin: '',
    nbr_ticket: 10,
    statut: 'Creer'
  }]

  error_messages   = {
    'session' : [
      {type:'required', message:'Le nom est obligqtoire.'},
    ]
  }
  constructor(
    private sessionJeuService: SessionService,
    private repartitionService: RepartitionService,
    private formBuilder: FormBuilder,
  ){
    this.nbrTicket = this.sessions[0].nbr_ticket
    this.sessionForm = this.formBuilder.group({
      libelle: [null, Validators.required],
      date_debut: [null, Validators.required],
      date_fin: [null, Validators.required,],
      nbr_ticket: [null, Validators.required],
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
    });
  }

  onSubmitFormSession(): void {
    this.sessionJeu = this.sessionForm.value
    this.sessionJeuService.AddNewSession(this.sessionForm.value)
    .subscribe((response:any) =>{
      console.log("response : ",response)
      this.sessions.push(response)
    })
    console.log("sessionform : ",this.sessionForm.value)
    console.log("sessionJeus : ",this.sessionJeu)
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

    this.inputItems.map((item) =>{
      if (item.libelle === '' || item.pourcentage === 0) {
        this.warningIndicationPercent = true
        return;
      }
      // console.log(item.pourcentage)
    })

    if (this.warningIndicationPercent) {
      return;
    }

    this.inputItems.map((item) =>{
      item.id_session = parseInt(this.session)
    })

    this.repartitionService.AddNewParticipationGains(this.inputItems)
    .subscribe((response:any) =>{
      console.log("response : ",response)
    })
    console.log("add :",this.inputItems)
  }



  onChangeSelectedSession(event:Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (this.session !== 'Sélectionné une session...') {
      this.selectedSession = false
    }
    else {
      this.selectedSession = true
    }
    console.log("event : ",inputValue)
  }

  addInput() {
    this.inputItems.push({ libelle: '',pourcentage: 0,id_session:0});
    console.log("add :",this.inputItems)
  }

  removeInput(index: number) {
    this.inputItems.splice(index, 1);
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
    this.inputItems.map((item) =>{
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
    }
    else {
      this.warningPercent= true
    }
    console.log('values :',this.percents)
  }

  generateUniqueNumbers(min:number, max:number, count:number,uniqCode:number):any[] {
    if (max - min + 1 < count) {
      throw new Error("La plage ne contient pas suffisamment de chiffres uniques.");
    }

    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < count) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add("S"+uniqCode+this.standardNumber(randomNum,max));
    }
    console.log("uniqueNumbers: ",Array.from(uniqueNumbers))
    return Array.from(uniqueNumbers);
  }

  standardNumber(val:number,maxVal:number) {
    let numberString = ""
    const max = maxVal.toString().length - val.toString().length
    for (let index = 0; index < max; index++) {
        numberString = numberString +""+0
    }
    return numberString+val
  }
}
