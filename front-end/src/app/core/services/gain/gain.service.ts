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

//VARIABLES
private  api = environment.hostLine;



//CONSTRUCTEUR
constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

/************************************************
 *        METHODES UTILES
 ************************************************/
 


private log(log: string){
  console.info(log)
}

private handleError<T>(operation = 'operation', result?: T) {

  return (error: any): Observable<T> => {

    console.error(error);

    this.log(`${operation} failed: ${error.message}`);

    return of(result as T);

  };

}

/************************************************
 *        METHODES
 ************************************************/

  getGain(id:number): Observable<any>{
    return this.http.get<Gain>(`${this.api}/clients/${id}/gains`).pipe(
      catchError(this.handleError(`getClient id=${id}`))
    );
  }
   
  getGains(){
    return this.http.get(this.api+"/gains").pipe(
      catchError(this.handleError(`getGains : `))
    )
  }
 
  
}
