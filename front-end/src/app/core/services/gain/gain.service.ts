import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.dev';
import { tap } from 'cypress/types/lodash';
import { Gain } from '../../models/gain/gain';

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
export class GainService {

//CONSTRUCTEUR
constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

/************************************************
 *        METHODES
 ************************************************/
  getGains(id:number): any{
    return this.http.get(`${environment.hostLocal}/clients/${id}/gains`,httpOption)
  } 
  
  updateGain(id: number ,data: Gain) : any {
    return this.http.put(`${environment.hostLocal}/gains/${id}`,data,httpOption)
  }

  getGainsWithNumGain(numGain:string): any{
    return this.http.get(`${environment.hostLocal}/findByNumGain/${numGain}`,httpOption)
  }   

}
