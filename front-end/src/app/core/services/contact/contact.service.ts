import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.dev';
import { tap } from 'cypress/types/lodash';
import { Gain } from '../../models/gain/gain';
import { Contact } from './contact';

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
export class ContactService {

//CONSTRUCTEUR
constructor(
    private http: HttpClient,
  ) { }

/************************************************
 *        METHODES
 ************************************************/
  getContacts(): any{
    return this.http.get(`${environment.hostLine}/contacts`,httpOption)
  }

  addContact(data: Contact) : any {
    return this.http.post(`${environment.hostLine}/contacts`,data,httpOption)
  }

  getContactWithEmail(email:string): any{
    return this.http.get(`${environment.hostLine}/findByEmail/${email}`,httpOption)
  }

}
