import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Session } from './session';
import { environment } from 'src/environments/environment.dev';

//Hedaer Option
const httpOption = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // public headers: HttpHeaders
  constructor(
    private http: HttpClient
  ) {

  }

  AddNewSession(data:Session):any {
    // data.id_employe = 10
    data.statut = "Creer"
    data.date_debut = this.FormatDate(data.date_debut)
    data.date_fin = this.FormatDate(data.date_fin)
    return this.http.post(`${environment.hostLocal}/session-jeus`,data,httpOption)
  }

  FormatDate(date:string): string {

    // Utilisez les méthodes de l'objet Date pour extraire les composants de la date
    const dateConvert = new Date(date)
    const year = dateConvert.getFullYear();
    const month = String(dateConvert.getMonth() + 1).padStart(2, '0'); // Le mois est basé sur zéro, alors ajoutez 1
    const day = String(dateConvert.getDate()).padStart(2, '0');
    const hours = String(dateConvert.getHours()).padStart(2, '0');
    const minutes = String(dateConvert.getMinutes()).padStart(2, '0');
    const seconds = String(dateConvert.getSeconds()).padStart(2, '0');
    const milliseconds = String(dateConvert.getMilliseconds()).padStart(3, '0');

    // Créez la chaîne de date au format souhaité
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    console.log("date: ", formattedDate)
    return formattedDate
  }
  
}
