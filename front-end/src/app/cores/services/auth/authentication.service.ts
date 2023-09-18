import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { tap } from 'cypress/types/lodash';
import { environment } from 'src/environments/environment.dev';

//Hedaer Option
const httpOption = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',

  })
};


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //Variables
     private apiLine = environment.hostLine

    //Constructeur
    constructor(private http: HttpClient) {}


    /***********************************************
   * Gestion des erreurs
   * *********************************************/
  private log(log: string) {
    console.info(log);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


   /***********************************************
   *  METHODES DU LOGIN
   * *********************************************/

   login(obj:any){
    return this.http.post(this.apiLine+"/users/login", obj, httpOption);
   }

   loggedIn(){
    return localStorage.getItem('token');
   }
}
